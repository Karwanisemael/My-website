function showRegister() {
    document.getElementById("registerSection").style.display = 'block';
    document.getElementById("chatSection").style.display = 'none';
}

function showChat() {
    if (localStorage.getItem("username")) {
        document.getElementById("registerSection").style.display = 'none';
        document.getElementById("chatSection").style.display = 'block';
    } else {
        alert("Please register first!");
    }
}

function registerUser(event) {
    event.preventDefault();
    let username = document.getElementById("username").value.trim();
    let existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || {};

    if (username === "" || existingUsers[username]) {
        alert("Username is taken or invalid! Choose another.");
        return;
    }

    let userColor = getRandomColor();
    existingUsers[username] = userColor;
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    localStorage.setItem("username", username);
    localStorage.setItem("userColor", userColor);

    document.getElementById("registerSection").style.display = 'none';
    document.getElementById("chatSection").style.display = 'block';
    loadChatMessages();
}

function getRandomColor() {
    let colors = ["#ff5733", "#33ff57", "#3357ff", "#f4a261", "#2a9d8f", "#e76f51", "#264653"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function loadChatMessages() {
    let chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    let chatContainer = document.getElementById("chatMessages");

    chatMessages.forEach(message => {
        let messageDiv = document.createElement("div");
        messageDiv.innerHTML = <strong style="color:${message.color}">${message.username}</strong> [${message.timestamp}]: ${message.text};
        chatContainer.appendChild(messageDiv);
    });
}

function sendMessage() {
    let messageText = document.getElementById("message").value.trim();
    let username = localStorage.getItem("username");
    let userColor = localStorage.getItem("userColor");

    if (messageText === "") {
        alert("Message cannot be empty!");
        return;
    }

    let currentDateTime = new Date().toLocaleString();
    let newMessage = {
        username: username,
        color: userColor,
        text: messageText,
        timestamp: currentDateTime
    };

    let messageDiv = document.createElement("div");
    messageDiv.innerHTML = <strong style="color:${userColor}">${username}</strong> [${currentDateTime}]: ${messageText};
    document.getElementById("chatMessages").appendChild(messageDiv);

    let chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    chatMessages.push(newMessage);
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));

    document.getElementById("message").value = "";
}

window.onload = function() {
    if (localStorage.getItem("username")) {
        document.getElementById("registerSection").style.display = 'none';
        document.getElementById("chatSection").style.display = 'block';
        loadChatMessages();
    } else {
        showRegister();
    }
};