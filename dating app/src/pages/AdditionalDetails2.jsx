
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // To navigate to '/home'
// import { getStorage } from 'firebase/storage'; // Firebase storage imports
// import { app} from '../firebase';
// import { useDispatch, useSelector } from 'react-redux';
// // import { uploadStart,uploadSuccess,uploadFailure } from '../redux/user/additionalDetailsSlice2';
// const storage = getStorage(app); // Initialize Firebase storage

// const AdditionalDetails2 = () => {
//     const [images, setImages] = useState([null, null, null, null, null, null]); // Six slots for images
//     const [preference, setPreference] = useState(''); // Preference for interaction
//     const navigate = useNavigate(); // Hook for navigation
//     const dispatch = useDispatch(); // Hook for dispatching actions
//     const userId = useSelector((state) => state.user.currentUser?.id); // Get user ID from Redux state

//     // Handles image upload to specific boxes
//     const handleImageUpload = (index, event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const updatedImages = [...images];
//             updatedImages[index] = file; // Store the actual file instead of URL
//             setImages(updatedImages);
//         }
//     };

//     // Handles form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         // Prepare the image URLs and preference to send
//         const imageUrls = images.filter(image => image); // Only keep uploaded images

//         // Dispatch uploadStart action
//         dispatch(uploadStart());

//         // Send images and preference to the backend
//         try {
//             const response = await fetch(`http://localhost:3000/api/update-details/${userId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ images: imageUrls, preference }), // Send both images and preference
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Updated user details:', data);
                
//                 // Dispatch uploadSuccess action with the updated data
//                 dispatch(uploadSuccess(data));
//                 navigate('/home'); // Navigate after successful update
//             } else {
//                 const errorText = await response.text();
//                 console.error('Failed to update details:', errorText);
                
//                 // Dispatch uploadFailure action with error message
//                 dispatch(uploadFailure(errorText));
//             }
//         } catch (error) {
//             console.error('Error updating details:', error);
//             dispatch(uploadFailure(error.message)); // Dispatch error
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Upload Your Photos</h2>
            
//             {/* Image upload boxes */}
//             <div className="grid grid-cols-3 gap-4">
//                 {images.map((img, index) => (
//                     <div
//                         key={index}
//                         className="relative border-2 border-dashed border-gray-300 w-40 h-40 flex items-center justify-center"
//                     >
//                         {img ? (
//                             <img
//                                 src={URL.createObjectURL(img)} // Display the uploaded image
//                                 alt={`Uploaded ${index + 1}`}
//                                 className="w-full h-full object-cover"
//                             />
//                         ) : (
//                             <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
//                                 <span className="text-4xl text-gray-400">+</span>
//                                 <input
//                                     type="file"
//                                     className="opacity-0 absolute inset-0"
//                                     onChange={(e) => handleImageUpload(index, e)}
//                                     accept="image/*"
//                                 />
//                             </label>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* Preference selection */}
//             <div className="mt-8">
//                 <h3 className="text-2xl font-bold mb-4">Who Would You Like to Interact With?</h3>
//                 <div className="flex space-x-8">
//                     <label className="flex items-center space-x-3 text-lg font-medium">
//                         <input
//                             type="radio"
//                             name="preference"
//                             value="boy"
//                             onChange={(e) => setPreference(e.target.value)}
//                             className="form-radio h-5 w-5 text-blue-600"
//                         />
//                         <span>Boy</span>
//                     </label>
//                     <label className="flex items-center space-x-3 text-lg font-medium">
//                         <input
//                             type="radio"
//                             name="preference"
//                             value="girl"
//                             onChange={(e) => setPreference(e.target.value)}
//                             className="form-radio h-5 w-5 text-pink-500"
//                         />
//                         <span>Girl</span>
//                     </label>
//                     <label className="flex items-center space-x-3 text-lg font-medium">
//                         <input
//                             type="radio"
//                             name="preference"
//                             value="both"
//                             onChange={(e) => setPreference(e.target.value)}
//                             className="form-radio h-5 w-5 text-green-500"
//                         />
//                         <span>Both</span>
//                     </label>
//                 </div>
//             </div>

//             {/* Submit button */}
//             <button
//                 className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleSubmit}
//             >
//                 Submit
//             </button>
//         </div>
//     );
// };

// export default AdditionalDetails2;

// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { app } from '../firebase';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateStart,updateSuccess,updateFailure,selectUserId } from '../redux/user/additionalDetailsSlice2.js';
  
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const storage = getStorage(app);

// const AdditionalDetails2 = () => {
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadError, setUploadError] = useState('');
//     const [uploading, setUploading] = useState(false);
//     const [preference, setPreference] = useState('');

//     const filePickerRef = useRef();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const userId = useSelector(selectUserId); // Ensure Redux is properly configured
//     const currentUser = useSelector((state) => state.user.currentUser);

//     // Handle file input change
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.size > 3 * 1024 * 1024) {
//                 setUploadError('File size must be less than 3MB.');
//                 return;
//             }
//             setImageFile(file);
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     // Upload image to Firebase
//     useEffect(() => {
//         if (imageFile) {
//             uploadImage();
//         }
//     }, [imageFile]);

//     const uploadImage = () => {
//         const fileName = `${new Date().getTime()}_${imageFile.name}`;
//         const storageRef = ref(storage, `images/${fileName}`);
//         const uploadTask = uploadBytesResumable(storageRef, imageFile);

//         setUploading(true);
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//                 setUploadProgress(progress);
//             },
//             (error) => {
//                 setUploadError('Failed to upload image. Please try again.');
//                 setUploading(false);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                     setImagePreview(url);
//                     handleFormSubmit(url); // Submit the form with the uploaded image URL
//                     setUploading(false);
//                 });
//             }
//         );
//     };

//     const handleFormSubmit = async (imageUrl) => {
//         dispatch(updateStart());
//         try {
//             const response = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     image: imageUrl, // Save the image URL to the `image` field in your User model
//                     preference,
//                 }),
//             });

//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message);

//             dispatch(updateSuccess(data));
//             alert("User's profile updated successfully!");
//             navigate('/dashboard');
//         } catch (error) {
//             dispatch(updateFailure(error.message));
//             setUploadError(error.message);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Upload Your Photo</h2>
//             <div onClick={() => filePickerRef.current.click()} className="relative w-32 h-32 mx-auto rounded-full shadow-md cursor-pointer overflow-hidden">
//                 {uploadProgress > 0 && uploadProgress < 100 && (
//                     <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} />
//                 )}
//                 <img
//                     src={imagePreview || currentUser.image}
//                     alt="user"
//                     className={`w-full h-full object-cover ${uploadProgress < 100 ? 'opacity-90' : ''}`}
//                 />
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     ref={filePickerRef}
//                     hidden
//                 />
//             </div>

//             <h3 className="text-2xl font-bold mt-6 mb-4">Who Would You Like to Interact With?</h3>
//             <div className="flex space-x-8">
//                 <label className="flex items-center space-x-3 text-lg font-medium">
//                     <input
//                         type="radio"
//                         name="preference"
//                         value="boy"
//                         onChange={(e) => setPreference(e.target.value)}
//                         className="form-radio h-5 w-5 text-blue-600"
//                     />
//                     <span>Boy</span>
//                 </label>
//                 <label className="flex items-center space-x-3 text-lg font-medium">
//                     <input
//                         type="radio"
//                         name="preference"
//                         value="girl"
//                         onChange={(e) => setPreference(e.target.value)}
//                         className="form-radio h-5 w-5 text-pink-500"
//                     />
//                     <span>Girl</span>
//                 </label>
//                 <label className="flex items-center space-x-3 text-lg font-medium">
//                     <input
//                         type="radio"
//                         name="preference"
//                         value="both"
//                         onChange={(e) => setPreference(e.target.value)}
//                         className="form-radio h-5 w-5 text-green-500"
//                     />
//                     <span>Both</span>
//                 </label>
//             </div>

//             <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => uploadImage()}>
//                 Submit
//             </button>
//         </div>
//     );
// };

// // export default AdditionalDetails2;
// // AdditionalDetails2.jsx

// // AdditionalDetails2.jsx

// AdditionalDetails2.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { uploadStart, uploadSuccess, uploadFailure } from '../redux/user/additionalDetailsSlice2.js';

const storage = getStorage(app);

const AdditionalDetails2 = () => {
    const [image, setImage] = useState(null);
    const [preference, setPreference] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.currentUser?.id); // Get user ID from Redux state

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if userId is available
        if (!userId) {
            alert('User ID is not available. Please log in.'); // Alert for user ID
            navigate('/login'); // Redirect to login page
            return;
        }

        if (!image) {
            alert('Please select an image to upload.');
            return;
        }
        if (!preference) {
            alert('Please select your preference for interaction.');
            return;
        }

        dispatch(uploadStart());
        setIsUploading(true);

        const storageRef = ref(storage, `images/${userId}/${image.name}`);

        try {
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Upload failed:', error);
                    dispatch(uploadFailure(error.message));
                    setIsUploading(false);
                },
                async () => {
                    const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('Image URL:', imageUrl);

                    const response = await fetch(`http://localhost:3000/api/update/${userId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ image: imageUrl, preference }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Updated user details:', data);
                        dispatch(uploadSuccess(data));
                        navigate('/home');
                    } else {
                        const errorText = await response.text();
                        console.error('Failed to update details:', errorText);
                        dispatch(uploadFailure(errorText));
                    }
                    setIsUploading(false);
                }
            );
        } catch (error) {
            console.error('Error during upload:', error);
            dispatch(uploadFailure(error.message));
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Upload Your Photo</h2>
            <div className="border-2 border-dashed border-gray-300 w-40 h-40 flex items-center justify-center mb-4">
                {image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <label className="flex items-center justify-center cursor-pointer h-full w-full">
                        <span className="text-4xl text-gray-400">+</span>
                        <input
                            type="file"
                            className="opacity-0 absolute inset-0"
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </label>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Who Would You Like to Interact With?</h3>
                <div className="flex space-x-8">
                    {['boy', 'girl', 'both'].map((value) => (
                        <label key={value} className="flex items-center space-x-3 text-lg font-medium">
                            <input
                                type="radio"
                                name="preference"
                                value={value}
                                onChange={() => setPreference(value)}
                                className="form-radio h-5 w-5 text-blue-600"
                                checked={preference === value}
                            />
                            <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>
            {isUploading && (
                <div className="mt-4">
                    <p>Uploading: {Math.round(uploadProgress)}%</p>
                </div>
            )}
            <button
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={isUploading}
            >
                {isUploading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
};

export default AdditionalDetails2;
