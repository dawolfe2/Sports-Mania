async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('logout-btn').innerHTML = "Logout";
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }

    //retrieve local storage player info
    playerid = window.localStorage.getItem('nflplayerID');
    playerteam = window.localStorage.getItem('nflplayerTeam');
    playername = window.localStorage.getItem('nflplayerFN');
    playerPosition = window.localStorage.getItem('nflplayerPos');
    document.getElementById('teamname').innerHTML = playerteam
    document.getElementById('playername').innerHTML = playername
    document.getElementById('playerposition').innerHTML = playerPosition

    //get player picture with player id
    picurl = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${playerid}.png&w=350&h=254`
    document.getElementById('playerpic').src = picurl;

    const searchplayersnfl = {
        method: 'GET',
        url: `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/athletes/${playerid}/statistics`,
    };
    axios.request(searchplayersnfl).then(function (response) {
        try {
            document.getElementById('stat1').innerHTML = `Games Played: ${response.data.splits.categories[0].stats[1].value}`
            document.getElementById('stat2').innerHTML = `Total Points per Game: ${response.data.splits.categories[1].stats[9].value}`
            document.getElementById('stat3').innerHTML = `Touchdowns: ${response.data.splits.categories[1].stats[10].value}`
            document.getElementById('stat4').innerHTML = `Field Goals: ${response.data.splits.categories[1].stats[1].value}`
            document.getElementById('stat5').innerHTML = `Defensive Points: ${response.data.splits.categories[1].stats[0].value}`
            document.getElementById('stat6').innerHTML = `Passing Touchdowns: ${response.data.splits.categories[1].stats[4].value}`
            document.getElementById('stat7').innerHTML = `Rushing Touchdowns: ${response.data.splits.categories[1].stats[7].value}`
            document.getElementById('stat8').innerHTML = `Return Touchdowns: ${response.data.splits.categories[1].stats[6].value}`
            document.getElementById('stat9').innerHTML = `Kick Extra Points: ${response.data.splits.categories[1].stats[2].value}`
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
        fav = `2${playerid}#${playername}#${playerPosition}#${playerteam}`
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