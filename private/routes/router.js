(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils'),
         cookie = require('../middleware/cookie'),
         crypto = require('crypto'),
         StreamSearch = require('streamsearch'),
         inspect = require('util').inspect,
         validator = require("email-validator")
    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function (server) {

        //<!------------------------------------------------------------------ RENDERS ---------------------------------------------------------------------------------------------------->

        server.get('/', function (req, res) {
            res.render('index');
        });

        server.get('/home', function (req, res) {
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

            var iduser = req.body.iduser;
            req.checkBody('idUser', 'Invalid postparam').notEmpty().isInt();
            
             if(req.validationErrors()){
                 res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN"
                    });
             }
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
                password: utils.checkPassword(req.body.password)
            };
            req.checkBody("email", "ERRORLOGIN").isEmail();

             if(req.validationErrors() || user.password==""){
                 res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN"
                    });
             }

            
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

    
        var email,pass,name,permission;
        email=req.body.email.toLowerCase();
        pass=req.body.password;
        name=req.body.name;
        permission=req.body.permission;
            if(permission!="1" && permission!="2" && permission!="0"){
                // Check if permission is valid.
                res.status(400).json({
                    message_class: 'error',
                    message: 'ERRORCREATEPERMISSION'
                });
            }
            if(!validator.validate(email)){
                // Check if email is valid.
                res.status(400).json({
                    message_class: 'error',
                    message: 'ERRORCREATEEMAIL'
                });
            }

            else{
            database.insertUser(email, pass, name, permission)
                .then(function (user_id) {
                    res.status(200).json({
                                message: "SUCCESS"
                            });
                })
                .catch(function (err) {

                        // If the e-mail is already in use
                        if (err.sqlState == '23000') {
                            // Send the Response with message error
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORCREATEUSER"
                            });

                        } else {
                            // Sending the error to the log file
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORCREATINGUSERDB"
                            });

                        }
                    });
            }
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

        server.post("/api/deleteuserbyid",function(req,res){

            var idToDelete = req.body.userid;
            var adminID = req.body.adminid;
            if(idToDelete == adminID) {
                res.status(406).json({
                    message_class: 'error',
                    message: "ERRORDELETINGSELF"
                });
                return;
            }

            database.deleteUserByID(idToDelete)
                .then(function() {
                    res.status(200).json({
                                message: "SUCCESS"
                            });
                })
                .catch(function (err) {
                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORDELETEUSERID"
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
            var oldemail=req.body.oldemail.toLowerCase();
            //admin making the edition
            var admin = {
                pass: req.body.confirmpass,
                email: req.body.adminemail
            }

            database.checkPasswordbyEmail(admin.email, admin.pass)
                .then(function(){
                    database.updateUserByID(user.id,user.email, user.name, user.permission)
                        .then(function() {                            
                            res.status(200).json({
                                message: "SUCCESS"
                            });
                            
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
                            res.status(200).json({
                                message: "SUCCESS"
                            });
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
             var userid = req.query.userid;

             database.getLessonByID(lesson_id, userid)
               .then(function (lesson) {
                    res.status(200).send(lesson);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORLESSONID');
                });
        });

         server.post("/api/deletelesson",function(req,res){

             var idlesson = req.body.idlesson;
             database.deleteLessonByID(idlesson)
                .then(function() {

                    res.status(200).json({
                                message: "SUCCESS"
                            });
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

                        res.status(200).json({
                                message: "SUCCESS"
                            });
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

                if(!situation || !result || !action) {
                    res.status(406).json({
                           message_class: 'error',
                            message: "ERRORINSERTINGLLFIELDBLANK"
                    });
                    return;

                }
                
                if(situation.length > 1000 || result.length > 1000 || action.length > 1000) {
                    res.status(406).json({
                            message_class: 'error',
                            message: "ERRORINSERTINGLLFIELDBIG"
                    });

                    return;
                }

                 database.updateLessonTextByID(action, situation, result, idLesson, manager)
                    .then(function() {
                        res.status(200).json({
                                message: "SUCCESS"
                            });
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
                        res.status(200).send(lesson);
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
                        res.status(200).json({
                                message: "SUCCESS"
                            });
                    })
                    .catch(function (err) {
                        // Send the Response with message error
                        console.log(err);
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
                        res.status(200).json({
                                message: "SUCCESS"
                            });
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

        server.put("/api/updateProjectManagerByID", function(req, res){
             var idproject = req.body.idproject;
             var managername = req.body.managername;
               database.updateProjectManagerByID(idproject,managername)
                    .then(function() {
                        res.status(200).json({
                                message: "SUCCESS"
                            });
                    })
                    .catch(function (err) {
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "ERRORLESSONID"
                        });

                    });
        });
         server.post("/api/updateprojfinito",function(req,res){
             
             var id= req.body.id;
             var finito;
             if(req.body.finish=='0')
                finito='1';
             else
                finito='0';
                
             database.updateprojfinito(id,finito)
                    .then(function (project) {
                        res.status(200).json({
                                message: "SUCCESS"
                            });
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        res.status(406).send('');

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

                var budget = req.body.budget;

                database.insertProject(type,name,manager,dateBeginning,dateEndExpected,dateEnd,deliveringModel,numberConsultants,daysDuration,client,sector,budget)
                    .then(function (project) {
                        res.status(200).json({
                                message: "SUCCESS"
                            });
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

                        res.status(200).json({
                                message: "SUCCESS"
                            });
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
                        res.status(200).json({
                                message: "SUCCESS"
                            });
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
                    res.status(200).json({
                                message: "SUCCESS"
                            });
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
                        res.status(200).json({
                                message: "SUCCESS"
                            });
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
                res.status(200).json({
                                message: "SUCCESS"
                            });
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
                        res.status(200).json({
                                message: "SUCCESS"
                            });
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
                   res.status(200).json({
                                message: "SUCCESS"
                            });
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
		
		
		  server.post("/api/createaudit",function(req,res){

             var lesson_id = req.headers.referer.split("/")[4];
             database.insertAuditTrail(lesson_id)
               .then(function (audit) {
                    res.status(200).send(audit);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORAUDITINFO');
                });
        });

    };
} ());
