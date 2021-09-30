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

const credentials = document.querySelector('.credentials');
const login = document.querySelector('.login-form');
// const signup = document.querySelecotr('.signup-form');
const signupLink = document.querySelector('.signup-redirect');
// const loginLink = document.querySelector('.login-redirect');

login.addEventListener('submit', handleLogin);

function handleLogin(e){
    e.preventDefault();
    // console.log(e.target);
    console.log(e.target.elements.userid.value);
    console.log(e.target.elements.password.value);

    // get data from form 
    const userid= e.target.elements.userid.value;
    const password = e.target.elements.password.value;
    
    // check if user exists
    firebase.database().ref('chat').child('users').on('child_added', function(snapshot){
        console.log(snapshot);
        console.log(snapshot.val().userid);
        let nameVal = snapshot.val().userid;
        let pwdVal = snapshot.val().password;

        if (userid == nameVal && password == pwdVal){
            // reset form fields
            login.reset();
            window.location.href = "chat.html";
        } else {
            alert("Invalid Credentials");
            // push user credentials to the users table in firebase
            // firebase.database().ref('chat').child('users').push({
            //     userid: userid,
            //     password: password
            // });
            return;
        }
    })
}

signupLink.addEventListener('click', displaySignUpForm);

function displaySignUpForm(){
    credentials.innerHTML = 
    `
    <form class="signup-form signup">
        <input id="userid" type="text" placeholder="Username" required autocomplete="off">
        <input id="password" type="password" placeholder="Password" required>
        <button class="signup-btn" type="submit">Sign Up</button>
        <p>Already have an account? <a class="login-redirect" href="#">Login</a></p>
    </form>
    `

    const signup = document.querySelector('.signup-form');
    const loginLink = document.querySelector('.login-redirect');
    
    // signup.addEventListener('submit', handleSignUp);
    loginLink.addEventListener('click', redirectLogin);
}

function redirectLogin(){
    credentials.innerHTML = 
    `
    <form class="login-form login">
        <input id="userid" type="text" placeholder="Username" required autocomplete="off">
        <input id="password" type="password" placeholder="Password" required>
        <button class="login-btn" type="submit">Login</button>
        <p>Don't have an account? <a class="signup-redirect" href="#">Signup</a></p>
    </form>
    `
    
    const login = document.querySelector('.login-form');
    const signupLink = document.querySelector('.signup-redirect');

    signupLink.addEventListener('click', displaySignUpForm);
}
