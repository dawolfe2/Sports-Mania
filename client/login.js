
//keep navigation header alive
function keeplive() {
    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }
    else {
    }
}

function logout() {
    empty = "";
    window.localStorage.setItem('user', empty);
}

function login() {
    const formuser = document.getElementById('Uname').value;
    const formpass = document.getElementById('Pw').value;
    var passformat = /^[A-Za-z]\w{2,15}$/;
    var userformat = /^[A-Za-z]\w{1,15}$/;
    if (formuser.length === 0 || formpass.length === 0) {
        console.log("Empty Field");
        document.getElementById('regstatus').innerHTML = "Empty Field";
    }
    else if (!formuser.match(userformat)) {
        console.log("Invalid Username format")
        document.getElementById('regstatus').innerHTML = "Invalid Username format";
    }
    else if (!formpass.match(passformat)) {
        console.log("Invalid Password format")
        document.getElementById('regstatus').innerHTML = "Invalid Password format";
    }
    else {
        //axios.post("https://csi4999-server.herokuapp.com/api/login", {
        axios.post("http://localhost:3001/api/login", {
            username: formuser,
            password: formpass,
        }).then(function (response) {
            if (response.data.loggedIn) {
                console.log("Logged In")
                window.localStorage.setItem('user', formuser);
                window.location.href = "index.html";
            }
            else if (!response.data.loggedIn) {
                console.log("Failed to Log In")
                document.getElementById('regstatus').innerHTML = "Failed to Log In, Wrong Username or Password";
            }
            else {
                console.log("error");
            }
        })
    }
}