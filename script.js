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


credentials.addEventListener('submit', handleLogin);

function handleLogin(e){
    e.preventDefault();

    // get data from form 
    // let userid= e.target.elements.userid.value;
    sessionStorage.setItem('userid', e.target.elements.userid.value);
    let userid = sessionStorage.getItem('userid');
    let password = e.target.elements.password.value;
    let target = e.target;
    let userFound = false;

    // if submit belongs to login button 
    if (target && target.matches('.login-form')){
        console.log('matches login form');
        // check if user exists
        firebase.database().ref('chat').child('users').on('child_added', function(snapshot){
            // console.log(snapshot);
            console.log(snapshot.val().userid);
            let nameVal = snapshot.val().userid;
            let pwdVal = snapshot.val().password;

            if (userid == nameVal && password == pwdVal){
                // reset form fields
                console.log(userFound);
                userFound = true;
                e.target.reset();
                window.location.href = "chat.html";
            } else {
                userFound = false;
            }
        })
        setTimeout(function(){
            if (userFound == false){
                alert('Invalid credentials');
            }
        }, 500);
    } else if (target && target.matches('.signup-form')){
        console.log('matches signup form');
        // push user credentials to the users table in firebase
        firebase.database().ref('chat').child('users').push({
            userid: userid,
            password: password
        });
        alert(`Created account for ${userid}. Logging you in.`);
        e.target.reset();
        setTimeout(function(){
            window.location.href = "chat.html";
        }, 1000);
    }
}

credentials.addEventListener('click', displayForm);

function displayForm(e){
    // console.log('clicked signup')
    
    let target = e.target;
    console.log(target);
    if (target && target.matches('.signupRedirect')){
        console.log('redirect to signup');
        credentials.innerHTML = 
        `
        <form class="signup-form" id="signup">
            <input id="userid" type="text" placeholder="Username" required autocomplete="off">
            <input id="password" type="password" placeholder="Password" required>
            <button id="signupBtn" type="submit">Sign Up</button>
            <p>Already have an account? <a class="loginRedirect" href="#">Login</a></p>
        </form>
        `
    } else if (target && target.matches('.loginRedirect')){
        console.log('redirect to login');
        credentials.innerHTML = 
        `
        <form class="login-form" id="login">
            <input id="userid" type="text" placeholder="Username" required autocomplete="off">
            <input id="password" type="password" placeholder="Password" required>
            <button id="loginBtn" type="submit">Login</button>
            <p>Don't have an account? <a class="signupRedirect" href="#">Signup</a></p>
        </form>
        `
    }
}
    
