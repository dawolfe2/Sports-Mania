async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }

    //retrieve local storage player info
    playerid = window.localStorage.getItem('nhlplayerID');
    playerteam = window.localStorage.getItem('nhlplayerTeam');
    playername = window.localStorage.getItem('nhlplayerFN',);
    document.getElementById('teamname').innerHTML = playerteam
    document.getElementById('playername').innerHTML = playername

    //get player picture with player id
    picurl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerid}.jpg`
    document.getElementById('playerpic').src = picurl;

    //search player stats api call
    const playersearch = {
        method: 'GET',
        url: `https://statsapi.web.nhl.com/api/v1/people/${playerid}?hydrate=stats(splits=statsSingleSeason)`,
    };
    axios.request(playersearch).then(function (response) {
        try {
            if (response.data.people[0].stats[0].splits[0].stat.shots != null) {
                document.getElementById(`playerposition`).innerHTML = response.data.people[0].primaryPosition.type
                document.getElementById('stat1').innerHTML = `Games Played: ${response.data.people[0].stats[0].splits[0].stat.games}`
                document.getElementById('stat2').innerHTML = `Shots: ${response.data.people[0].stats[0].splits[0].stat.shots}`
                document.getElementById('stat3').innerHTML = `Shot%: ${response.data.people[0].stats[0].splits[0].stat.shotPct.toFixed(2)}%`
                document.getElementById('stat4').innerHTML = `Goals: ${response.data.people[0].stats[0].splits[0].stat.goals}`
                document.getElementById('stat5').innerHTML = `Assists: ${response.data.people[0].stats[0].splits[0].stat.assists}`
                document.getElementById('stat6').innerHTML = `Points: ${response.data.people[0].stats[0].splits[0].stat.points}`
                document.getElementById('stat7').innerHTML = `Power Play Goals: ${response.data.people[0].stats[0].splits[0].stat.powerPlayGoals}`
                document.getElementById('stat8').innerHTML = `Power Play Points: ${response.data.people[0].stats[0].splits[0].stat.powerPlayPoints}`
                document.getElementById('stat9').innerHTML = `Time on Ice per Game: ${response.data.people[0].stats[0].splits[0].stat.timeOnIcePerGame}`
            }
            else {
                document.getElementById(`playerposition`).innerHTML = response.data.people[0].primaryPosition.type
                document.getElementById('stat1').innerHTML = `Games Played: ${response.data.people[0].stats[0].splits[0].stat.games}`
                document.getElementById('stat2').innerHTML = `Wins: ${response.data.people[0].stats[0].splits[0].stat.wins}`
                document.getElementById('stat3').innerHTML = `Losses: ${response.data.people[0].stats[0].splits[0].stat.losses}`
                document.getElementById('stat4').innerHTML = `Shots Against: ${response.data.people[0].stats[0].splits[0].stat.shotsAgainst}`
                document.getElementById('stat5').innerHTML = `Saves: ${response.data.people[0].stats[0].splits[0].stat.saves}`
                document.getElementById('stat6').innerHTML = `Goals Against: ${response.data.people[0].stats[0].splits[0].stat.goalsAgainst}`
                document.getElementById('stat7').innerHTML = `Goals Against per Game: ${response.data.people[0].stats[0].splits[0].stat.goalAgainstAverage.toFixed(2)}`
                document.getElementById('stat8').innerHTML = `Shutouts: ${response.data.people[0].stats[0].splits[0].stat.shutouts}`
                document.getElementById('stat9').innerHTML = `Time on Ice per Game: ${response.data.people[0].stats[0].splits[0].stat.timeOnIcePerGame}`
            }
        } catch (error) {
            console.log("player stats not available")
        }
    }).catch(function (error) {
        console.error(error);
    });

}

async function favorite() {
    username = window.localStorage.getItem('user');
    if (username != "") {
        fav = `3${playerid}#${playername}#${playername}#${playerteam}`
        //axios.post("https://csi4999-server.herokuapp.com/api/favoriteplayer", {
        axios.post("http://localhost:3001/api/favoriteplayer", {
            username: username,
            favorite: fav,
        }).then(function (response) {
            if (response.data.status == 0) {
                document.getElementById('favmessage').innerHTML = "Added to favorites"
                console.log("succeeded to add favorite")
            }
            else if (response.data.status == 1) {
                document.getElementById('favmessage').innerHTML = "Favorites List is full!"
                console.log("Failed to add favorite")
            }
            else if (response.data.status == 2) {
                document.getElementById('favmessage').innerHTML = "Favorite already Exists!"
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