
//navigation header logged in/logged out status display
async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('logout-btn').innerHTML = "Logout";
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }
    else {
    }

}

function logout() {
    window.localStorage.setItem('user', "");
    window.location.href = "index.html";
}