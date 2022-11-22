async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }

    //get stored team name and id
    teamid = window.localStorage.getItem('nhlTeamID');
    teamname = window.localStorage.getItem('nhlTeamName');

    //fill html elements with data
    document.getElementById('teamname').innerHTML = teamname

    //call nhl api
    const searchteams = {
        method: 'GET',
        url: `https://statsapi.web.nhl.com/api/v1/teams/${teamid}/?hydrate=stats(splits=statsSingleSeason)`,
    };

    axios.request(searchteams).then(function (response) {
        console.log(response.data.teams[0].teamStats[0].splits[0].stat)
        games = response.data.teams[0].teamStats[0].splits[0].stat.gamesPlayed
        win = response.data.teams[0].teamStats[0].splits[0].stat.wins
        lost = response.data.teams[0].teamStats[0].splits[0].stat.losses
        winrate = (((win * 1.0) / games * 1.0) * 100).toFixed(2)
        goalsagainstpergame = response.data.teams[0].teamStats[0].splits[0].stat.goalsAgainstPerGame
        goalspergame = response.data.teams[0].teamStats[0].splits[0].stat.goalsPerGame
        faceoffwinpct = response.data.teams[0].teamStats[0].splits[0].stat.faceOffWinPercentage
        document.getElementById('gamesplayed').innerHTML = games
        document.getElementById('gameswon').innerHTML = win
        document.getElementById('gameslost').innerHTML = lost
        document.getElementById('winrate').innerHTML = `${winrate}%`
        document.getElementById('gpg').innerHTML = goalsagainstpergame.toFixed(2)
        document.getElementById('gapg').innerHTML = goalspergame.toFixed(2)
        document.getElementById('fowp').innerHTML = `${faceoffwinpct}%`
    }).catch(function (error) {
        console.error(error);
    });
}

async function favorite() {
    username = window.localStorage.getItem('user');
    if (username != "" && username != null) {
        fav = `3${teamid}#${teamname}`
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