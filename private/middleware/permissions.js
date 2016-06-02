(function() {

    'use strict';

    var routes = require("./routes"),
        cookie = require("./cookie");

    module.exports = function(req, res, next) {
        var i;

var url = req.url.split('/')[1];
        if (url == 'api') {
console.log("url: "+req.url);

            // START REGION: API permissions (all)
            for (i = 0; i < routes.api.all.length; i++) {
                console.log("url api: "+routes.api.all[i]);
                if (routes.api.all[i].indexOf(req.url) > -1) {
                    console.log("deu 1   "+routes.api.all[i]);
                    break;
                }
            }
            if (i != routes.api.all.length) {
                next();
            } else {
                // END REGION: API permissions (all)

 cookie.verifySession(req.cookies.session)
                .catch(function (err) {
                    console.log("caralho api:  "+err);
                   return res.sendStatus(403);
                });
                // START REGION: API permissions (logged)
               cookie.verifySession(req.cookies.session)
                    .then(function (cenas) {
                        var permission= cenas.permission;
                        console.log("permission api: "+permission);
                        switch(permission){
                            case "0":
                                for (i = 0; i < routes.api.logged.length; i++) {
                                    if (req.url.indexOf(routes.api.logged[i]) > -1) {
                                        break;
                                    }
                                }
                                if (i == routes.api.logged.length) {
                                    return res.sendStatus(403);
                                } else {
                                    next();
                                }
                            break;
                            case "1":
                                for (i = 0; i < routes.api.advanced.length; i++) {
                                    if (req.url.indexOf(routes.api.advanced[i]) > -1) {
                                        break;
                                    }
                                }
                                if (i == routes.api.advanced.length) {
                                    return res.sendStatus(403);
                                } else {
                                    next();
                                }
                            break;
                            case "2": 
                            console.log("entrou api");
                                for (i = 0; i < routes.api.admin.length; i++) {
                                    if (req.url.indexOf(routes.api.admin[i]) > -1) {
                                        console.log("deu api");
                                        break;
                                    }
                                }
                                if (i == routes.api.admin.length) {
                                    return res.sendStatus(403);
                                } else {
                                    next();
                                }
                            break;
                        };
                        

                        

                    })
                    .catch(function (err) {
                        return res.sendStatus(403);
                    });
          
            }

            // END REGION: API permissions (logged)

        }
        else {
            
            cookie.verifySession(req.cookies.session)
                .catch(function (err) {
                    console.log("caralho view:  "+err);
                    if (res.statusCode == null) {
                        res.redirect('/forbidden');
                    }
                });

             // START REGION: Views permissions (all)

            for (i = 0; i < routes.views.all.length; i++) {
                if (routes.views.all[i].indexOf(url) > -1) {
                    break;
                }
            }
            if (i != routes.views.all.length) {
                next();
            } else {

                // END REGION: Views permissions (all)

                // START REGION: Views permissions (logged)

                cookie.verifySession(req.cookies.session)
                    .then(function (cenas) {
                        var permission= cenas.permission;
                        console.log("permission view: "+permission);
                        switch(permission){
                            case "0":
                                for (i = 0; i < routes.views.logged.length; i++) {
                                    if (url.indexOf(routes.views.logged[i]) > -1) {
                                        break;
                                    }
                                }

                                if (i == routes.views.logged.length) {
                                    if (res.statusCode == null) {
                                        res.redirect('/forbidden');
                                    }
                                } else {
                                    next();
                                }
                            break;
                            case "1":
                                for (i = 0; i < routes.views.advanced.length; i++) {
                                    if (url.indexOf(routes.views.advanced[i]) > -1) {
                                        break;
                                    }
                                }

                                if (i == routes.views.advanced.length) {
                                    if (res.statusCode == null) {
                                        res.redirect('/forbidden');
                                    }
                                } else {
                                    next();
                                }
                            break;
                            case "2":
                            console.log("entrou  "+url);
                                for (i = 0; i < routes.views.admin.length; i++) {
                                    console.log("entrou com "+routes.views.admin[i]);
                                    console.log("-----------------------");
                                    if (url.indexOf(routes.views.admin[i]) > -1) {
                                        console.log("deu");
                                        break;
                                    }
                                }

                                if (i == routes.views.admin.length) {
                                    if (res.statusCode == null) {
                                        res.redirect('/forbidden');
                                    }
                                } else {
                                    next();
                                }
                            break;
                        
                        }
                    })
                    .catch(function(err){
                         res.redirect('/forbidden');
                    });

            }

            // END REGION: Views permissions (logged)

        

        }
}
}());