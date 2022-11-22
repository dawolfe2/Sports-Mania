async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }
    else {
    }

    teamid = window.localStorage.getItem('nbaTeamID');
    teamname = window.localStorage.getItem('nbaTeamName');
    document.getElementById('teamname').innerHTML = teamname
    picurlfull = `pics/nbateam/${teamid}.png`
    document.getElementById('teampic').src = picurlfull;

    //date format YYYY-MM-DD'
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;

    const gamessearch = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: { seasons: [2022], team_ids: [teamid], end_date: today, per_page: 100 },
    };

    axios.request(gamessearch).then(function (response) {
        games = 0
        win = 0
        lost = 0
        index = 0
        while (index < response.data.data.length) {
            if (response.data.data[index].home_team.id == teamid && response.data.data[index].home_team_score > response.data.data[index].visitor_team_score) {
                win = win + 1
            }
            else if (response.data.data[index].visitor_team.id == teamid && response.data.data[index].home_team_score < response.data.data[index].visitor_team_score) {
                win = win + 1
            }
            else {
                lost = lost + 1
            }
            index = index + 1
        }
        games = win + lost
        document.getElementById('gamesplayed').innerHTML = `Games Played: ${games}`
        document.getElementById('gameswon').innerHTML = `Won: ${win}`
        document.getElementById('gameslost').innerHTML = `Lost: ${lost}`
        winrate = (((win * 1.0) / games * 1.0) * 100).toFixed(2)
        document.getElementById('winrate').innerHTML = `Winrate: ${winrate}%`

    }).catch(function (error) {
        console.error(error);
    });

}

async function favorite() {
    username = window.localStorage.getItem('user');
    if (username != "" && username != null) {
        fav = `1${teamid}#${teamname}`
        //axios.post("https://csi4999-server.herokuapp.com/api/favoriteteam", {
        axios.post("http://localhost:3001/api/favoriteteam", {
            username: username,
            favorite: fav,
        }).then(function (response) {
            if (response.data.status == 0) {
                document.getElementById('favmessage').innerHTML = "Added to Favorites"
                console.log("succeeded to add favorite")
            }
            else if (response.data.status == 1) {
                document.getElementById('favmessage').innerHTML = "Favorites List is full!"
                console.log("Failed to add favorite")
            }
            else if (response.data.status == 2) {
                document.getElementById('favmessage').innerHTML = "Favorite Already Exists!"
                console.log("Failed to add favorite")
            }
            else if (response.data.status == 3) {
                document.getElementById('favmessage').innerHTML = "Not Logged In!"
                console.log("Failed to add favorite")
            }
            else {
                console.log("error");
            }
        })
    }
}