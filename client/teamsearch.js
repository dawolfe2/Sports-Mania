
async function searchteams() {

    //clear old values
    teamhtml = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8']
    buttonhtml = ['profile1', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6', 'profile7', 'profile8']
    pichtml = ['teampic1', 'teampic2', 'teampic3', 'teampic4', 'teampic5', 'teampic6', 'teampic7', 'teampic8']
    document.getElementById('searchresult').innerHTML = ""
    for (let i = 0; i < 8; i++) {
        document.getElementById(teamhtml[i]).style.visibility = "hidden";
        document.getElementById(buttonhtml[i]).style.visibility = "hidden";
        document.getElementById(pichtml[i]).style.visibility = "hidden";
        document.getElementById(`divt${i + 1}`).style.display = "none";
    }

    //get input search box text
    const search = document.getElementById('search').value

    //Switches search type depending on sport filter
    nba = false;
    nfl = false;
    nhl = false
    if (document.getElementById('radioNBA').checked) {
        nba = true;
    }
    else if (document.getElementById('radioNFL').checked) {
        nfl = true;
    }
    else if (document.getElementById('radioNHL').checked) {
        nhl = true;
    }

    //API and logic for NBA teams
    if (nba) {
        window.localStorage.setItem('teamsearchsport', 0);
        const searchteams = {
            method: 'GET',
            url: 'https://www.balldontlie.io/api/v1/teams',
            params: { per_page: 50 },
            // headers: {
            //     'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
            //     'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            // }
        };

        axios.request(searchteams).then(function (response) {
            teamsID = []
            teamsNames = []
            index = 0
            indexMatch = 0
            while (response.data.data[index] != null && indexMatch < 8) {
                if (response.data.data[index].full_name.toLowerCase().includes(search.toLowerCase())) {
                    teamsID.push(response.data.data[index].id)
                    teamsNames.push(response.data.data[index].full_name)
                    document.getElementById(teamhtml[indexMatch]).innerHTML = response.data.data[index].full_name
                    document.getElementById(teamhtml[indexMatch]).style.visibility = "visible";
                    picurlfull = `pics/nbateam/${response.data.data[index].id}.png`
                    document.getElementById(pichtml[indexMatch]).src = picurlfull;
                    document.getElementById(pichtml[indexMatch]).style.visibility = "visible";
                    document.getElementById(buttonhtml[indexMatch]).style.visibility = "visible";
                    document.getElementById(`divt${indexMatch + 1}`).style.display = "block"
                    indexMatch = indexMatch + 1
                }
                index = index + 1
            }
            if (indexMatch == 0) {
                document.getElementById('searchresult').innerHTML = "No Search Results Found"
            }
        });
    }

    //API and logic for searching NFL teams
    else if (nfl) {
        window.localStorage.setItem('teamsearchsport', 1);
        const teamsearch = {
            method: 'GET',
            url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/2022',
            headers: {
                'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
            }
        };

        axios.request(teamsearch).then(function (response) {
            teamsID = []
            teamsNames = []
            itotal = 0
            itoadd = 0
            while (itotal < response.data._embedded.teamWinStatsList.length && itoadd < 8) {
                if (response.data._embedded.teamWinStatsList[itotal].name.toLowerCase().includes(search.toLowerCase())) {
                    teamsNames.push(response.data._embedded.teamWinStatsList[itotal].name)
                    document.getElementById(teamhtml[itoadd]).innerHTML = response.data._embedded.teamWinStatsList[itotal].name
                    document.getElementById(teamhtml[itoadd]).style.visibility = "visible";
                    teamsID.push(itotal)
                    picurlfull = "pics/no-image.jpg"
                    document.getElementById(pichtml[itoadd]).src = picurlfull;
                    document.getElementById(pichtml[itoadd]).style.visibility = "visible";
                    document.getElementById(buttonhtml[itoadd]).style.visibility = "visible";
                    document.getElementById(`divt${itoadd + 1}`).style.display = "block"
                    itoadd = itoadd + 1
                }
                itotal = itotal + 1
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    else if (nhl) {
        window.localStorage.setItem('teamsearchsport', 2);
        //find team names and id
        teamsID = []
        teamsNames = []
        count = 0
        const nhlteams = {
            method: 'GET',
            url: 'JSON/nhlteams.json',
        };
        axios.request(nhlteams).then(function (response) {
            i = 0
            nhlteamid = 1
            while (i < 32 && count < 8) {
                if (nhlteamid == 11) {
                    nhlteamid = 12
                }
                else if (nhlteamid == 27) {
                    nhlteamid = 28
                }
                else if (nhlteamid == 31) {
                    nhlteamid = 52
                }
                if (response.data.teams[i].name.toLowerCase().includes(search.toLowerCase())) {
                    teamname = response.data.teams[i].name
                    document.getElementById(teamhtml[count]).innerHTML = teamname
                    document.getElementById(teamhtml[count]).style.visibility = "visible";
                    // picurlfull = `pics/nbateam/${response.data.data[index].id}.png`
                    // document.getElementById(pichtml[count]).src = picurlfull;
                    document.getElementById(pichtml[count]).style.visibility = "visible";
                    document.getElementById(buttonhtml[count]).style.visibility = "visible";
                    document.getElementById(`divt${count + 1}`).style.display = "block"
                    teamsNames.push(teamname)
                    teamsID.push(nhlteamid)
                    count = count + 1
                }
                i = i + 1
                nhlteamid = nhlteamid + 1
            }
        }).catch(function (error) {
            console.error(error);
        });
    }


}

async function profile1() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[0]);
        window.localStorage.setItem('nbaTeamName', teamsNames[0]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[0]);
        window.localStorage.setItem('nflTeamName', teamsNames[0]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[0]);
        window.localStorage.setItem('nhlTeamName', teamsNames[0]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile2() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[1]);
        window.localStorage.setItem('nbaTeamName', teamsNames[1]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[1]);
        window.localStorage.setItem('nflTeamName', teamsNames[1]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[1]);
        window.localStorage.setItem('nhlTeamName', teamsNames[1]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile3() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[2]);
        window.localStorage.setItem('nbaTeamName', teamsNames[2]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[2]);
        window.localStorage.setItem('nflTeamName', teamsNames[2]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[2]);
        window.localStorage.setItem('nhlTeamName', teamsNames[2]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile4() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[3]);
        window.localStorage.setItem('nbaTeamName', teamsNames[3]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[3]);
        window.localStorage.setItem('nflTeamName', teamsNames[3]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[3]);
        window.localStorage.setItem('nhlTeamName', teamsNames[3]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile5() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[4]);
        window.localStorage.setItem('nbaTeamName', teamsNames[4]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[4]);
        window.localStorage.setItem('nflTeamName', teamsNames[4]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[4]);
        window.localStorage.setItem('nhlTeamName', teamsNames[4]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile6() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[5]);
        window.localStorage.setItem('nbaTeamName', teamsNames[5]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[5]);
        window.localStorage.setItem('nflTeamName', teamsNames[5]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[5]);
        window.localStorage.setItem('nhlTeamName', teamsNames[5]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile7() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[6]);
        window.localStorage.setItem('nbaTeamName', teamsNames[6]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[6]);
        window.localStorage.setItem('nflTeamName', teamsNames[6]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[6]);
        window.localStorage.setItem('nhlTeamName', teamsNames[6]);
        window.location.href = "nhlteamstats.html";
    }
}

async function profile8() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[7]);
        window.localStorage.setItem('nbaTeamName', teamsNames[7]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[7]);
        window.localStorage.setItem('nflTeamName', teamsNames[7]);
        window.location.href = "nflteamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 2) {
        window.localStorage.setItem('nhlTeamID', teamsID[7]);
        window.localStorage.setItem('nhlTeamName', teamsNames[7]);
        window.location.href = "nhlteamstats.html";
    }
}


