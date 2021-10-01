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

// declare a variable for the credentials container
const credentials = document.querySelector('.credentials');

// add a submit event listener for credentials
credentials.addEventListener('submit', handleLogin);

// logic to handleLogin
function handleLogin(e){
    // prevent page from refereshing during submission
    e.preventDefault();

    // get data from from form
    // create a variable in sessionStorage
    sessionStorage.setItem('userid', e.target.elements.userid.value);
    // assign a local variable and get the value from sessionStorage
    let userid = sessionStorage.getItem('userid');
    // get password from the password input
    let password = e.target.elements.password.value;
    // set target to the form element
    let target = e.target;
    // initialise userFound to false
    let userFound = false;

    // check which form is being targeted (login vs signup)
    // logic for login form submission
    if (target && target.matches('.login-form')){
        console.log('matches login form');
        // load list of users from users table in firebase db
        firebase.database().ref('chat').child('users').on('child_added', function(snapshot){
            // console.log(snapshot);
            console.log(snapshot.val().userid);
            // declare variables for userid and password from data retrieved
            let nameVal = snapshot.val().userid;
            let pwdVal = snapshot.val().password;

            // user validation logic
            if (userid == nameVal && password == pwdVal){
                console.log(userFound);
                // set userFound to true if user and password matches
                userFound = true;
                // reset form
                e.target.reset();
                // redirect to chat page
                window.location.href = "chat.html";
            } else {
                // set userFound to false
                userFound = false;
            }
        })
        // wait for user validation to complete before alerting for invalid credentials
        setTimeout(function(){
            if (userFound == false){
                alert('Invalid credentials');
            }
        }, 800);
      // logic for signup form submission
    } else if (target && target.matches('.signup-form')){
        console.log('matches signup form');
        // push user credentials to the users table in firebase
        firebase.database().ref('chat').child('users').push({
            userid: userid,
            password: password
        });
        alert(`Created account for ${userid}. Logging you in.`);
        e.target.reset();
        // wait for user to be created in firebase before redirecting to chat page
        setTimeout(function(){
            window.location.href = "chat.html";
        }, 1000);
    }
}

// add a click listener for the forms
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
    
