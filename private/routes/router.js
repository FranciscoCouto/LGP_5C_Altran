(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils'),
         cookie = require('../middleware/cookie'),
         crypto = require('crypto'),
         StreamSearch = require('streamsearch'),
         inspect = require('util').inspect,
         validator = require("email-validator"),
         formidable = require('formidable'),
         fs = require('fs');
    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function (server) {

        //<!------------------------------------------------------------------ RENDERS ---------------------------------------------------------------------------------------------------->

        server.get('/', function (req, res) {
            res.render('index');
        });

        server.get('/home', function (req, res) {
            res.render('index');
        });

        server.get('/user_management', function (req, res) {
            res.render('index');
        });

        server.get('/create_project', function (req, res) {
            res.render('index');
        });

        server.get('/users', function (req, res) {
            res.render('index');
        });

        server.get('/listll', function (req, res) {
            res.render('index');
        });

        server.get('/mylistll', function (req, res) {
            res.render('index');
        });

        server.get('/create_ll', function (req, res) {
            res.render('index');
        });

        server.get('/settings', function (req, res) {
            res.render('index');
        });
        server.get('/statistics', function (req, res) {
            res.render('index');
        });

		server.get('/view_ll/:id/', function (req, res) {
			res.render('index');
		});

        server.get('/edit_ll/:id/', function (req, res) {
            res.render('index');
        });

        server.get('/list_audit/:id/', function (req, res) {
            res.render('index');
        });

        server.get('/view_audit/:id/', function (req, res) {
            res.render('index');
        });

        server.get('/list_projects', function (req, res) {
            res.render('index');
        });


        // Route to send forbidden view
        server.get('/forbidden', function (req, res) {
            res.render('index');
        });


        // <!------------------------------------------------------------------ USERS ---------------------------------------------------------------------------------------------------->

        server.get('/api/users', function (req, res) {

            database.getUser()
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve users information');
                });

        });

        server.get('/api/managers', function (req, res) {

            database.getManagers()
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve Managers information');
                });

        });

        server.get("/api/user",function(req,res){

            var iduser = req.headers.iduser;

            database.getUserByID(iduser)
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve users information');
                });

        });

        server.post('/api/login', function (req, res) {
            var user = {
                email: req.body.email.toLowerCase(),
                password: req.body.password
            };
            console.log(user.password);
            database.confirmLoginByEmail(user)
                .then(function (user) {
                    console.log(user.token);
                    utils.encode(user.token)
                        .then(function (encoded) {
                            res.status(200).json(encoded);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });

                })

                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "Username or password invalid."
                    });

                });

        });

        server.get('/api/verifysession', function (req, res){
             if (req.cookies.session) {
                cookie.verifySession(req.cookies.session)
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not verify session');
                    });
            } else {
                res.status(404).send('Could not verify session');
            }
        });
        
        server.post('/api/createuser', function (req, res) {
            
    var form = new formidable.IncomingForm();
     //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./private/img";       //set upload directory
    form.encoding = 'utf-8';
    form.keepExtensions = false;     //keep file extension
   form.parse(req, function(err, fields, files) {
       if(err){
           fs.unlink(fields.image.path);
            res.status(400).json({
                    message_class: 'error',
                    message: 'Error uploading image.'
                });
       }
        var email,pass,name,permission;
        email=fields.email.toLowerCase();
        pass=fields.password;
        name=fields.name;
        permission=fields.permission;
        fs.rename(files.image.path, './private/img/'+email+".jpg", function(err) {
        if (err){
            fs.unlink(fields.image.path);
             res.status(406).json({
                                message_class: 'error',
                                message: "Could not rename image"
                            });
        }
        });
        
            if(permission!="1" && permission!="2" && permission!="0"){
                fs.unlink('./private/img/'+email+".jpg");
                // Check if permission is valid.
                res.status(400).json({
                    message_class: 'error',
                    message: 'Permission not valid.'
                });
            }

            if(!validator.validate(email)){
                // Check if email is valid.
                fs.unlink('./private/img/'+email+".jpg");
                res.status(400).json({
                    message_class: 'error',
                    message: 'Email not valid.'
                });
            }

            else{
            database.insertUser(email, pass, name, permission)
                .then(function (user_id) {
                    res.sendStatus(200);
                })
                .catch(function (err) {

                        // If the e-mail is already in use
                        if (err.sqlState == '23000') {
                            fs.unlink('./private/img/'+email+".jpg");
                            // Send the Response with message error
                            res.status(406).json({
                                message_class: 'error',
                                message: "Email already in use."
                            });

                        } else {
                            fs.unlink('./private/img/'+email+".jpg");
                            // Sending the error to the log file
                            console.log('@authRouter.js: Error inserting user to database');
                            console.log(err);

                        }
                    });
            }
            });
        });

        server.delete("/api/deleteuser",function(req,res){

            var email = req.body.email.toLowerCase();

            console.log(email);

            database.deleteUserByEmail(email)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "No such user with that email."
                    });

                });
        });

        server.delete("/api/deleteuser",function(req,res){

            var iduser = req.body.iduser;

            console.log(iduser);

            database.deleteUserByID(iduser)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "No such user with that id."
                    });

                });
        });

        server.put("/api/updateuseremail",function(req,res){

            //user to be edited
            var user = {
                id: req.body.idusers,
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                permission: req.body.permissionid
            };

            //admin making the edition
            var admin = {
                pass: req.body.confirmpass,
                email: req.body.adminemail
            }

            database.checkPasswordbyEmail(admin.email, admin.pass)
                .then(function(){
                    database.updateUserByID(user.id,user.email, user.name, user.permission)
                        .then(function() {
                            res.status(200).send("ok");
                        })
                        .catch(function (err) {
                            res.status(406).json({
                                message_class: 'error',
                                message: "No such user with that ID."
                            });

                        });
                })
                .catch(function (err) {
                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "Wrong Admin Password."
                    });

                });
        });

        server.put('/api/updateuserpass', function (req, res) {
            //user to be edited
            var user = {
                id: req.body.idusers,
                password: req.body.password,
                password_again: req.body.passwordagain
            };

            //admin making the edition
            var admin = {
                pass: req.body.confirmpass,
                email: req.body.adminemail
            }

            console.log("update user pass " + admin.pass + admin.email);
            if(user.password == user.password_again && user.password.length > 0) {
                database.checkPasswordbyEmail(admin.email, admin.pass)
                .then(function(){

                    database.updateUserPass(user.id,user.password)
                        .then(function() {
                            res.status(200).send("ok");
                        })
                        .catch(function (err) {
                            res.status(406).json({
                                message_class: 'error',
                                message: "Couldn't update user password."
                            });

                        });
                 })
                 .catch(function (err) {
                    res.status(406).json({
                        message_class: 'error',
                        message: "Wrong Admin Password."
                    });

                });

            }
            else {
                res.status(406).json({
                    message_class: 'error',
                    message: "Passwords don't match."
                });
            }
        });

         //<!------------------------------------------------------------------ LESSONS ---------------------------------------------------------------------------------------------------->

        server.get('/api/lessonsTop', function (req, res) {
                console.log('QQ');
                database.getTop()
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Oops');
                    });
        });
         server.get('/api/lessons', function (req, res) {

                database.getLessons()
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve LL information');
                    });
        });

        server.get('/api/searchlessons', function (req, res) {

                var keyword = req.params.keyword;

                database.getLessonByKeyword(keyword)
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Search by keyword ' + keyword + ' returned nothing.');
                    });
        });

        server.get('/api/lessonsByStatus', function (req, res) {

               // var status = req.params.status;
               var status = req.query.status;
                console.log(req.query.status);
                database.getLessonByStatus(status)
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve LLs with that state.');
                    });
        });

         server.get("/api/lesson",function(req,res){

             var lesson_id = req.headers.referer.split("/")[4];
             database.getLessonByID(lesson_id)
               .then(function (lesson) {
                    res.status(200).send(lesson);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve LL information with that id.');
                });
        });

         server.delete("/api/deletelesson",function(req,res){

             var idlesson = req.body.idlesson;

             console.log(idlesson);

             database.deleteLessonByID(idlesson)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "No such lesson with that id."
                    });

                });
         });

         server.put('/api/updatelessonfield', function (req, res) {

             var businessSector = req.body.businessSector.toLowerCase();
             var idLesson = req.body.idlesson;

                database.updateLessonFieldByID(businessSector,idLesson)
                    .then(function() {

                        res.status(200);
                    })
                    .catch(function (err) {

                        console.log(err);
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });

         });

         server.put("/api/updatelessontext",function(req,res){

                 var datetime = new Date();
                 var situation = req.body.situation;
                 var action = req.body.action;
                 var result = req.body.result;
                 var technologies = req.body.technologies;
                 var idLesson = req.body.idlesson;

                 database.updateLessonTextByID(action, situation, result, idLesson, technologies)
                    .then(function() {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        console.log(err);
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });

         });

         server.post("/api/createlesson",function(req,res){

                var dateCreated = new Date();
                var maker = req.body.maker;
                var project = req.body.project;
                var status = req.body.status;

                var datetime = new Date();
                var situation = req.body.situation;
                var action = req.body.actionTaken;
                var result = req.body.result;

                var technologies = req.body.technologies;

                technologies.forEach(function(tech) {
                    console.log(tech);
                })
                database.insertLesson(dateCreated,maker,project,datetime,situation,action,result,technologies, status)
                    .then(function (lesson) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // TODO Sending the error to the log file
                        console.log('Error inserting lesson to database');
                        console.log(err);

                    });
         });

         server.put("/api/updatelessonstate", function(req, res){
             var state = req.body.state.toLowerCase();
             var idLesson = req.body.idlesson;

              if(state == 'draft' || state == 'submitted' || state == 'approved' || state == 'inactive'){
                database.updateLessonStateByID(idLesson,state)
                    .then(function() {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });

             }
             else{
                res.status(406).json({
                            message_class: 'error',
                            message: "Incorrect state! Choose one of the following: draft|submitted|approved|inactive."
                });
             }
        });

        server.put("/api/updatelessonfeedback", function(req, res){
             var feedback = req.body.feedback;
             var idLesson = req.body.idlesson;

                database.updateLessonFeedbackByID(idLesson,feedback)
                    .then(function() {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });
        });

        //<!------------------------------------------------------------------ PROJECT ---------------------------------------------------------------------------------------------------->

        server.get('/api/projects', function (req, res) {

                database.getProjects()
                   .then(function (projects) {
                        res.status(200).send(projects);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve projects information');
                    });
        });

        server.get("/api/checklessonmanager",function(req,res){

             var managerid = req.headers.managerid;
             var lessonid = req.headers.referer.split("/")[4];
             database.checkLessonManager(managerid,lessonid)
               .then(function (ll) {
                    res.status(200).send(ll);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve lesson information with that manager id.');
                });
        });

        server.get("/api/projectsbymanager",function(req,res){

             var managerid = req.headers.managerid;
             database.getProjectsByManagerID(managerid)
               .then(function (projs) {
                    res.status(200).send(projs);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve projects information with that manager id.');
                });
        });

        server.post("/api/createproject",function(req,res){

                var type = req.body.type;
                var name = req.body.name;
                var manager = req.body.manager;
                var client = req.body.client;

                var dateBeginning = req.body.dateBeginning;
                var dateEndExpected = req.body.dateEndExpected;
                var dateEnd = req.body.dateEnd;

                var sector = req.body.sector;

                var deliveringModel = req.body.deliveringModel;
                var numberConsultants = req.body.numberConsultants;
                var daysDuration = req.body.daysDuration;

                database.insertProject(type,name,manager,dateBeginning,dateEndExpected,dateEnd,deliveringModel,numberConsultants,daysDuration,client,sector)
                    .then(function (project) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        console.log('Error inserting project to database');
                        console.log(err);

                    });
         });

        server.put("/api/updatedateProject",function(req,res){

                 var date = req.body.date;

                 var idproject = req.body.idproject;

                 database.updateProjectDateByID(idproject,date)
                    .then(function() {

                        res.status(200);
                    })
                    .catch(function (err) {

                        console.log(err);
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such project with that id."
                        });

                    });

         });

        //<!------------------------------------------------------------------ Technologies ---------------------------------------------------------------------------------------------------->


        server.get('/api/technologies', function (req, res) {

                database.getTechnologies()
                   .then(function (techs) {
                        res.status(200).send(techs);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve technologies information');
                    });
        });

         server.post("/api/technologies",function(req,res){

                var technology = req.body.technology;

                database.addTechnology(technology)
                    .then(function () {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        console.log('Error inserting technology to database');
                        console.log(err);

                    });
         });

         //<!------------------------------------------------------------------ Project Types ---------------------------------------------------------------------------------------------------->


        server.get('/api/projecttypes', function (req, res) {
                database.getProjectTypes()
                   .then(function (types) {
                        res.status(200).send(types);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve project types information');
                    });
        });

         server.post("/api/projecttypes",function(req,res){
                var type = req.body.projecttype;

                database.addProjectType(type)
                    .then(function (project) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        console.log('Error inserting project type to database');
                        console.log(err);

                    });
         });


         //<!------------------------------------------------------------------ Business Sectors ---------------------------------------------------------------------------------------------------->


        server.get('/api/sectors', function (req, res) {

                database.getSectors()
                   .then(function (sectors) {
                        res.status(200).send(sectors);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve business sectors information');
                    });
        });

         server.post("/api/sectors",function(req,res){

                var sector = req.body.sector;

                database.addSector(sector)
                    .then(function (sector) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        console.log('Error inserting business sector to database');
                        console.log(err);

                    });
         });



         //<!------------------------------------------------------------------ Business Sectors ---------------------------------------------------------------------------------------------------->

          server.get("/api/audit",function(req,res){

             var lesson_id = req.headers.referer.split("/")[4];
             database.getAuditByLesson(lesson_id)
               .then(function (audit) {
                   console.log("qqqqqqqqq");
                    res.status(200).send(audit);
                })
                .catch(function (err) {
                    console.log("qqqqqqqqwwwwwwwwwwwwwwwwq");
                    res.status(406).send('Could not retrieve Audit information for that lesson.');
                });
        });

    };
} ());
