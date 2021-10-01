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
// console.log(firebase);

// console.log(`user: ${sessionStorage.getItem('userid')}`);
let userid = sessionStorage.getItem('userid');
// const userid = sesionStorage.getItem('userid');
const sendBtn = document.querySelector('.send-btn');
const inputs = document.querySelectorAll('input');
const form = document.querySelector('.chat-holder');
const chatRoom = document.querySelector('.chat-room');

// sendBtn.addEventListener('click', handleMessage);
form.addEventListener('submit', handleSubmit);

// get data from firebase when page is loaded
firebase.database().ref('chat').child('message').on('child_added', function(snapshot){
    // console.log(snapshot.val());
    // let nameVal = snapshot.val().name; // string
    let nameVal = snapshot.val().name; 
    let msgVal = snapshot.val().msg; // string
    let dateVal = snapshot.val().date;
    let timeVal = snapshot.val().time;

    // to remove undefined values for test data
    if (!dateVal){
        dateVal = "";
    }
    if (!timeVal){
        timeVal = "";
    }

    let chatBubble = document.createElement('div');
    chatBubble.classList.add('message-holder','self');

    chatBubble.innerHTML = 
    `
        <h4 class="name">${nameVal}</h4>
        <p class="message">${msgVal}</p>
        <span class="timestamp">${dateVal} ${timeVal}</span>
    `

    // console.log(chatBubble);

    if(nameVal !== userid){
        chatBubble.classList.remove('self');
    } 

    chatRoom.appendChild(chatBubble);

    // console.log(chatRoom.scrollHeight);
    chatRoom.scrollTo(0, chatRoom.scrollHeight);
});

function handleSubmit(e){
    e.preventDefault();

    // let name = inputs[0].value;
    let name = userid;
    console.log(`name: ${userid}`);
    let message = e.target.elements.message.value;
    // console.log(e.target.elements.message.value);
    let now = new Date();

    //get the date, month and year
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = now.getFullYear();

    let date = dd + '/' + mm + '/' + yyyy;
    let time = now.toTimeString().substring(0,5);
    // console.log(now.toTimeString().substring(0,8));

    // console.log(date);

    // console.log(now);
    // console.log(now.toTimeString().substring(0,8));
    // console.log(now.toISOString().substr(0,10));


    // push data and store in database
    firebase.database().ref('chat').child('message').push({
        name: name,
        msg: message,
        // add date values here
        date: date,
        time: time
    });


    // console.log(`name: ${inputs[0].value}, message: ${inputs[1].value}`);

    form.reset();
}
