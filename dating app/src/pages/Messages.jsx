// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { db, collection, addDoc, query, orderBy, onSnapshot } from '../firebase.js';

// const Messages = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [friends, setFriends] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     // Fetch friends from backend
//     const fetchFriends = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/user/${currentUser._id}/friends`);
//         const data = await response.json();
//         setFriends(data);
//       } catch (error) {
//         console.error("Error fetching friends:", error);
//       }
//     };
//     fetchFriends();
//   }, [currentUser]);

//   useEffect(() => {
//     if (selectedFriend) {
//       // Set up a real-time listener for messages with selected friend
//       const q = query(
//         collection(db, 'messages'),
//         orderBy('timestamp', 'asc')
//       );

//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const msgs = snapshot.docs
//           .map(doc => doc.data())
//           .filter(msg =>
//             (msg.senderId === currentUser._id && msg.receiverId === selectedFriend._id) ||
//             (msg.senderId === selectedFriend._id && msg.receiverId === currentUser._id)
//           );
//         setMessages(msgs);
//       });

//       return () => unsubscribe();
//     }
//   }, [selectedFriend, currentUser]);

//   const sendMessage = async () => {
//     if (newMessage.trim() === '') return;

//     try {
//       await addDoc(collection(db, 'messages'), {
//         senderId: currentUser._id,
//         receiverId: selectedFriend._id,
//         message: newMessage,
//         timestamp: new Date(), // You can also use Firestore serverTimestamp()
//       });
//       setNewMessage(''); // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Friends List */}
//       <div className="w-1/3 border-r">
//         <h2 className="text-xl font-bold p-4">Friends</h2>
//         <ul>
//           {friends.map(friend => (
//             <li
//               key={friend._id}
//               className={`p-4 cursor-pointer ${selectedFriend && selectedFriend._id === friend._id ? 'bg-gray-300' : ''}`}
//               onClick={() => setSelectedFriend(friend)}
//             >
//               <img src={friend.profilePicture} alt={friend.firstName} className="w-12 h-12 rounded-full" />
//               <span className="ml-4">{friend.firstName}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Interface */}
//       <div className="w-2/3 flex flex-col">
//         {selectedFriend ? (
//           <>
//             <div className="p-4 border-b">
//               <h2 className="text-xl font-bold">{selectedFriend.firstName}</h2>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`mb-2 ${msg.senderId === currentUser._id ? 'text-right' : 'text-left'}`}>
//                   <p className={`bg-gray-200 inline-block p-2 rounded ${msg.senderId === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//                     {msg.message}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 border-t flex">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message..."
//                 className="flex-1 border rounded p-2"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center">
//             <p>Select a friend to start chatting</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messages;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, collection, addDoc, query, orderBy, onSnapshot } from '../firebase.js';

const Messages = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme); // Access the theme from the Redux state
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${currentUser._id}/friends`);
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriends();
  }, [currentUser]);

  useEffect(() => {
    if (selectedFriend) {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs
          .map((doc) => doc.data())
          .filter(
            (msg) =>
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
        timestamp: new Date(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Friends List */}
      <div className="w-1/3 border-r border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold p-4">Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend._id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                selectedFriend && selectedFriend._id === friend._id ? 'bg-gray-300 dark:bg-gray-700' : ''
              }`}
              onClick={() => setSelectedFriend(friend)}
            >
              <img
                src={friend.profilePicture}
                alt={friend.firstName}
                className="w-12 h-12 rounded-full"
              />
              <span className="ml-4 font-medium">{friend.firstName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Interface */}
      <div className="w-2/3 flex flex-col bg-white dark:bg-gray-800">
        {selectedFriend ? (
          <>
           <div className={`p-4 border-b border-gray-300 dark:border-gray-700 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
  <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
    {selectedFriend.firstName}
  </h2>
</div>



            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 dark:bg-gray-900">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === currentUser._id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <p
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.senderId === currentUser._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
            <div className={`p-4 border-t border-gray-300 dark:border-gray-700 flex items-center ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-300 placeholder-gray-500 dark:placeholder-gray-400"
  />
  <button
    onClick={sendMessage}
    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Send
  </button>
</div>


          </>
        ) : (
          <div className={`flex-1 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
  <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
    Select a friend to start chatting
  </p>
</div>

        )}
      </div>
    </div>
  );
};

export default Messages;
