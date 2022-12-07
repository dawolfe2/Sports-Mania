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
        url: `https://statsapi.web.nhl.com/api/v1/people/${playerid}?hydrate=stats(splits=yearByYear)`,
    };
    axios.request(playersearch).then(function (response) {
        //searching for current season stats
        //console.log(response.data)
        yShots = []
        yGoals = []
        yAssists = []
        ySaves = []
        yShotsAgainst = []
        yGoalAgainst = []
        xSeasons = []
        isearching = 0
        while (response.data.people[0].stats[0].splits[isearching] != null) {
            if (response.data.people[0].stats[0].splits[isearching].season == '20222023') {
                try {
                    if (response.data.people[0].stats[0].splits[isearching].stat.shots != null && response.data.people[0].stats[0].splits[isearching].season != response.data.people[0].stats[0].splits[isearching - 1].season) {
                        position = 1
                        xSeasons.push(response.data.people[0].stats[0].splits[isearching].season.substring(0, 4))
                        yShots.push(response.data.people[0].stats[0].splits[isearching].stat.shots)
                        yGoals.push(response.data.people[0].stats[0].splits[isearching].stat.goals)
                        yAssists.push(response.data.people[0].stats[0].splits[isearching].stat.assists)
                        document.getElementById(`playerposition`).innerHTML = response.data.people[0].primaryPosition.type
                        document.getElementById('stat1').innerHTML = `Games Played: ${response.data.people[0].stats[0].splits[isearching].stat.games}`
                        document.getElementById('stat2').innerHTML = `Shots: ${response.data.people[0].stats[0].splits[isearching].stat.shots}`
                        document.getElementById('stat3').innerHTML = `Shot%: ${response.data.people[0].stats[0].splits[isearching].stat.shotPct.toFixed(2)}%`
                        document.getElementById('stat4').innerHTML = `Goals: ${response.data.people[0].stats[0].splits[isearching].stat.goals}`
                        document.getElementById('stat5').innerHTML = `Assists: ${response.data.people[0].stats[0].splits[isearching].stat.assists}`
                        document.getElementById('stat6').innerHTML = `Points: ${response.data.people[0].stats[0].splits[isearching].stat.points}`
                        document.getElementById('stat7').innerHTML = `Power Play Goals: ${response.data.people[0].stats[0].splits[isearching].stat.powerPlayGoals}`
                        document.getElementById('stat8').innerHTML = `Power Play Points: ${response.data.people[0].stats[0].splits[isearching].stat.powerPlayPoints}`
                        document.getElementById('stat9').innerHTML = `Time on Ice: ${response.data.people[0].stats[0].splits[isearching].stat.timeOnIce}`
                    }
                    else if (response.data.people[0].stats[0].splits[isearching].stat.shotsAgainst != null && response.data.people[0].stats[0].splits[isearching].season != response.data.people[0].stats[0].splits[isearching - 1].season) {
                        position = 2
                        xSeasons.push(response.data.people[0].stats[0].splits[isearching].season.substring(0, 4))
                        ySaves.push(response.data.people[0].stats[0].splits[isearching].stat.saves)
                        yShotsAgainst.push(response.data.people[0].stats[0].splits[isearching].stat.shotsAgainst)
                        yGoalAgainst.push(response.data.people[0].stats[0].splits[isearching].stat.goalsAgainst)
                        document.getElementById(`playerposition`).innerHTML = response.data.people[0].primaryPosition.type
                        document.getElementById('stat1').innerHTML = `Games Played: ${response.data.people[0].stats[0].splits[isearching].stat.games}`
                        document.getElementById('stat2').innerHTML = `Wins: ${response.data.people[0].stats[0].splits[isearching].stat.wins}`
                        document.getElementById('stat3').innerHTML = `Losses: ${response.data.people[0].stats[0].splits[isearching].stat.losses}`
                        document.getElementById('stat4').innerHTML = `Shots Against: ${response.data.people[0].stats[0].splits[isearching].stat.shotsAgainst}`
                        document.getElementById('stat5').innerHTML = `Saves: ${response.data.people[0].stats[0].splits[isearching].stat.saves}`
                        document.getElementById('stat6').innerHTML = `Goals Against: ${response.data.people[0].stats[0].splits[isearching].stat.goalsAgainst}`
                        document.getElementById('stat7').innerHTML = `Goals Against per Game: ${response.data.people[0].stats[0].splits[isearching].stat.goalAgainstAverage.toFixed(2)}`
                        document.getElementById('stat8').innerHTML = `Shutouts: ${response.data.people[0].stats[0].splits[isearching].stat.shutouts}`
                        document.getElementById('stat9').innerHTML = `Time on Ice: ${response.data.people[0].stats[0].splits[isearching].stat.timeOnIce}`
                    }
                } catch (error) {
                    console.log("player stats not available")
                }
            }
            else {
                try {
                    if (response.data.people[0].stats[0].splits[isearching].stat.shots != null && response.data.people[0].stats[0].splits[isearching].season != response.data.people[0].stats[0].splits[isearching - 1].season) {
                        position = 1
                        xSeasons.push(response.data.people[0].stats[0].splits[isearching].season.substring(0, 4))
                        yShots.push(response.data.people[0].stats[0].splits[isearching].stat.shots)
                        yGoals.push(response.data.people[0].stats[0].splits[isearching].stat.goals)
                        yAssists.push(response.data.people[0].stats[0].splits[isearching].stat.assists)
                    }
                    else if (response.data.people[0].stats[0].splits[isearching].stat.shotsAgainst != null && response.data.people[0].stats[0].splits[isearching].season != response.data.people[0].stats[0].splits[isearching - 1].season) {
                        position = 2
                        xSeasons.push(response.data.people[0].stats[0].splits[isearching].season.substring(0, 4))
                        ySaves.push(response.data.people[0].stats[0].splits[isearching].stat.saves)
                        yShotsAgainst.push(response.data.people[0].stats[0].splits[isearching].stat.shotsAgainst)
                        yGoalAgainst.push(response.data.people[0].stats[0].splits[isearching].stat.goalsAgainst)
                    }
                } catch (error) {
                }
            }
            isearching = isearching + 1
        }
        //Put data into graphs
        if (position == 1) {
            new Chart("ChartPTS", {
                type: "line",
                data: {
                    labels: xSeasons,
                    datasets: [{
                        label: 'Average Shots per Season',
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: yShots
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
            new Chart("ChartMIN", {
                type: "line",
                data: {
                    labels: xSeasons,
                    datasets: [{
                        label: 'Average Goals per Season',
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: yGoals
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
            new Chart("ChartFG", {
                type: "line",
                data: {
                    labels: xSeasons,
                    datasets: [{
                        label: 'Average Assists per Season',
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: yAssists
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
        }
        else {
            new Chart("ChartPTS", {
                type: "line",
                data: {
                    labels: xSeasons,
                    datasets: [{
                        label: 'Average Saves per Season',
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: ySaves
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
            new Chart("ChartMIN", {
                type: "line",
                data: {
                    labels: xSeasons,
                    datasets: [{
                        label: 'Average Shots Against per Season',
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: yShotsAgainst
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
            new Chart("ChartFG", {
                type: "line",
                data: {
                    labels: xSeasons,
                    datasets: [{
                        label: 'Average Goals Against per Season',
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: yGoalAgainst
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
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