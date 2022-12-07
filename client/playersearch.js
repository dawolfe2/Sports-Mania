function searchplayers() {

    //clear old values
    document.getElementById("footerspacing").style.padding = "0px 0px 0px 0px";
    playerhtml = ['playername1', 'playername2', 'playername3', 'playername4', 'playername5', 'playername6', 'playername7', 'playername8']
    teamhtml = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8']
    buttonhtml = ['profile1', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6', 'profile7', 'profile8']
    pichtml = ['playerpic1', 'playerpic2', 'playerpic3', 'playerpic4', 'playerpic5', 'playerpic6', 'playerpic7', 'playerpic8']
    stat1html = ['1stat1', '2stat1', '3stat1', '4stat1', '5stat1', '6stat1', '7stat1', '8stat1']
    stat2html = ['1stat2', '2stat2', '3stat2', '4stat2', '5stat2', '6stat2', '7stat2', '8stat2']
    stat3html = ['1stat3', '2stat3', '3stat3', '4stat3', '5stat3', '6stat3', '7stat3', '8stat3']
    stat4html = ['1stat4', '2stat4', '3stat4', '4stat4', '5stat4', '6stat4', '7stat4', '8stat4']
    searchprofileID = [null, null, null, null, null, null, null, null]
    searchprofileFN = [null, null, null, null, null, null, null, null]
    searchprofileLN = [null, null, null, null, null, null, null, null]
    searchprofileTeam = [null, null, null, null, null, null, null, null]
    searchprofilePosition = [null, null, null, null, null, null, null, null]
    document.getElementById('searchresult').innerHTML = ""
    for (let i = 0; i < 8; i++) {
        document.getElementById(playerhtml[i]).style.visibility = "hidden";
        document.getElementById(teamhtml[i]).style.visibility = "hidden";
        document.getElementById(buttonhtml[i]).style.visibility = "hidden";
        document.getElementById(pichtml[i]).style.visibility = "hidden";
        document.getElementById(stat1html[i]).style.visibility = "hidden";
        document.getElementById(stat2html[i]).style.visibility = "hidden";
        document.getElementById(stat3html[i]).style.visibility = "hidden";
        document.getElementById(stat4html[i]).style.visibility = "hidden";
        document.getElementById(`divp${i + 1}`).style.display = "none";
    }

    //get input search box text
    const searchreq = document.getElementById('search').value


    //sport determined by radio button
    nba = document.getElementById('radioNBA').checked
    nfl = document.getElementById('radioNFL').checked
    nhl = document.getElementById('radioNHL').checked

    //API and logic for nba player search
    if (nba) {
        window.localStorage.setItem('playersearchsport', 0);
        //search for players using input name
        const searchplayers = {
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/players',
            //url: 'https://www.balldontlie.io/api/v1/players',
            params: { search: searchreq, per_page: 100 },
            headers: {
                'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }
        };

        axios.request(searchplayers).then(function (response) {

            //get list of players id's using input search
            index = 0
            allPlayersID = []
            allPlayersFN = []
            allPlayersLN = []
            allPlayersTeam = []
            while (response.data.data[index] != null) {
                allPlayersID.push(response.data.data[index].id)
                allPlayersFN.push(response.data.data[index].first_name)
                allPlayersLN.push(response.data.data[index].last_name)
                allPlayersTeam.push(response.data.data[index].team.full_name)
                index = index + 1
            }
            //get 2022 data from all players in allPlayersID
            const searchcurrentplayers = {
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/season_averages',
                params: { player_ids: allPlayersID, season: 2022, per_page: 100 },
            };

            //get ID's of players who have 2022 season data and combine with previous results
            axios.request(searchcurrentplayers).then(function (response) {
                index = 0
                playersID = []
                //avg pts
                stat1 = []
                //reb
                stat2 = []
                //assists
                stat3 = []
                //3pts
                stat4 = []
                playersFullname = [null, null, null, null, null, null, null, null]
                playersTeams = [null, null, null, null, null, null, null, null]
                playersFirstName = [null, null, null, null, null, null, null, null]
                playersLastName = [null, null, null, null, null, null, null, null]
                while (index < 8 && response.data.data[index] != null) {
                    playersID.push(response.data.data[index].player_id)
                    stat1.push(response.data.data[index].pts)
                    stat2.push(response.data.data[index].reb)
                    stat3.push(response.data.data[index].ast)
                    stat4.push((response.data.data[index].fg3_pct * 100).toFixed(2))
                    index = index + 1
                }
                //fill html with player data
                if (playersID.length == 0) {
                    document.getElementById('searchresult').innerHTML = "No Search Results Found"
                }
                for (let i = 0; i < playersID.length; i++) {
                    found = false
                    index = 0
                    while (!found) {
                        if (playersID[i] == allPlayersID[index]) {
                            playersFirstName[i] = allPlayersFN[index]
                            playersLastName[i] = allPlayersLN[index]
                            playersFullname[i] = `${playersFirstName[i]} ${playersLastName[i]}`
                            playersTeams[i] = allPlayersTeam[index]
                            document.getElementById(playerhtml[i]).innerHTML = playersFullname[i]
                            document.getElementById(playerhtml[i]).style.visibility = "visible";
                            document.getElementById(teamhtml[i]).innerHTML = playersTeams[i]
                            document.getElementById(teamhtml[i]).style.visibility = "visible";
                            document.getElementById(buttonhtml[i]).style.visibility = "visible";
                            document.getElementById(pichtml[i]).style.visibility = "visible";
                            document.getElementById(stat1html[i]).innerHTML = stat1[i]
                            document.getElementById(stat1html[i]).style.visibility = "visible";
                            document.getElementById(stat2html[i]).innerHTML = stat2[i]
                            document.getElementById(stat2html[i]).style.visibility = "visible";
                            document.getElementById(stat3html[i]).innerHTML = stat3[i]
                            document.getElementById(stat3html[i]).style.visibility = "visible";
                            document.getElementById(stat4html[i]).innerHTML = stat4[i]
                            document.getElementById(stat4html[i]).style.visibility = "visible";
                            searchprofileID[i] = playersID[i]
                            searchprofileFN[i] = playersFirstName[i]
                            searchprofileLN[i] = playersLastName[i]
                            searchprofileTeam[i] = playersTeams[i]
                            found = true
                            document.getElementById(`divp${i + 1}`).style.display = "block"
                        }
                        index = index + 1
                    }
                }

                //search for player id from nba endpoint
                // const searchpic = {
                //     method: 'GET',
                //     url: 'http://data.nba.net/data/10s/prod/v1/2022/players.json',
                // };

                //search for player id from local endpoint
                const searchpic = {
                    method: 'GET',
                    url: 'JSON/nbaplayers.json',
                };

                axios.request(searchpic).then(function (response) {
                    for (let i = 0; i < playersID.length; i++) {
                        firstname = playersFirstName[i]
                        lastname = playersLastName[i]
                        picid = 0
                        index2 = 0
                        found = false
                        while (!found && (response.data.league.standard[index2] != null)) {
                            //console.log(response.data.league.standard[index].firstName)
                            if (response.data.league.standard[index2].firstName == firstname && response.data.league.standard[index2].lastName == lastname) {
                                picid = response.data.league.standard[index2].personId
                                picurlfull = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${picid}.png`
                                document.getElementById(`playerpic${i + 1}`).src = picurlfull;
                                found = true
                            }
                            index2 = index2 + 1
                        }
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            });
        }).catch(function (error) {
            console.error(error);
        });
    }

    //API and logic for NHL data
    else if (nhl) {
        window.localStorage.setItem('playersearchsport', 2);
        //find team names and id
        nhlteamnames = []
        for (let i = 0; i < 56; i++) {
            nhlteamnames.push(null)
        }
        const nhlteams = {
            method: 'GET',
            url: 'JSON/nhlteams.json',
        };
        axios.request(nhlteams).then(function (response) {
            i = 0
            nhlteamid = 1
            while (i < 32) {
                if (nhlteamid == 11) {
                    nhlteamid = 12
                }
                else if (nhlteamid == 27) {
                    nhlteamid = 28
                }
                else if (nhlteamid == 31) {
                    nhlteamid = 52
                }
                nhlteamnames[nhlteamid] = response.data.teams[i].name
                i = i + 1
                nhlteamid = nhlteamid + 1
            }

            //search for players
            iteamid = 1
            playercount = 0
            statcount = 1
            while (iteamid < 56 && playercount < 8) {
                if (iteamid == 11) {
                    iteamid = 12
                }
                else if (iteamid == 27) {
                    iteamid = 28
                }
                else if (iteamid == 31) {
                    iteamid = 52
                }
                currentid = iteamid
                const playersearch = {
                    method: 'GET',
                    url: `https://statsapi.web.nhl.com/api/v1/teams/${currentid}/roster`,
                };
                axios.request(playersearch).then(function (response) {
                    iteamplayer = 0
                    while (iteamplayer < response.data.roster.length && playercount < 8) {
                        if (playercount < 8 && response.data.roster[iteamplayer].person.fullName.toLowerCase().includes(searchreq.toLowerCase())) {
                            teamid = response.data.link.substring(14, 16);
                            if (teamid.charAt(1) == '/') {
                                teamid = teamid.substring(0, 1);
                            }
                            playername = response.data.roster[iteamplayer].person.fullName
                            document.getElementById(playerhtml[playercount]).innerHTML = playername
                            document.getElementById(playerhtml[playercount]).style.visibility = "visible";
                            document.getElementById(teamhtml[playercount]).innerHTML = nhlteamnames[teamid]
                            document.getElementById(teamhtml[playercount]).style.visibility = "visible";
                            document.getElementById(buttonhtml[playercount]).style.visibility = "visible";
                            document.getElementById(pichtml[playercount]).style.visibility = "visible";
                            document.getElementById(stat1html[playercount]).innerHTML = "N/A"
                            document.getElementById(stat1html[playercount]).style.visibility = "visible";
                            document.getElementById(stat2html[playercount]).innerHTML = "N/A"
                            document.getElementById(stat2html[playercount]).style.visibility = "visible";
                            document.getElementById(stat3html[playercount]).innerHTML = "N/A"
                            document.getElementById(stat3html[playercount]).style.visibility = "visible";
                            document.getElementById(stat4html[playercount]).innerHTML = "N/A"
                            document.getElementById(stat4html[playercount]).style.visibility = "visible";
                            playerid = response.data.roster[iteamplayer].person.id
                            searchprofileID[playercount] = playerid
                            searchprofileFN[playercount] = playername
                            searchprofileTeam[playercount] = nhlteamnames[teamid]
                            document.getElementById(`divp${playercount + 1}`).style.display = "block"
                            playercount = playercount + 1
                            picurl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerid}.jpg`
                            document.getElementById(`playerpic${playercount}`).src = picurl;
                            currentid = iteamid

                            const playersearch = {
                                method: 'GET',
                                url: `https://statsapi.web.nhl.com/api/v1/people/${playerid}?hydrate=stats(splits=statsSingleSeason)`,
                            };
                            axios.request(playersearch).then(function (response) {
                                try {
                                    if (response.data.people[0].stats[0].splits[0].stat.shots != null) {
                                        document.getElementById(stat1html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.games
                                        document.getElementById(`playerposition${statcount}`).innerHTML = response.data.people[0].primaryPosition.type
                                        document.getElementById(stat2html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.shots
                                        document.getElementById(stat3html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.goals
                                        document.getElementById(stat4html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.assists
                                        document.getElementById(`${statcount}stat1label`).innerHTML = "Games:"
                                        document.getElementById(`${statcount}stat2label`).innerHTML = "Shots:"
                                        document.getElementById(`${statcount}stat3label`).innerHTML = "Goals:"
                                        document.getElementById(`${statcount}stat4label`).innerHTML = "Assists:"
                                    }
                                    else {
                                        document.getElementById(stat1html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.games
                                        document.getElementById(`playerposition${statcount}`).innerHTML = response.data.people[0].primaryPosition.type
                                        document.getElementById(stat2html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.shotsAgainst
                                        document.getElementById(stat3html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.saves
                                        document.getElementById(stat4html[statcount - 1]).innerHTML = response.data.people[0].stats[0].splits[0].stat.goalsAgainst
                                        document.getElementById(`${statcount}stat1label`).innerHTML = "Games:"
                                        document.getElementById(`${statcount}stat2label`).innerHTML = "ShotsAgainst:"
                                        document.getElementById(`${statcount}stat3label`).innerHTML = "Saves:"
                                        document.getElementById(`${statcount}stat4label`).innerHTML = "GoalsAgainst:"
                                    }
                                } catch (error) {
                                    console.log("player stats not available")
                                }
                                statcount = statcount + 1
                            }).catch(function (error) {
                                console.error(error);
                            });
                        }
                        iteamplayer = iteamplayer + 1
                    }
                }).catch(function (error) {
                    console.error(error);
                });
                iteamid = iteamid + 1
            }
        }).catch(function (error) {
            console.error(error);
        });

    }



    else if (nfl) {
        window.localStorage.setItem('playersearchsport', 1);
        done = false
        teamlist = []
        //get team list from nfl api
        for (let i = 0; i < 33; i++) {
            teamlist.push(null)
        }
        const searchteams = {
            method: 'GET',
            url: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams',
        };
        axios.request(searchteams).then(function (response) {
            for (let i = 0; i < 32; i++) {
                id = response.data.sports[0].leagues[0].teams[i].team.id
                teamlist[id] = response.data.sports[0].leagues[0].teams[i].team.displayName
            }
        }).catch(function (error) {
            console.error(error);
        });

        //search nfl api for players
        playernamelist = []
        playeridlist = []
        playerteamlist = []
        playerpositionlist = []
        playerjerseylist = []
        playerheightlist = []
        playerweightlist = []
        playeragelist = []
        iteam = 1
        while (iteam < 35 && playernamelist.length < 8) {
            if (iteam == 31) {
                iteam = 33
            }
            const searchplayersnfl = {
                method: 'GET',
                url: `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${iteam}/roster`,
            };
            axios.request(searchplayersnfl).then(function (response) {
                i = 0
                while (i < response.data.athletes[0].items.length && playernamelist.length < 8) {
                    fname = response.data.athletes[0].items[i].firstName
                    lname = response.data.athletes[0].items[i].lastName
                    fullname = `${fname} ${lname}`
                    teamname = response.data.team.displayName
                    teamid = response.data.team.id
                    playerid = response.data.athletes[0].items[i].id
                    playerposition = response.data.athletes[0].items[i].position.name
                    if (fullname.toLowerCase().includes(searchreq.toLowerCase()) && response.data.athletes[0].items[i].status.name == 'Active') {
                        playernamelist.push(fullname)
                        playeridlist.push(playerid)
                        playerteamlist.push(teamname)
                        playerpositionlist.push(playerposition)
                        playerjerseylist.push(response.data.athletes[0].items[i].jersey)
                        playerheightlist.push(response.data.athletes[0].items[i].height)
                        playerweightlist.push(response.data.athletes[0].items[i].weight)
                        playeragelist.push(response.data.athletes[0].items[i].age)

                    }
                    nflcards()
                    i = i + 1
                }
                j = 0
                while (j < response.data.athletes[1].items.length && playernamelist.length < 8) {
                    fname = response.data.athletes[1].items[j].firstName
                    lname = response.data.athletes[1].items[j].lastName
                    fullname = `${fname} ${lname}`
                    teamname = response.data.team.displayName
                    teamid = response.data.team.id
                    playerid = response.data.athletes[1].items[j].id
                    playerposition = response.data.athletes[1].items[j].position.name
                    if (fullname.toLowerCase().includes(searchreq.toLowerCase()) && response.data.athletes[1].items[j].status.name == 'Active') {
                        playernamelist.push(fullname)
                        playeridlist.push(playerid)
                        playerteamlist.push(teamname)
                        playerpositionlist.push(playerposition)
                        playerjerseylist.push(response.data.athletes[1].items[j].jersey)
                        playerheightlist.push(response.data.athletes[1].items[j].height)
                        playerweightlist.push(response.data.athletes[1].items[j].weight)
                        playeragelist.push(response.data.athletes[1].items[j].age)
                        nflcards()
                    }
                    j = j + 1
                }
                k = 0
                while (k < response.data.athletes[2].items.length && playernamelist.length < 8) {
                    fname = response.data.athletes[2].items[k].firstName
                    lname = response.data.athletes[2].items[k].lastName
                    fullname = `${fname} ${lname}`
                    teamname = response.data.team.displayName
                    teamid = response.data.team.id
                    playerid = response.data.athletes[2].items[k].id
                    playerposition = response.data.athletes[2].items[k].position.name
                    if (fullname.toLowerCase().includes(searchreq.toLowerCase()) && response.data.athletes[2].items[k].status.name == 'Active') {
                        playernamelist.push(fullname)
                        playeridlist.push(playerid)
                        playerteamlist.push(teamname)
                        playerpositionlist.push(playerposition)
                        playerjerseylist.push(response.data.athletes[2].items[k].jersey)
                        playerheightlist.push(response.data.athletes[2].items[k].height)
                        playerweightlist.push(response.data.athletes[2].items[k].weight)
                        playeragelist.push(response.data.athletes[2].items[k].age)
                        nflcards()
                    }
                    k = k + 1
                }
            }).catch(function (error) {
                console.error(error);
            });
            iteam = iteam + 1
        }
    }
}

//called function at the end of nfl api search
//places gathered player info into html
function nflcards() {
    playerprofiles = 0
    while (playerprofiles < 8 && playerprofiles < playernamelist.length && !done) {
        document.getElementById(`playerposition${playerprofiles + 1}`).innerHTML = playerpositionlist[playerprofiles]
        document.getElementById(playerhtml[playerprofiles]).innerHTML = playernamelist[playerprofiles]
        document.getElementById(playerhtml[playerprofiles]).style.visibility = "visible";
        document.getElementById(teamhtml[playerprofiles]).innerHTML = playerteamlist[playerprofiles]
        document.getElementById(teamhtml[playerprofiles]).style.visibility = "visible";
        document.getElementById(buttonhtml[playerprofiles]).style.visibility = "visible";
        document.getElementById(pichtml[playerprofiles]).style.visibility = "visible";
        document.getElementById(stat1html[playerprofiles]).innerHTML = "placeholder"
        document.getElementById(stat1html[playerprofiles]).style.visibility = "visible";
        document.getElementById(stat2html[playerprofiles]).innerHTML = "placeholder"
        document.getElementById(stat2html[playerprofiles]).style.visibility = "visible";
        document.getElementById(stat3html[playerprofiles]).innerHTML = "placeholder"
        document.getElementById(stat3html[playerprofiles]).style.visibility = "visible";
        document.getElementById(stat4html[playerprofiles]).innerHTML = "placeholder"
        document.getElementById(stat4html[playerprofiles]).style.visibility = "visible";
        document.getElementById(`divp${playerprofiles + 1}`).style.display = "block"
        document.getElementById(`${playerprofiles + 1}stat1label`).innerHTML = "Jersey:"
        document.getElementById(`${playerprofiles + 1}stat2label`).innerHTML = "Height:"
        document.getElementById(`${playerprofiles + 1}stat3label`).innerHTML = "Weight:"
        document.getElementById(`${playerprofiles + 1}stat4label`).innerHTML = "Age:"
        document.getElementById(stat1html[playerprofiles]).innerHTML = playerjerseylist[playerprofiles]
        document.getElementById(stat2html[playerprofiles]).innerHTML = `${playerheightlist[playerprofiles]} inches`
        document.getElementById(stat3html[playerprofiles]).innerHTML = `${playerweightlist[playerprofiles]}lbs`
        document.getElementById(stat4html[playerprofiles]).innerHTML = playeragelist[playerprofiles]
        searchprofileID[playerprofiles] = playeridlist[playerprofiles]
        searchprofileFN[playerprofiles] = playernamelist[playerprofiles]
        searchprofileTeam[playerprofiles] = playerteamlist[playerprofiles]
        searchprofilePosition[playerprofiles] = playerpositionlist[playerprofiles]
        // document.getElementById(`playerpic${playerprofiles + 1}`).src = "pics/no-image.jpg"
        picurl = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${playeridlist[playerprofiles]}.png&w=350&h=254`
        document.getElementById(`playerpic${playerprofiles + 1}`).src = picurl
        if (playerprofiles == 7) {
            done = true
        }
        playerprofiles = playerprofiles + 1
    }
}

async function profile1() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[0]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[0]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[0]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[0]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[0]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[0]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[0]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[0]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[0]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[0]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[0]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile2() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[1]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[1]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[1]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[1]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[1]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[1]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[1]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[1]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[1]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[1]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[1]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile3() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[2]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[2]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[2]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[2]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[2]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[2]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[2]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[2]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[2]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[2]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[2]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile4() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[3]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[3]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[3]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[3]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[3]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[3]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[3]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[3]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[3]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[3]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[3]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile5() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[4]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[4]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[4]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[4]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[4]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[4]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[4]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[4]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[4]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[4]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[4]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile6() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[5]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[5]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[5]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[5]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[5]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[5]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[5]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[5]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[5]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[5]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[5]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile7() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[6]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[6]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[6]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[6]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[6]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[6]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[6]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[6]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[6]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[6]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[6]);
        window.location.href = "nflplayerstats.html";
    }
}

async function profile8() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[7]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[7]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[7]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[7]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[7]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[7]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[7]);
        window.location.href = "nhlplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 1) {
        window.localStorage.setItem('nflplayerID', searchprofileID[7]);
        window.localStorage.setItem('nflplayerTeam', searchprofileTeam[7]);
        window.localStorage.setItem('nflplayerFN', searchprofileFN[7]);
        window.localStorage.setItem('nflplayerPos', searchprofilePosition[7]);
        window.location.href = "nflplayerstats.html";
    }
}