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

    //get localstorage data for player, team, and ID
    playerid = [window.localStorage.getItem('nbaplayerID')]
    playerfirst = [window.localStorage.getItem('nbaplayerFN')]
    playerlast = [window.localStorage.getItem('nbaplayerLN')]
    playername = `${playerfirst} ${playerlast}`
    playerteam = window.localStorage.getItem('nbaplayerTeam')
    document.getElementById('teamname').innerHTML = playerteam
    document.getElementById('playername').innerHTML = playername

    //find player image
    // const searchpic = {
    //     method: 'GET',
    //     url: 'http://data.nba.net/data/10s/prod/v1/2022/players.json',
    // };

    const searchpic = {
        method: 'GET',
        url: 'JSON/nbaplayers.json',
    };

    axios.request(searchpic).then(function (response) {
        firstname = playerfirst
        lastname = playerlast
        picid = 0
        i = 0
        found = false
        while (!found && (response.data.league.standard[i] != null)) {
            //console.log(response.data.league.standard[index].firstName)
            if (response.data.league.standard[i].firstName == firstname && response.data.league.standard[i].lastName == lastname) {
                picid = response.data.league.standard[i].personId
                picurlfull = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${picid}.png`
                document.getElementById('playerpic').src = picurlfull;
                found = true
            }
            i = i + 1
        }
    }).catch(function (error) {
        console.error(error);
    });


    //find player stats
    const season = 2022
    //const searchreq = document.getElementById('searchstat').value
    const getseasonaverage = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/season_averages',
        params: { season: season, player_ids: playerid },
    };

    //array of season stats
    gp = [null]
    pts = [null]
    min = [null]
    fg = [null]
    p3 = [null]
    ft = [null]
    reb = [null]
    ast = [null]
    blk = [null]
    stl = [null]
    pf = [null]
    to = [null]

    //2d array of season stats and season year
    yPoints = []
    yMIN = []
    yFG = []
    yP3 = []
    yFT = []
    yReb = []
    yAST = []
    yBLK = []
    ySTL = []
    yPF = []
    yTO = []
    xseasons = []

    axios.request(getseasonaverage).then(function (response) {
        if (response.data.data.length != 0) {
            //console.log(response)
            gp[0] = response.data.data[0].games_played
            pts[0] = response.data.data[0].pts
            min[0] = response.data.data[0].min.replace(/:/g, ".");
            fg[0] = (response.data.data[0].fg_pct * 100).toFixed(2)
            p3[0] = (response.data.data[0].fg3_pct * 100).toFixed(2)
            ft[0] = (response.data.data[0].ft_pct * 100).toFixed(2)
            reb[0] = response.data.data[0].reb
            ast[0] = response.data.data[0].ast
            blk[0] = response.data.data[0].blk
            stl[0] = response.data.data[0].stl
            pf[0] = response.data.data[0].pf
            to[0] = response.data.data[0].turnover

            yPoints.push(pts[0])
            yMIN.push(min[0])
            yFG.push(fg[0])
            yP3.push(p3[0])
            yFT.push(ft[0])
            yReb.push(reb[0])
            yAST.push(ast[0])
            yBLK.push(blk[0])
            ySTL.push(stl[0])
            yPF.push(pf[0])
            yTO.push(to[0])
            xseasons.push(season)

            document.getElementById('playerstatGP').innerHTML = `Games Played: ${gp[0]}`
            document.getElementById('playerstatPTS').innerHTML = `PTS: ${pts[0]}`
            document.getElementById('playerstatMIN').innerHTML = `MIN: ${min[0]}`
            document.getElementById('playerstatFG').innerHTML = `FG%: ${fg[0]}`
            document.getElementById('playerstat3P').innerHTML = `3PT%: ${p3[0]}`
            document.getElementById('playerstatFT').innerHTML = `FT: ${ft[0]}`
            document.getElementById('playerstatREB').innerHTML = `REB: ${reb[0]}`
            document.getElementById('playerstatAST').innerHTML = `AST: ${ast[0]}`
            document.getElementById('playerstatBLK').innerHTML = `BLK: ${blk[0]}`
            document.getElementById('playerstatSTL').innerHTML = `STL: ${stl[0]}`
            document.getElementById('playerstatPF').innerHTML = `PF: ${pf[0]}`
            document.getElementById('playerstatTO').innerHTML = `TO: ${to[0]}`
        }
        else {
            document.getElementById('playerstatGP').innerHTML = "Stats not available"
            document.getElementById('playerstatPTS').innerHTML = ""
            document.getElementById('playerstatMIN').innerHTML = ""
            document.getElementById('playerstatFG').innerHTML = ""
            document.getElementById('playerstat3P').innerHTML = ""
            document.getElementById('playerstatFT').innerHTML = ""
            document.getElementById('playerstatREB').innerHTML = ""
            document.getElementById('playerstatAST').innerHTML = ""
            document.getElementById('playerstatBLK').innerHTML = ""
            document.getElementById('playerstatSTL').innerHTML = ""
            document.getElementById('playerstatPF').innerHTML = ""
            document.getElementById('playerstatTO').innerHTML = ""

        }
        seasons = [2021, 2020, 2019, 2018, 2017]
        index = 0
        end = 0
        while (index < seasons.length) {
            index = index + 1
            const getseasonaverage = {
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/season_averages',
                params: { season: seasons[index - 1], player_ids: playerid },
            };
            axios.request(getseasonaverage).then(function (response) {
                if (response.data.data.length != 0) {

                    iseason = seasons[end]
                    ipoints = response.data.data[0].pts
                    imin = response.data.data[0].min.replace(/:/g, ".");
                    ifg = (response.data.data[0].fg_pct * 100).toFixed(2)
                    ip3 = (response.data.data[0].fg3_pct * 100).toFixed(2)
                    ift = (response.data.data[0].ft_pct * 100).toFixed(2)
                    ireb = response.data.data[0].reb
                    iast = response.data.data[0].ast
                    iblk = response.data.data[0].blk
                    istl = response.data.data[0].stl
                    ipf = response.data.data[0].pf
                    ito = response.data.data[0].turnover

                    yPoints.unshift(ipoints)
                    yMIN.unshift(imin)
                    yFG.unshift(ifg)
                    yP3.unshift(ip3)
                    yFT.unshift(ift)
                    yReb.unshift(ireb)
                    yAST.unshift(iast)
                    yBLK.unshift(iblk)
                    ySTL.unshift(istl)
                    yPF.unshift(ipf)
                    yTO.unshift(ito)
                    xseasons.unshift(iseason)
                }
                seasoni = seasons[end]
                end = end + 1
                if (end == seasons.length) {
                    new Chart("ChartPTS", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average Points per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yPoints
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
                            labels: xseasons,
                            datasets: [{
                                label: 'Average MIN per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yMIN
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartFG", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average FG% per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yFG
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("Chart3P", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average 3P% per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yP3
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartFT", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average FT% per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yFT
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartREB", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average REB per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yReb
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartAST", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average AST per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yAST
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartBLK", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average BLK per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yBLK
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartSTL", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average STL per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: ySTL
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartPF", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average PF per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yPF
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                    new Chart("ChartTO", {
                        type: "line",
                        data: {
                            labels: xseasons,
                            datasets: [{
                                label: 'Average TO per Season',
                                pointRadius: 4,
                                pointBackgroundColor: "rgba(0,0,255,1)",
                                data: yTO
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                            }
                        }
                    });
                }

            }).catch(function (error) {
                console.error(error);
            });
        }
    }).catch(function (error) {
        console.error(error);
    });
}

async function favorite() {
    username = window.localStorage.getItem('user');
    if (username != "") {
        fav = `1${playerid}#${playerfirst}#${playerlast}#${playerteam}`
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