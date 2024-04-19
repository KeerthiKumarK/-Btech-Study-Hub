// Firebase configuration


  
  window.onload = function() {
    const firebaseConfig = {
        apiKey: "AIzaSyDOjKbUvqrKvydfCDJiM627dSZ21z80Ci0",
        authDomain: "live-chat-44836.firebaseapp.com",
        projectId: "live-chat-44836",
        storageBucket: "live-chat-44836.appspot.com",
        messagingSenderId: "703867762202",
        appId: "1:703867762202:web:ad3e03750b1bb7f08c83a3"
      };
      
      firebase.initializeApp(firebaseConfig);
      const db = firebase.database();
     
      const chatDisplay = document.getElementById('chat-display');
      const messageInput = document.getElementById('message-input');
      const sendButton = document.getElementById('send-button');
      const fileInput = document.getElementById('file-input');
      const leaveButton = document.getElementById('leave-button');
  
      function displayMessage(name, message, isUserMessage) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${name}: ${message}`;
        if (isUserMessage) {
            messageElement.classList.add('user-message');
        } else {
            messageElement.classList.add('other-message');
        }
        chatDisplay.appendChild(messageElement);
        // Append a line break after each message to ensure it appears on a new line
        chatDisplay.appendChild(document.createElement('br'));
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
    
  
      function sendMessage() {
          const message = messageInput.value;
          if (message.trim() !== '') {
              const userName = localStorage.getItem('userName');
              const messageData = {
                  name: userName,
                  message: message
              };
              db.ref('messages').push().set(messageData);
              messageInput.value = '';
          }
      }
  
      function sendFile(file) {
          // Handle file upload
      }
  
      function joinChat() {
          const name = document.getElementById('name-input').value.trim();
          if (name !== '') {
              localStorage.setItem('userName', name);
              showChatRoom();
              // Display a message indicating the user has joined
              const messageData = {
                  name: 'Chat Room',
                  message: `${name} has joined the chat`
              };
              db.ref('messages').push().set(messageData);
          } else {
              alert("Please enter your name.");
          }
      }
  
    //   let leftFlag = false;

      function leaveChat() {
        // if (!leaveButtonEnabled) {
        //     return; // Ignore clicks if leave button is disabled
        // }
        // leaveButtonEnabled = false; // Disable the button
        const userName = localStorage.getItem('userName');
        if (userName ) {
            const leaveMessage = `${userName} has left the chat`;
            displayMessage('Chat Room', leaveMessage, false);
            leftFlag = true;
            localStorage.removeItem('userName');
            // db.ref('messages').push().set({
            //     name: 'Chat Room',
            //     message: leaveMessage
            // });
            document.getElementById('chat-room').style.display = 'none';
            document.getElementById('name-input-container').style.display = 'block';
            document.getElementById('name-input').value = ''; // Clear the join input field
        }
        // setTimeout(() => {
        //     leaveButtonEnabled = true; // Re-enable the button after a delay
        // }, 1000); // Adjust the delay as needed
    }
    

    
  
      function showChatRoom() {
          document.getElementById('name-input-container').style.display = 'none';
          document.getElementById('chat-room').style.display = 'block';
      }
  
      db.ref('messages').on('child_added', (snapshot) => {
          const messageData = snapshot.val();
          displayMessage(messageData.name, messageData.message, messageData.name === localStorage.getItem('userName'));
      });
  
      sendButton.addEventListener('click', () => {
          sendMessage();
      });
  
    //   fileInput.addEventListener('change', (event) => {
    //       const file = event.target.files[0];
    //       if (file) {
    //           sendFile(file);
    //       }
    //   });
  
      document.getElementById('join-button').addEventListener('click', joinChat);
  
      document.getElementById('leave-button').addEventListener('click', leaveChat);
  };