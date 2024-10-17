import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, TextInput } from 'flowbite-react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setUploadError('File size must be less than 3MB.');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload image to Firebase Storage
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    const storage = getStorage();
    const fileName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    setUploading(true);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError('Failed to upload image. Please try again.');
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImagePreview(url);
          setFormData((prev) => ({ ...prev, profilePicture: url })); // Ensure profilePicture is set here
          setUploading(false);
        });
      }
    );
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return setUploadError('Please wait for the image to finish uploading.');

    dispatch(updateStart());
    try {
      const response = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData, // Spread existing formData
          profilePicture: formData.profilePicture || currentUser.profilePicture, // Use updated profile picture
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      dispatch(updateSuccess(data)); // Dispatch the updated user data
      alert("User's profile updated successfully!");
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUploadError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl font-semibold text-center mb-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div
          className="relative w-32 h-32 mx-auto rounded-full shadow-md cursor-pointer overflow-hidden"
          onClick={() => filePickerRef.current.click()}
        >
          {uploadProgress > 0 && uploadProgress < 100 && (
            <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} />
          )}
          <img
            src={imagePreview || currentUser.profilePicture}
            alt="user"
            className={`w-full h-full object-cover ${uploadProgress < 100 ? 'opacity-90' : ''}`}
            style={{ filter: 'brightness(1.2)' }}
          />
        </div>

        {uploadError && <Alert color="failure">{uploadError}</Alert>}

        <TextInput
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <Button type="submit" className="bg-blue-500 text-white hover:bg-indigo-800 transition duration-200 rounded-lg shadow-md"  disabled={uploading}>
          {uploading ? 'Uploading...' : 'Update'}
        </Button>
      </form>
    </div>
  );
}

