// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCdwmwv771dbVP1YiNCkNtLbSiDr4yX3U8",
authDomain: "chat-room-bca19.firebaseapp.com",
databaseURL: "https://chat-room-bca19-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "chat-room-bca19",
storageBucket: "chat-room-bca19.appspot.com",
messagingSenderId: "270863144955",
appId: "1:270863144955:web:2254775631c6ec3b6d1d5e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

const sendBtn = document.querySelector('.send-btn');
const inputs = document.querySelectorAll('input');
const form = document.querySelector('.chat-holder');
const chatRoom = document.querySelector('.chat-room');

// sendBtn.addEventListener('click', handleMessage);
form.addEventListener('submit', handleSubmit);

// get data from firebase when page is loaded
firebase.database().ref('chat').child('message').on('child_added', function(snapshot){
    console.log(snapshot.val());
    let nameVal = snapshot.val().name; // string
    let msgVal = snapshot.val().msg; // string
    let chatBubble;

    // create element from firebase
    
    if (nameVal == 'arwin'){
        chatBubble = 
        `
        <div class="message-holder self">
            <h2 class="name">${nameVal}</h2>
            <p class="message">${msgVal}</p>
        </div>
        `
    } else {
        chatBubble =
        `
        <div class="message-holder">
            <h2 class="name">${nameVal}</h2>
            <p class="message">${msgVal}</p>
        </div>
        `
    }
    
    console.log(chatBubble);
    chatRoom.innerHTML += chatBubble;

    console.log(chatRoom.scrollHeight);
    chatRoom.scrollTo(0, chatRoom.scrollHeight);
});

function handleSubmit(e){
    e.preventDefault();

    let name = inputs[0].value;
    let message = inputs[1].value;
    let now = new Date();
    console.log(now.toTimeString().substring(0,8));
    console.log(now.toISOString().substr(0,10));


    //push data and store in database
    firebase.database().ref('chat').child('message').push({
        name: name,
        msg: message,
        // add date values here
    });


    console.log(`name: ${inputs[0].value}, message: ${inputs[1].value}`);
    
    // let chatBubble = 
    // `
    // <div class="message-holder">
    //     <h2 class="name">${name}</h2>
    //     <p class="message">${message}</p>
    // </div>
    // `
    
    // console.log(chatBubble);
    // chatRoom.innerHTML += chatBubble;

    form.reset();
}

// function handleMessage(){
//     console.log(`name: ${inputs[0].value}, message: ${inputs[1].value}`);
//     inputs[0].value = "";
//     inputs[1].value = "";
// }