import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, collection, addDoc, query, orderBy, onSnapshot } from '../firebase.js';

const Messages = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch friends from backend
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${currentUser._id}/friends`);
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [currentUser]);

  useEffect(() => {
    if (selectedFriend) {
      // Set up a real-time listener for messages with selected friend
      const q = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs
          .map(doc => doc.data())
          .filter(msg =>
            (msg.senderId === currentUser._id && msg.receiverId === selectedFriend._id) ||
            (msg.senderId === selectedFriend._id && msg.receiverId === currentUser._id)
          );
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [selectedFriend, currentUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        senderId: currentUser._id,
        receiverId: selectedFriend._id,
        message: newMessage,
        timestamp: new Date(), // You can also use Firestore serverTimestamp()
      });
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Friends List */}
      <div className="w-1/3 border-r">
        <h2 className="text-xl font-bold p-4">Friends</h2>
        <ul>
          {friends.map(friend => (
            <li
              key={friend._id}
              className={`p-4 cursor-pointer ${selectedFriend && selectedFriend._id === friend._id ? 'bg-gray-300' : ''}`}
              onClick={() => setSelectedFriend(friend)}
            >
              <img src={friend.profilePicture} alt={friend.firstName} className="w-12 h-12 rounded-full" />
              <span className="ml-4">{friend.firstName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Interface */}
      <div className="w-2/3 flex flex-col">
        {selectedFriend ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">{selectedFriend.firstName}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.senderId === currentUser._id ? 'text-right' : 'text-left'}`}>
                  <p className={`bg-gray-200 inline-block p-2 rounded ${msg.senderId === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded p-2"
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
