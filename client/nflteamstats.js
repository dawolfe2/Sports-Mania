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

    //window.localStorage.setItem('nflTeamID', 0);
    //window.localStorage.setItem('nflTeamName', 'Detroit Lions');
    //window.localStorage.setItem('nflTeamNameShort', 'Lions');
    const teamID = window.localStorage.getItem('nflTeamID');
    const teamname = window.localStorage.getItem('nflTeamName');
    document.getElementById('teamname').innerHTML = teamname

    const winsearch = {
        method: 'GET',
        url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/2022',
        headers: {
            'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
            'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
        }
    };

    axios.request(winsearch).then(function (response) {
        wins = response.data._embedded.teamWinStatsList[teamID].wins
        losses = response.data._embedded.teamWinStatsList[teamID].losses
        gamesplayed = wins + losses
        winperc = ((wins * 1.0 / (wins * 1.0 + losses * 1.0)) * 100).toFixed(2)

        document.getElementById('gamesplayed').innerHTML = `Games Played: ${gamesplayed}`
        document.getElementById('gameswon').innerHTML = `Won: ${wins}`
        document.getElementById('gameslost').innerHTML = `Lost: ${losses}`
        document.getElementById('winrate').innerHTML = document.getElementById('winrate').innerHTML = `Winrate: ${winperc}%`

        const receivingsearch = {
            method: 'GET',
            url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2022',
            headers: {
                'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
            }
        };

        axios.request(receivingsearch).then(function (response) {
            index = 0
            while (index < 32) {
                if (teamname.includes(response.data._embedded.teamReceivingStatsList[index].name)) {
                    receives = response.data._embedded.teamReceivingStatsList[index].receives
                    touchdowns = response.data._embedded.teamReceivingStatsList[index].touchdowns
                    yards = response.data._embedded.teamReceivingStatsList[index].yards
                    document.getElementById('receivesRec').innerHTML = `Receives: ${receives}`
                    document.getElementById('touchdownsRec').innerHTML = `Touchdowns: ${touchdowns}`
                    document.getElementById('yardsRec').innerHTML = `Yards: ${yards}`
                    index = 100
                }
                index = index + 1
            }

            const rushingsearch = {
                method: 'GET',
                url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/rushing-stats/offense/2022',
                headers: {
                    'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                    'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
                }
            };

            axios.request(rushingsearch).then(function (response) {
                index = 0
                while (index < 32) {
                    if (teamname.includes(response.data._embedded.teamRushingStatsList[index].name)) {
                        touchdowns = response.data._embedded.teamRushingStatsList[index].touchdowns
                        yards = response.data._embedded.teamRushingStatsList[index].yards
                        document.getElementById('touchdownsRush').innerHTML = `Touchdowns: ${touchdowns}`
                        document.getElementById('yardsRush').innerHTML = `Yards: ${yards}`
                        index = 100
                    }
                    index = index + 1
                }

                const passingsearch = {
                    method: 'GET',
                    url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/passing-stats/offense/2022',
                    headers: {
                        'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                        'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
                    }
                };

                axios.request(passingsearch).then(function (response) {
                    index = 0
                    while (index < 32) {
                        if (teamname.includes(response.data._embedded.teamPassingStatsList[index].name)) {
                            completions = response.data._embedded.teamPassingStatsList[index].completions
                            touchdowns = response.data._embedded.teamPassingStatsList[index].touchdowns
                            yards = response.data._embedded.teamPassingStatsList[index].passYards
                            document.getElementById('completions').innerHTML = `Completions: ${completions}`
                            document.getElementById('touchdownsPass').innerHTML = `Touchdowns: ${touchdowns}`
                            document.getElementById('yardsPass').innerHTML = `Yards: ${yards}`
                            index = 100
                        }
                        index = index + 1
                    }

                }).catch(function (error) {
                    console.error(error);
                });

            }).catch(function (error) {
                console.error(error);
            });

        }).catch(function (error) {
            console.error(error);
        });

    }).catch(function (error) {
        console.error(error);
    });

}