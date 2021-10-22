import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import axios from "axios";
import Picker from 'emoji-picker-react';
import { io } from "socket.io-client";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
 import InputEmoji from 'react-input-emoji'
import { AuthContext } from "../../context/AuthContext";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [ text, setText ] = useState('')

   const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
   };
  
  
//zz cant seem to live chat hmmm 
    //socketio:
    // from documentation zzz

//     const socket = io("ws://localhost:3000");

// socket.on("connect", () => {
//   // either with send()
//   socket.send("Hello!");

//   // or with emit() and custom event names
//   socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
// });

// // handle the event sent with socket.send()
// socket.on("message", data => {
//   console.log(data);
// });

// // handle the event sent with socket.emit()
// socket.on("greetings", (elem1, elem2, elem3) => {
//   console.log(elem1, elem2, elem3);
// });
    /// think for this need a sepereate folder 
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
// not sure about this but accoridngo the documentation it initialize a new instance of socket.io by passing the server (the HTTP server) object. Then I listen on the connection event for incoming sockets and log it to the console.
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);


//   <script src="/socket.io/socket.io.js"></script>
// <script>
//   var socket = io();

//   var form = document.getElementById('form');
//   var input = document.getElementById('input');

//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//       socket.emit('chat message', input.value);
//       input.value = '';
//     }
//   });
// </script>
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
// The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.

// Let’s make it so that when the user types in a message, the server gets it as a chat message event. The script section in index.html should now look as follows:
// so the way they did it is like <script src="/socket.io/socket.io.js"></script>
{/* <script>
  var socket = io();

  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });
</script> */}
    
    //if im doing this correctly, basically just an event listener to emit at the point 
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
// var socket = io();

//   var messages = document.getElementById('messages');
//   var form = document.getElementById('form');
//   var input = document.getElementById('input');

//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//       socket.emit('chat message', input.value);
//       input.value = '';
//     }
//   });

//   socket.on('chat message', function(msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//   });
// </script>
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    
                  ></textarea>
                  
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send!
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Select a user
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}