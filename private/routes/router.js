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
                    res.status(406).send('ERRORUSERINFORMATION');
                });

        });

        server.get('/api/managers', function (req, res) {

            database.getManagers()
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORMANAGERINFORMATION');
                });

        });

        server.get("/api/user",function(req,res){

            var iduser = req.headers.iduser;

            database.getUserByID(iduser)
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORUSERINFORMATION');
                });

        });

        server.post('/api/login', function (req, res) {
            var user = {
                email: req.body.email.toLowerCase(),
                password: req.body.password
            };
            database.confirmLoginByEmail(user)
                .then(function (user) {
                    utils.encode(user.token)
                        .then(function (encoded) {
                            user.token=encoded;
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                           res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN1"
                    });
                        });

                })

                .catch(function (err) {

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN"
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
                        res.status(406).send('ERRORSESSION');
                    });
            } else {
                res.status(404).send('ERRORSESSION');
            }
        });

        server.post('/api/createuser', function (req, res) {

    var form = new formidable.IncomingForm();
     //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./public/images";       //set upload directory
    form.encoding = 'utf-8';
    form.keepExtensions = false;     //keep file extension
   form.parse(req, function(err, fields, files) {
       if(err){
           fs.unlink(fields.image.path);
            res.status(400).json({
                    message_class: 'error',
                    message: 'ERRORCREATEIMAGE'
                });
       }
        var email,pass,name,permission;
        email=fields.email.toLowerCase();
        pass=fields.password;
        name=fields.name;
        permission=fields.permission;
        fs.rename(files.image.path, './public/images/'+email+".jpg", function(err) {
        if (err){
            fs.unlink(fields.image.path);
             res.status(406).json({
                                message_class: 'error',
                                message: "ERRORRENAMEIMAGE"
                            });
        }
        });

            if(permission!="1" && permission!="2" && permission!="0"){
                fs.unlink('./public/images/'+email+".jpg");
                // Check if permission is valid.
                res.status(400).json({
                    message_class: 'error',
                    message: 'ERRORCREATEPERMISSION'
                });
            }

            if(!validator.validate(email)){
                // Check if email is valid.
                fs.unlink('./public/images/'+email+".jpg");
                res.status(400).json({
                    message_class: 'error',
                    message: 'ERRORCREATEEMAIL'
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
                            fs.unlink('./public/images/'+email+".jpg");
                            // Send the Response with message error
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORCREATEUSER"
                            });

                        } else {
                            fs.unlink('./public/images/'+email+".jpg");
                            // Sending the error to the log file
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORCREATINGUSERDB"
                            });

                        }
                    });
            }
            });
        });

        server.delete("/api/deleteuser",function(req,res){

            var email = req.body.email.toLowerCase();

            database.deleteUserByEmail(email)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {


                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORDELETEUSER"
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
                            res.status(200);
                        })
                        .catch(function (err) {
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORUPDATEUSEREMAIL"
                            });

                        });
                })
                .catch(function (err) {
                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORUPDATEUSEREMAILPASS"
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

            if(user.password == user.password_again && user.password.length > 0) {
                database.checkPasswordbyEmail(admin.email, admin.pass)
                .then(function(){

                    database.updateUserPass(user.id,user.password)
                        .then(function() {
                            res.sendStatus(200);
                        })
                        .catch(function (err) {
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORUPDATEPASS"
                            });

                        });
                 })
                 .catch(function (err) {
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORADMINPASS"
                    });

                });

            }
            else {
                res.status(406).json({
                    message_class: 'error',
                    message: "ERRORMATCHPASS"
                });
            }
        });

         //<!------------------------------------------------------------------ LESSONS ---------------------------------------------------------------------------------------------------->

        server.get('/api/lessonsTop', function (req, res) {
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
                        res.status(406).send('ERRORLESSONSTOP');
                    });
        });

        server.get('/api/searchlessons', function (req, res) {

                var keyword = req.params.keyword;

                database.getLessonByKeyword(keyword)
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('ERRORSEARCHLL');
                    });
        });

        server.get('/api/lessonsByStatus', function (req, res) {

               // var status = req.params.status;
               var status = req.query.status;
                database.getLessonByStatus(status)
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('ERRORLLBYSTATUS');
                    });
        });

         server.get("/api/lesson",function(req,res){

             var lesson_id = req.headers.referer.split("/")[4];
             database.getLessonByID(lesson_id)
               .then(function (lesson) {
                    res.status(200).send(lesson);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORLESSONID');
                });
        });

         server.delete("/api/deletelesson",function(req,res){

             var idlesson = req.body.idlesson;


             database.deleteLessonByID(idlesson)
                .then(function() {

                    res.sendStatus(200);

                })
                .catch(function (err) {


                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLESSONID"
                    });

                });
         });

         server.put('/api/updatelessonfield', function (req, res) {

             var businessSector = req.body.businessSector.toLowerCase();
             var idLesson = req.body.idlesson;

                database.updateLessonFieldByID(businessSector,idLesson)
                    .then(function() {

                        res.sendStatus(200);
                    })
                    .catch(function (err) {

                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "ERRORLESSONID"
                        });

                    });

         });

         server.put("/api/updatelessontext",function(req,res){

                 var datetime = new Date();
                 var situation = req.body.situation;
                 var action = req.body.action;
                 var result = req.body.result;
                 var manager = req.body.manager;
                 var idLesson = req.body.idlesson;

                 database.updateLessonTextByID(action, situation, result, idLesson, manager)
                    .then(function() {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "ERRORLESSONID"
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

                database.insertLesson(dateCreated,maker,project,datetime,situation,action,result,technologies, status)
                    .then(function (lesson) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "ERRORINSERTINGLL"
                        });

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
                            message: "ERRORLESSONID"
                        });

                    });

             }
             else{
                res.status(406).json({
                            message_class: 'error',
                            message: "ERRORUPDATINGLESSONSTATE"
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
                            message: "ERRORLESSONID"
                        });

                    });
        });

         server.get("/api/lessonsbymanager",function(req,res){

             var managerid = req.headers.managerid;
             database.getLessonsByUser(managerid)
               .then(function (ll) {
                    res.status(200).send(ll);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORLLMANAGERID');
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
                    res.status(406).send('ERRORLLMANAGERID');
                });
        });

        //<!------------------------------------------------------------------ PROJECT ---------------------------------------------------------------------------------------------------->

        server.get('/api/projects', function (req, res) {

                database.getProjects()
                   .then(function (projects) {
                        res.status(200).send(projects);
                    })
                    .catch(function (err) {
                        res.status(406).send('ERRORPROJECTINFO');
                    });
        });


        server.get("/api/projectsbymanager",function(req,res){

             var managerid = req.headers.managerid;
             database.getProjectsByManagerID(managerid)
               .then(function (projs) {
                    res.status(200).send(projs);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORPROJECTMANAGERID');
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
                        res.status(406).send('ERRORINSERTINGPROJECTDB');

                    });
         });

        server.put("/api/updatedateProject",function(req,res){

                 var date = req.body.date;

                 var idproject = req.body.idproject;

                 database.updateProjectDateByID(idproject,date)
                    .then(function() {

                        res.sendStatus(200);
                    })
                    .catch(function (err) {

                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "ERRORPROJECTID"
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
                        res.status(406).send('ERRORTECHINFO');
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
                         res.status(406).send('ERRORTECHINFODB');

                    });
         });

         server.post("/api/deletetech",function(req,res){

             var idtech = req.body.idtech;
             database.deleteTechnology(idtech)
                .then(function() {
                    res.sendStatus(200);
                })
                .catch(function (err) {
                  // Sending the error to the log file
                  res.status(406).send('ERRORDELETINGTECHDB');

                });
         });

         //<!------------------------------------------------------------------ Project Types ---------------------------------------------------------------------------------------------------->


        server.get('/api/projecttypes', function (req, res) {
                database.getProjectTypes()
                   .then(function (types) {
                        res.status(200).send(types);
                    })
                    .catch(function (err) {
                        res.status(406).send('ERRORPROJECTTYPEINFO');
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
                        res.status(406).send('ERRORINSERTPROJECTTYPEDB');

                    });
         });

         server.post("/api/deletetype",function(req,res){

          var idtype = req.body.idtype;

          database.deleteProjectType(idtype)
             .then(function() {
                 res.sendStatus(200);
             })
             .catch(function (err) {
               // Sending the error to the log file
               res.status(406).send('ERRORDELETINGPROJECTTYPE');

             });
      });


         //<!------------------------------------------------------------------ Business Sectors ---------------------------------------------------------------------------------------------------->


        server.get('/api/sectors', function (req, res) {

                database.getSectors()
                   .then(function (sectors) {
                        res.status(200).send(sectors);
                    })
                    .catch(function (err) {
                        res.status(406).send('ERRORGETSECTOR');
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
                        res.status(406).send('ERRORINSERTSECTORDB');

                    });
         });

         server.post("/api/deletesector",function(req,res){

            var idsector = req.body.idsector;

            database.deleteSector(idsector)
               .then(function() {
                   res.sendStatus(200);
               })
               .catch(function (err) {
                 // Sending the error to the log file
                 res.status(406).send('ERRORDELETSECTOR');

               });
        });



         //<!------------------------------------------------------------------ Business Sectors ---------------------------------------------------------------------------------------------------->

          server.get("/api/audit",function(req,res){

             var lesson_id = req.headers.referer.split("/")[4];
             database.getAuditByLesson(lesson_id)
               .then(function (audit) {
                    res.status(200).send(audit);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORAUDITINFO');
                });
        });

    };
} ());
