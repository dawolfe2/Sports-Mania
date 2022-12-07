function logout() {
    window.localStorage.setItem('user', "");
    window.location.href = "index.html";
}

async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {

        //user information
        document.getElementById('logout-btn').innerHTML = "Logout";
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        document.getElementById('username').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');

        //get user favorites from backend
        //axios.post("https://csi4999-server.herokuapp.com/api/getfavorites", {
        axios.post("http://localhost:3001/api/getfavorites", {
            username: user,
        }).then(function (response) {
            if (response.data[0] != null) {

                //put player and team favorites response from backend into array values
                playerfavs = []
                teamfavs = []
                playerfavs.push(response.data[0].playerfav1)
                playerfavs.push(response.data[0].playerfav2)
                playerfavs.push(response.data[0].playerfav3)
                playerfavs.push(response.data[0].playerfav4)
                playerfavs.push(response.data[0].playerfav5)
                playerfavs.push(response.data[0].playerfav6)
                playerfavs.push(response.data[0].playerfav7)
                playerfavs.push(response.data[0].playerfav8)
                playerfavs.push(response.data[0].playerfav9)
                playerfavs.push(response.data[0].playerfav10)
                teamfavs.push(response.data[0].teamfav1)
                teamfavs.push(response.data[0].teamfav2)
                teamfavs.push(response.data[0].teamfav3)
                teamfavs.push(response.data[0].teamfav4)
                teamfavs.push(response.data[0].teamfav5)
                teamfavs.push(response.data[0].teamfav6)
                teamfavs.push(response.data[0].teamfav7)
                teamfavs.push(response.data[0].teamfav8)
                teamfavs.push(response.data[0].teamfav9)
                teamfavs.push(response.data[0].teamfav10)

                playerfavsports = [null, null, null, null, null, null, null, null, null, null]
                playerfavids = [null, null, null, null, null, null, null, null, null, null]
                playerfavfnames = [null, null, null, null, null, null, null, null, null, null]
                playerfavlnames = [null, null, null, null, null, null, null, null, null, null]
                playerfavteamnames = [null, null, null, null, null, null, null, null, null, null]

                teamfavsports = [null, null, null, null, null, null, null, null, null, null]
                teamfavids = [null, null, null, null, null, null, null, null, null, null]
                teamfavnames = [null, null, null, null, null, null, null, null, null, null]

                //display player favorites
                for (let i = 0; i < 10; i++) {
                    if (playerfavs[i] != null) {
                        switch (playerfavs[i].charAt(0)) {

                            //case 1 is nba
                            case '1':
                                favcode = playerfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                divider2 = null
                                divider3 = null

                                while (index < favcode.length && count < 3) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    else if (count == 1 && favcode[index] == '#') {
                                        divider2 = index
                                        count = count + 1
                                    }
                                    else if (count == 2 && favcode[index] == '#') {
                                        divider3 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }

                                playerfavid = favcode.substring(1, divider1)
                                playerfavfname = favcode.substring(divider1 + 1, divider2)
                                playerfavlname = favcode.substring(divider2 + 1, divider3)
                                playerfavteam = favcode.substring(divider3 + 1)
                                fullname = `${playerfavfname} ${playerfavlname}`
                                document.getElementById(`playerfav${i + 1}name`).innerHTML = fullname
                                document.getElementById(`playerfav${i + 1}team`).innerHTML = playerfavteam
                                document.getElementById(`playerfav${i + 1}name`).style.visibility = "visible";
                                document.getElementById(`playerfav${i + 1}team`).style.visibility = "visible";
                                document.getElementById(`playerfav${i + 1}pic`).style.visibility = "visible";
                                document.getElementById(`player${i + 1}favbutton`).style.visibility = "visible";
                                document.getElementById(`player${i + 1}removebutton`).style.visibility = "visible";
                                document.getElementById(`pfav${i + 1}`).style.visibility = "visible";

                                playerfavids[i] = playerfavid
                                playerfavfnames[i] = playerfavfname
                                playerfavlnames[i] = playerfavlname
                                playerfavteamnames[i] = playerfavteam
                                playerfavsports[i] = 1


                                //get player picture

                                //search nba endpoint for id
                                // const searchpic = {
                                //     method: 'GET',
                                //     url: 'http://data.nba.net/data/10s/prod/v1/2022/players.json',
                                // };

                                //search local json for id
                                const searchpic = {
                                    method: 'GET',
                                    url: 'JSON/nbaplayers.json',
                                };

                                axios.request(searchpic).then(function (response) {
                                    picid = 0
                                    index2 = 0
                                    found = false
                                    while (!found && (response.data.league.standard[index2] != null)) {
                                        if (response.data.league.standard[index2].firstName == playerfavfnames[i] && response.data.league.standard[index2].lastName == playerfavlnames[i]) {
                                            picid = response.data.league.standard[index2].personId
                                            picurlfull = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${picid}.png`
                                            document.getElementById(`playerfav${i + 1}pic`).src = picurlfull;
                                            found = true
                                        }
                                        index2 = index2 + 1
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                });
                                break;


                            //case 3 is nhl
                            case '3':
                                favcode = playerfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                divider2 = null
                                divider3 = null

                                while (index < favcode.length && count < 3) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    else if (count == 1 && favcode[index] == '#') {
                                        divider2 = index
                                        count = count + 1
                                    }
                                    else if (count == 2 && favcode[index] == '#') {
                                        divider3 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }

                                playerfavid = favcode.substring(1, divider1)
                                playerfavname = favcode.substring(divider1 + 1, divider2)
                                playerfavteam = favcode.substring(divider3 + 1)
                                document.getElementById(`playerfav${i + 1}name`).innerHTML = playerfavname
                                document.getElementById(`playerfav${i + 1}team`).innerHTML = playerfavteam
                                document.getElementById(`playerfav${i + 1}name`).style.visibility = "visible";
                                document.getElementById(`playerfav${i + 1}team`).style.visibility = "visible";
                                document.getElementById(`playerfav${i + 1}pic`).style.visibility = "visible";
                                document.getElementById(`player${i + 1}favbutton`).style.visibility = "visible";
                                document.getElementById(`player${i + 1}removebutton`).style.visibility = "visible";
                                document.getElementById(`pfav${i + 1}`).style.visibility = "visible";

                                playerfavids[i] = playerfavid
                                playerfavfnames[i] = playerfavname
                                playerfavteamnames[i] = playerfavteam
                                playerfavsports[i] = 3

                                picurl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerfavid}.jpg`
                                document.getElementById(`playerfav${i + 1}pic`).src = picurl;
                                break;


                            //case 2 is nfl
                            case '2':
                                favcode = playerfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                divider2 = null
                                divider3 = null

                                while (index < favcode.length && count < 3) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    else if (count == 1 && favcode[index] == '#') {
                                        divider2 = index
                                        count = count + 1
                                    }
                                    else if (count == 2 && favcode[index] == '#') {
                                        divider3 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }

                                playerfavid = favcode.substring(1, divider1)
                                playerfavname = favcode.substring(divider1 + 1, divider2)
                                playerfavPos = favcode.substring(divider2 + 1, divider3)
                                playerfavteam = favcode.substring(divider3 + 1)
                                document.getElementById(`playerfav${i + 1}name`).innerHTML = playerfavname
                                document.getElementById(`playerfav${i + 1}team`).innerHTML = playerfavteam
                                document.getElementById(`playerfav${i + 1}name`).style.visibility = "visible";
                                document.getElementById(`playerfav${i + 1}team`).style.visibility = "visible";
                                document.getElementById(`playerfav${i + 1}pic`).style.visibility = "visible";
                                document.getElementById(`player${i + 1}favbutton`).style.visibility = "visible";
                                document.getElementById(`player${i + 1}removebutton`).style.visibility = "visible";
                                document.getElementById(`pfav${i + 1}`).style.visibility = "visible";
                                picurl = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${playerfavid}.png&w=350&h=254`
                                document.getElementById(`playerfav${i + 1}pic`).src = picurl;

                                playerfavids[i] = playerfavid
                                playerfavfnames[i] = playerfavname
                                playerfavlnames[i] = playerfavPos
                                playerfavteamnames[i] = playerfavteam
                                playerfavsports[i] = 2
                                break;
                            default:
                        }
                    }
                    else {
                        //clear data
                        document.getElementById(`playerfav${i + 1}name`).remove();
                        document.getElementById(`playerfav${i + 1}team`).remove();
                        document.getElementById(`playerfav${i + 1}pic`).remove();
                        document.getElementById(`player${i + 1}favbutton`).remove();
                        document.getElementById(`player${i + 1}removebutton`).remove();
                        document.getElementById(`pfav${i + 1}`).remove();
                    }
                }

                //display team favorites
                for (let i = 0; i < 10; i++) {
                    if (teamfavs[i] != null) {
                        switch (teamfavs[i].charAt(0)) {
                            //case 1 is nba
                            case '1':
                                favcode = teamfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                while (index < favcode.length && count < 1) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }
                                teamid = favcode.substring(1, divider1)
                                teamname = favcode.substring(divider1 + 1)
                                document.getElementById(`teamfav${i + 1}name`).innerHTML = teamname
                                picurlfull = `pics/nbateam/${teamid}.png`
                                document.getElementById(`teamfav${i + 1}pic`).src = picurlfull;
                                teamfavsports[i] = 1
                                teamfavids[i] = teamid
                                teamfavnames[i] = teamname
                                break;

                            //case 3 is nhl
                            case '3':
                                favcode = teamfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                while (index < favcode.length && count < 1) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }
                                teamid = favcode.substring(1, divider1)
                                teamname = favcode.substring(divider1 + 1)
                                document.getElementById(`teamfav${i + 1}name`).innerHTML = teamname
                                picurlfull = `pics/nhlteam/${teamname}.png`
                                document.getElementById(`teamfav${i + 1}pic`).src = picurlfull;
                                teamfavsports[i] = 3
                                teamfavids[i] = teamid
                                teamfavnames[i] = teamname
                                break;

                            //case 2 is nfl
                            case '2':
                                favcode = teamfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                while (index < favcode.length && count < 1) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }
                                teamid = favcode.substring(1, divider1)
                                teamname = favcode.substring(divider1 + 1)
                                document.getElementById(`teamfav${i + 1}name`).innerHTML = teamname
                                picurlfull = `pics/nflteam/${teamname}.png`
                                document.getElementById(`teamfav${i + 1}pic`).src = picurlfull;
                                teamfavsports[i] = 2
                                teamfavids[i] = teamid
                                teamfavnames[i] = teamname
                                break;

                            default:
                        }
                    }
                    else {
                        //clear data
                        document.getElementById(`teamfav${i + 1}name`).remove();
                        document.getElementById(`teamfav${i + 1}pic`).remove();
                        document.getElementById(`team${i + 1}favbutton`).remove();
                        document.getElementById(`team${i + 1}removebutton`).remove();
                        document.getElementById(`tfav${i + 1}`).remove();
                    }
                }
            }
            else {
                console.log("failed to get favorites");
            }
        })

    }
    else {
        window.location.href = "login.html";
    }
}

function removeplayerfav1link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep1", {
        axios.post("http://localhost:3001/api/removefavoritep1", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav1name`).remove();
            document.getElementById(`playerfav1team`).remove();
            document.getElementById(`playerfav1pic`).remove();
            document.getElementById(`player1favbutton`).remove();
            document.getElementById(`player1removebutton`).remove();
            document.getElementById(`pfav1`).remove();
        });
    }
}

function removeplayerfav2link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep2", {
        axios.post("http://localhost:3001/api/removefavoritep2", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav2name`).remove();
            document.getElementById(`playerfav2team`).remove();
            document.getElementById(`playerfav2pic`).remove();
            document.getElementById(`player2favbutton`).remove();
            document.getElementById(`player2removebutton`).remove();
            document.getElementById(`pfav2`).remove();
        });
    }
}

function removeplayerfav3link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep3", {
        axios.post("http://localhost:3001/api/removefavoritep3", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav3name`).remove();
            document.getElementById(`playerfav3team`).remove();
            document.getElementById(`playerfav3pic`).remove();
            document.getElementById(`player3favbutton`).remove();
            document.getElementById(`player3removebutton`).remove();
            document.getElementById(`pfav3`).remove();
        });
    }
}

function removeplayerfav4link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep4", {
        axios.post("http://localhost:3001/api/removefavoritep4", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav4name`).remove();
            document.getElementById(`playerfav4team`).remove();
            document.getElementById(`playerfav4pic`).remove();
            document.getElementById(`player4favbutton`).remove();
            document.getElementById(`player4removebutton`).remove();
            document.getElementById(`pfav4`).remove();
        });
    }
}

function removeplayerfav5link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep5", {
        axios.post("http://localhost:3001/api/removefavoritep5", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav5name`).remove();
            document.getElementById(`playerfav5team`).remove();
            document.getElementById(`playerfav5pic`).remove();
            document.getElementById(`player5favbutton`).remove();
            document.getElementById(`player5removebutton`).remove();
            document.getElementById(`pfav5`).remove();
        });
    }
}

function removeplayerfav6link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep6", {
        axios.post("http://localhost:3001/api/removefavoritep6", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav6name`).remove();
            document.getElementById(`playerfav6team`).remove();
            document.getElementById(`playerfav6pic`).remove();
            document.getElementById(`player6favbutton`).remove();
            document.getElementById(`player6removebutton`).remove();
            document.getElementById(`pfav6`).remove();
        });
    }
}

function removeplayerfav7link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep7", {
        axios.post("http://localhost:3001/api/removefavoritep7", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav7name`).remove();
            document.getElementById(`playerfav7team`).remove();
            document.getElementById(`playerfav7pic`).remove();
            document.getElementById(`player7favbutton`).remove();
            document.getElementById(`player7removebutton`).remove();
            document.getElementById(`pfav7`).remove();
        });
    }
}

function removeplayerfav8link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep8", {
        axios.post("http://localhost:3001/api/removefavoritep8", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav8name`).remove();
            document.getElementById(`playerfav8team`).remove();
            document.getElementById(`playerfav8pic`).remove();
            document.getElementById(`player8favbutton`).remove();
            document.getElementById(`player8removebutton`).remove();
            document.getElementById(`pfav8`).remove();
        });
    }
}

function removeplayerfav9link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep9", {
        axios.post("http://localhost:3001/api/removefavoritep9", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav9name`).remove();
            document.getElementById(`playerfav9team`).remove();
            document.getElementById(`playerfav9pic`).remove();
            document.getElementById(`player9favbutton`).remove();
            document.getElementById(`player9removebutton`).remove();
            document.getElementById(`pfav9`).remove();
        });
    }
}

function removeplayerfav10link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep10", {
        axios.post("http://localhost:3001/api/removefavoritep10", {
            username: user,
        }).then(function (response) {
            document.getElementById(`playerfav10name`).remove();
            document.getElementById(`playerfav10team`).remove();
            document.getElementById(`playerfav10pic`).remove();
            document.getElementById(`player10favbutton`).remove();
            document.getElementById(`player10removebutton`).remove();
            document.getElementById(`pfav10`).remove();
        });
    }
}

function removeteamfav1link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet1", {
        axios.post("http://localhost:3001/api/removefavoritet1", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav1name`).remove();
            document.getElementById(`teamfav1pic`).remove();
            document.getElementById(`team1favbutton`).remove();
            document.getElementById(`team1removebutton`).remove();
            document.getElementById(`tfav1`).remove();
        });
    }
}

function removeteamfav2link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet2", {
        axios.post("http://localhost:3001/api/removefavoritet2", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav2name`).remove();
            document.getElementById(`teamfav2pic`).remove();
            document.getElementById(`team2favbutton`).remove();
            document.getElementById(`team2removebutton`).remove();
            document.getElementById(`tfav2`).remove();
        });
    }
}

function removeteamfav3link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet3", {
        axios.post("http://localhost:3001/api/removefavoritet3", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav3name`).remove();
            document.getElementById(`teamfav3pic`).remove();
            document.getElementById(`team3favbutton`).remove();
            document.getElementById(`team3removebutton`).remove();
            document.getElementById(`tfav3`).remove();
        });
    }
}

function removeteamfav4link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet4", {
        axios.post("http://localhost:3001/api/removefavoritet4", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav4name`).remove();
            document.getElementById(`teamfav4ic`).remove();
            document.getElementById(`team4favbutton`).remove();
            document.getElementById(`team4removebutton`).remove();
            document.getElementById(`tfav4`).remove();
        });
    }
}

function removeteamfav5link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet5", {
        axios.post("http://localhost:3001/api/removefavoritet5", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav5name`).remove();
            document.getElementById(`teamfav5pic`).remove();
            document.getElementById(`team5favbutton`).remove();
            document.getElementById(`team5removebutton`).remove();
            document.getElementById(`tfav5`).remove();
        });
    }
}

function removeteamfav6link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet6", {
        axios.post("http://localhost:3001/api/removefavoritet6", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav6name`).remove();
            document.getElementById(`teamfav6pic`).remove();
            document.getElementById(`team6favbutton`).remove();
            document.getElementById(`team6removebutton`).remove();
            document.getElementById(`tfav6`).remove();
        });
    }
}

function removeteamfav7link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet7", {
        axios.post("http://localhost:3001/api/removefavoritet7", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav7name`).remove();
            document.getElementById(`teamfav7pic`).remove();
            document.getElementById(`team7favbutton`).remove();
            document.getElementById(`team7removebutton`).remove();
            document.getElementById(`tfav7`).remove();
        });
    }
}

function removeteamfav8link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet8", {
        axios.post("http://localhost:3001/api/removefavoritet8", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav8name`).remove();
            document.getElementById(`teamfav8pic`).remove();
            document.getElementById(`team8favbutton`).remove();
            document.getElementById(`team8removebutton`).remove();
            document.getElementById(`tfav8`).remove();
        });
    }
}

function removeteamfav9link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet9", {
        axios.post("http://localhost:3001/api/removefavoritet9", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav9name`).remove();
            document.getElementById(`teamfav9pic`).remove();
            document.getElementById(`team9favbutton`).remove();
            document.getElementById(`team9removebutton`).remove();
            document.getElementById(`tfav9`).remove();
        });
    }
}

function removeteamfav10link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet10", {
        axios.post("http://localhost:3001/api/removefavoritet10", {
            username: user,
        }).then(function (response) {
            document.getElementById(`teamfav10name`).remove();
            document.getElementById(`teamfav10pic`).remove();
            document.getElementById(`team10favbutton`).remove();
            document.getElementById(`team10removebutton`).remove();
            document.getElementById(`tfav10`).remove();
        });
    }
}

function playerfav1link() {
    switch (playerfavsports[0]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[0]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[0]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[0]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[0]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[0]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[0]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[0]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[0]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[0]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[0]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[0]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav2link() {
    switch (playerfavsports[1]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[1]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[1]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[1]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[1]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[1]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[1]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[1]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[1]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[1]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[1]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[1]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav3link() {
    switch (playerfavsports[2]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[2]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[2]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[2]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[2]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[2]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[2]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[2]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[2]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[2]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[2]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[2]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav4link() {
    switch (playerfavsports[3]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[3]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[3]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[3]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[3]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[3]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[3]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[3]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[3]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[3]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[3]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[3]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav5link() {
    switch (playerfavsports[4]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[4]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[4]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[4]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[4]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[4]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[4]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[4]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[4]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[4]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[4]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[4]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav6link() {
    switch (playerfavsports[5]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[5]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[5]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[5]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[5]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[5]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[5]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[5]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[5]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[5]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[5]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[5]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav7link() {
    switch (playerfavsports[6]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[6]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[6]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[6]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[6]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[6]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[6]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[6]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[6]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[6]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[6]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[6]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav8link() {
    switch (playerfavsports[7]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[7]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[7]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[7]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[7]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[7]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[7]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[7]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[7]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[7]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[7]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[7]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav9link() {
    switch (playerfavsports[8]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[8]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[8]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[8]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[8]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[8]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[8]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[8]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[8]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[8]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[8]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[8]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function playerfav10link() {
    switch (playerfavsports[9]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[9]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[9]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[9]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[9]);
            window.location.href = "nbaplayerstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlplayerID', playerfavids[9]);
            window.localStorage.setItem('nhlplayerFN', playerfavfnames[9]);
            window.localStorage.setItem('nhlplayerTeam', playerfavteamnames[9]);
            window.location.href = "nhlplayerstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflplayerID', playerfavids[9]);
            window.localStorage.setItem('nflplayerFN', playerfavfnames[9]);
            window.localStorage.setItem('nflplayerPos', playerfavlnames[9]);
            window.localStorage.setItem('nflplayerTeam', playerfavteamnames[9]);
            window.location.href = "nflplayerstats.html";
            break;
        default:
    }
}

function teamfav1link() {
    switch (teamfavsports[0]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[0]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[0]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[0]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[0]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[0]);
            window.localStorage.setItem('nflTeamName', teamfavnames[0]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav2link() {
    switch (teamfavsports[1]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[1]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[1]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[1]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[1]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[1]);
            window.localStorage.setItem('nflTeamName', teamfavnames[1]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav3link() {
    switch (teamfavsports[2]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[2]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[2]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[2]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[2]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[2]);
            window.localStorage.setItem('nflTeamName', teamfavnames[2]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav4link() {
    switch (teamfavsports[3]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[3]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[3]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[3]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[3]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[3]);
            window.localStorage.setItem('nflTeamName', teamfavnames[3]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav5link() {
    switch (teamfavsports[4]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[4]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[4]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[4]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[4]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[4]);
            window.localStorage.setItem('nflTeamName', teamfavnames[4]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav6link() {
    switch (teamfavsports[5]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[5]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[5]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[5]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[5]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[5]);
            window.localStorage.setItem('nflTeamName', teamfavnames[5]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav7link() {
    switch (teamfavsports[6]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[6]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[6]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[6]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[6]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[6]);
            window.localStorage.setItem('nflTeamName', teamfavnames[6]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav8link() {
    switch (teamfavsports[7]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[7]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[7]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[7]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[7]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[7]);
            window.localStorage.setItem('nflTeamName', teamfavnames[7]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav9link() {
    switch (teamfavsports[8]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[8]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[8]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[8]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[8]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[8]);
            window.localStorage.setItem('nflTeamName', teamfavnames[8]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

function teamfav10link() {
    switch (teamfavsports[9]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[9]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[9]);
            window.location.href = "nbateamstats.html";
            break;
        case 3:
            window.localStorage.setItem('nhlTeamID', teamfavids[9]);
            window.localStorage.setItem('nhlTeamName', teamfavnames[9]);
            window.location.href = "nhlteamstats.html";
            break;
        case 2:
            window.localStorage.setItem('nflTeamID', teamfavids[9]);
            window.localStorage.setItem('nflTeamName', teamfavnames[9]);
            window.location.href = "nflteamstats.html";
            break;
        default:
    }
}

