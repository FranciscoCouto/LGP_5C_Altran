(function() {

    'use strict';
    var Promise = require('bluebird'),
        mysql = require("mysql"),
        crypto = require('crypto'),
        bcrypt = require('bcrypt-nodejs'),
        client;

    exports.connect = function(){
        return new Promise(function(resolve, reject) {
            client = mysql.createPool({
                    connectionLimit : 100,
                    waitForConnection: true,
                    host     : 'localhost',
                    user     : 'root',
                    password : 'root',
                    database : 'public',
                    debug    :  false
                });
                if(!client){
                    reject('Error creating pool for the database!');
                }
                else{
                    resolve();
                }
        });
    }

    <!------------------------------------------------------------------------------------------------ USERS ------------------------------------------------------------->
    exports.getUser = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getUserByID = function(iduser){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE idusers = ?";
         query = mysql.format(query,iduser);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getManagers = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE permission = ?";
         query = mysql.format(query,1);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getUserByToken = function(token){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE token = ?";
         query = mysql.format(query,token);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else if(result!=[] && result.length > 0){
                        delete result[0]['password'];
                        //delete result[0]['idusers'];
                        resolve(result[0]);
                    }
                    else{
                        reject("No users");
                    }
                });
         });
    }

    exports.checkPasswordbyEmail = function(email, password){
         return new Promise(function (resolve, reject) {
            console.log(email + " " + password);
         client.query('SELECT password FROM public.users WHERE ?', {email: email},
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else if(result.length <= 0) {
                        reject('Wrong password.');
                    } else {
                        console.log(JSON.stringify(result));
                        bcrypt.compare(password, result[0].password, function (err, res) {
                            if (err) {
                                console.log('adada');
                                reject(err);
                            } else if (res) {
                                console.log('NICE');
                                resolve();

                            } else{
                                console.log('CRA*');
                                reject('Wrong password.');
                            }
                        });
                    }
                });
         });
    }

    exports.confirmLoginByEmail = function(user){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE email = ?";
         query = mysql.format(query,user.email);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            bcrypt.compare(user.password, result[0].password,
                                function (err, res) {
                                    if (err) {
                                        reject(err);
                                    } else if (res === true) {
                                        delete result[0]._password;
                                        resolve(result[0]);
                                    } else if (res === false) {
                                        reject('Incorrect password.');
                                    }
                                });
                        } else {
                            reject('No users found with such email.');
                        }
                    }
                });
         });
    }

    exports.insertUser = function (email, password, name, permission) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    reject(err);
                } else {
                    crypto.randomBytes(20, function (err, buf) {
                        if (err) {
                            reject(err);
                        } else {
                            client.query('INSERT INTO public.users SET ?', {email: email, name: name, password: hash, permission: permission, token: buf.toString('hex')},
                                function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        console.log("olaaa");
                                        resolve(result.insertId);
                                    }
                                });
                        }
                    });
                }
            });
        });
    }

    exports.updateUser = function(email){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.users SET ? WHERE email = ?', [{name: name, password: hash, token: buf.toString('hex')}],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Deleted User with email: ' + email);
                    }
                });
         });
    }

    exports.deleteUserByEmail = function(email){
         return new Promise(function (resolve, reject) {
         var query = "DELETE from public.users WHERE email = ?";

            query = mysql.format(query,email);

            client.query(query,function(err,result){
                        if (err) {
                            console.log(email);
                            reject(err);
                        } else {
                            resolve('Deleted User by Email.');
                        }
                    });
             });
    }

    exports.deleteUserByID = function(iduser){
         return new Promise(function (resolve, reject) {
         var query = "DELETE from public.users WHERE idusers = ?";

            query = mysql.format(query,iduser);

            client.query(query,function(err,result){
                        if (err) {
                            console.log(iduser);
                            reject(err);
                        } else {
                            resolve('Deleted User by ID.');
                        }
                    });
             });
    }

      // Function to update a user email
    exports.updateUserByEmail = function (name, hashedpass, email) {
        return new Promise(function (resolve, reject) {
            console.log('suuup' + hashedpass);
        bcrypt.hash(hashedpass, null, null, function (err, hash) {
            console.log('suuup' + hashedpass);
            client.query('UPDATE public.users SET name = ?, password = ? WHERE email = ?',  [name, hash ,email ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated user with email: ' + email);
                    }
                });
            });
        });
    }

    exports.updateUserPass = function (id, password) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    reject(err);
                } else {
                    crypto.randomBytes(20, function (err, buf) {
                        if (err) {
                            reject(err);
                        } else {
                            client.query('UPDATE public.users SET password = ? WHERE idusers = ?', [hash, id],
                                function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve('Updated User Pass with id: ' + id);
                                    }
                                });
                        }
                    });
                }
            });
        });
    }

    exports.updateUserByID = function(id, email, name, permission){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.users SET name = ?, email = ?, permission = ? WHERE idusers = ?', [name, email, permission, id],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated User with id: ' + id);
                    }
                });
         });
    }


    <!------------------------------------------------------------------------------------------------ Lessons ------------------------------------------------------------->

     exports.getTop = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT count(idLessonsLearned),name from lessonslearned,users where users.idusers = manager group by manager order by count(idLessonsLearned) DESC;";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        console.log('hurray');
                        reject(err);
                    } else {
                        console.log('shipasoda');
                        resolve(result);
                    }
                });
         });
    }

    exports.getLessons = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT t1.idLessonsLearned,t1.status,t1.feedback, t5.client,t7.name as sector,t1.creationdate,t1.aproveddate,t2.situation,t2.action,t2.result,GROUP_CONCAT(t3.technology SEPARATOR ', ') AS technologies,t7.name,t6.idusers,t5.name as title,t6.name FROM (public.lessonstext as t2, public.technologies as t3,public.lesson_tech as t4,public.users as t6,public.lessonslearned as t1 ) LEFT OUTER JOIN public.project as t5 ON t1.project = t5.idproject LEFT OUTER JOIN public.business_sectors as t7 ON t5.sector = t7.idSector WHERE t1.idLessonsLearned = t2.idLessonLearned AND t1.idLessonsLearned = t4.idlesson AND t3.idtechnologies = t4.idtech AND t1.manager = t6.idusers GROUP By idLessonsLearned";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getLessonByID = function(idlesson){
         return new Promise(function (resolve, reject) {
         var query = "SELECT idLessonsLearned, t6.name as manager, feedback, project, status, creationdate, aproveddate, situation,action,result, GROUP_CONCAT(technology SEPARATOR ',') AS technologies, t5.name as project, dateBeginning, dateEndExpected, dateEnd, deliveringModel, numberConsultants, daysDuration, client FROM public.lessonstext as t2, public.technologies as t3, public.lesson_tech as t4, public.users as t6, public.lessonslearned as t1 LEFT OUTER JOIN public.project as t5 ON t5.idproject = t1.project WHERE t1.idLessonsLearned = ? AND t1.idLessonsLearned = t2.idLessonLearned  AND t1.idLessonsLearned = t4.idlesson AND t3.idtechnologies = t4.idtech AND t1.manager = t6.idusers GROUP BY idLessonsLearned, situation, action, result";
         query = mysql.format(query,idlesson);
         client.query(query,function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }


    exports.getLessonByStatus = function(status){
        console.log('cheguei crl');
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.lessonslearned as t1 LEFT OUTER JOIN public.project as t2 ON (t1.project = t2.idproject) WHERE t1.status = ?";
         query = mysql.format(query,status);
         client.query(query,function (err, result) {
                    if (err) {
                        console.log('nn');
                        reject(err);
                    } else {
                        console.log('yy');
                        resolve(result);
                    }
                });
         });
    }

    exports.checkLessonManager = function(idManager, idLesson){
         return new Promise(function (resolve, reject) {
            client.query("SELECT idLessonsLearned, t6.name as manager, project, status, creationdate, aproveddate, situation,action,result, GROUP_CONCAT(technology SEPARATOR ',') AS technologies, t5.name as project, dateBeginning, dateEndExpected, dateEnd, deliveringModel, numberConsultants, daysDuration, client FROM public.lessonstext as t2, public.technologies as t3, public.lesson_tech as t4, public.users as t6, public.lessonslearned as t1 LEFT OUTER JOIN public.project as t5 ON t5.idproject = t1.project WHERE t1.manager = ? AND t1.idLessonsLearned = ? AND t1.idLessonsLearned = t2.idLessonLearned  AND t1.idLessonsLearned = t4.idlesson AND t3.idtechnologies = t4.idtech AND t1.manager = t6.idusers GROUP BY idLessonsLearned, situation, action, result", [idManager,idLesson],
                function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getLessonsByUser = function(iduser){
         return new Promise(function (resolve, reject) {
         client.query("SELECT idLessonsLearned,status, creationdate, aproveddate,GROUP_CONCAT(t3.technology SEPARATOR ', ') AS technologies, t5.name as sector, t2.name as project, dateBeginning, dateEndExpected, dateEnd, deliveringModel, numberConsultants, daysDuration, client FROM (public.technologies as t3, public.lesson_tech as t4, public.lessonslearned as t1) LEFT OUTER JOIN public.project as t2 ON t1.project = t2.idproject LEFT OUTER JOIN public.business_sectors as t5 ON t2.sector = t5.idSector WHERE t1.idLessonsLearned = t4.idlesson AND t3.idtechnologies = t4.idtech AND t1.manager = ? GROUP BY idLessonsLearned",[iduser],
            function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getLessonByKeyword = function(keyword){
         return new Promise(function (resolve, reject) {
         var searchit = '%' + keyword +'%';
         var query = "SELECT t1.manager,t1.status,t1.creationdate,t1.idLessonsLearned,t3.name as title,t2.action,t2.result,t6.technology,t4.name FROM  public.lessonslearned as t1,  public.lessonstext as t2, public.project as t3 , public.users as t4, public.lesson_tech as t5, public.technologies as t6 WHERE  t1.idLessonsLearned = t2.idLessonLearned  AND (t2.situation Like '?' OR t2.action LIKE '?' OR t2.result LIKE '?') AND (t1.manager=t4.idusers) AND (t5.idlesson=t1.idLessonsLearned) AND (t5.idtech=t6.idtechnologies)";
         query = mysql.format(query,searchit,searchit,searchit);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.deleteLessonByID = function(iduser){
         return new Promise(function (resolve, reject) {
         var query = "DELETE from public.lessonslearned WHERE idLessonsLearned = ?";

            query = mysql.format(query,iduser);

            client.query(query,function(err,result){
                        if (err) {
                            console.log(iduser);
                            reject(err);
                        } else {
                            resolve('Deleted User by ID.');
                        }
                    });
             });
    }

    exports.updateLessonTextByID = function (action, situation, result, idLesson, manager) {
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.lessonstext as t2, public.lessonslearned as t1 SET situation = ?, result = ?, action = ? WHERE idLessonLearned = ? AND t1.manager = ? AND t1.idLessonsLearned = t2.idLessonLearned',  [situation, result, action, idLesson, manager],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated lesson fields for the lesson with id: ' + idLesson);
                    }
                });
        });
    }

    exports.updateLessonTechByID = function (technology, idLesson) {
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.technologies SET technology = ? WHERE idLessonsLearned = ?',  [technology, idLesson ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated lessons tech for the lesson with id: ' + idLesson);
                    }
                });
        });
    }

    exports.insertLesson = function (dateCreated,maker,project,datetime,situation,action,result,technology,status) {
        return new Promise(function (resolve, reject) {

        var projectID = null;
        var resultDesc = result;

        if(project != null && project && project.length > 0){
             var query = "Select idproject FROM public.project Where name = ?";
             query = mysql.format(query,project);
             client.query(query,function (err4, result4) {
                        if (err4) {
                                reject(result4);
                            } else {
                                console.log('project consulted');
                                projectID = result4[0].idproject;
                            }
                    });
        }
        else {
            projectID = null;
        }

        var arrayTechs = [];
        technology.forEach(function(tech) {
            var query = "Select idtechnologies FROM public.technologies Where technology = ?";
            query = mysql.format(query,tech.technology);
            client.query(query,function (err5, result5) {
                    if (err5) {
                            reject(result5);
                        } else {
                            console.log("technology consulted");
                            arrayTechs.push(result5[0].idtechnologies);
                        }
                });
        });

        var query = "Select idusers FROM public.users Where name = ?";
        query = mysql.format(query,maker);
        client.query(query, function(err, result) {
            if (err) {
                reject(err);
            } else {
                client.query('INSERT INTO public.lessonslearned SET ?', {creationdate: dateCreated, manager: result[0].idusers, project: projectID, status: status},
                        function (err1, result1) {
                            if (err1) {
                                reject(err1);
                            } else {
                                console.log("Lesson inserted: " + JSON.stringify(result1));

                                client.query('INSERT INTO public.lessonstext SET ?', {idLessonLearned: result1.insertId, situation: situation, action: action, result: resultDesc},
                                    function (err2, result2) {
                                        if (err2) {
                                            reject(err2);
                                        } else {
                                            var sql = "INSERT INTO public.lesson_tech (idLesson, idTech) VALUES ?";
                                            var values = [];
                                            arrayTechs.forEach(function(tech) {
                                                var val = [result1.insertId,tech];
                                                values.push(val);
                                            });

                                            console.log(values);
                                            client.query(sql,[values],function (err5, result5) {
                                                if (err5) {
                                                    console.log("Error inserting lesson");
                                                        reject("error")
                                                    } else {
                                                        console.log("Success inserting lesson");
                                                        resolve(result.insertId);
                                                    }
                                            });
                                        }
                                    });
                            }
                        });
            }
        });

        /*client.query('Select idusers FROM public.users Where name = ?',{name:maker},
                    function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                        client.query('INSERT INTO public.lessonslearned SET ?', {dateCreated: dateCreated, maker: result[0].idusers, project: result4[0].idproject},
                            function (err1, result1) {
                                if (err1) {
                                    reject(err1);
                                } else {
                                client.query('INSERT INTO public.lessonstext SET ?', {idLessonLearned: result1.insertId, situation: situation, action: action, result: result},
                                    function (err2, result2) {
                                        if (err2) {
                                            reject(err2);
                                        } else {
                                            client.query('INSERT INTO public.lesson_tech SET ?', {idLessonsLearned: result.insertId, technology: result5[0].idtechnologies},
                                                    function (err3, result3) {
                                                        if (err3) {
                                                            reject(err3);
                                                        } else {

                                                        resolve(result.insertId);

                                                        }
                                                    });
                                            }
                                    });
                            }
                    });
                }
            });*/
        });
    }

    exports.updateLessonStateByID = function(idlesson,state){
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.lessonslearned SET status = ? WHERE idLessonsLearned = ?',  [state, idlesson ],
                function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(result);
                        resolve('Updated lesson with id: ' + idlesson + 'to: ' + state);
                    }
                });
        });
    }

    exports.updateLessonFeedbackByID = function(idlesson,feedback){
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.lessonslearned SET feedback = ? WHERE idLessonsLearned = ?',  [feedback, idlesson ],
                function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(result);
                        resolve('Updated lesson with id: ' + idlesson + 'to: ' + feedback);
                    }
                });
        });
    }

    <!------------------------------------------------------------------------------------------------ Project ------------------------------------------------------------->

    exports.getProjects = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT t1.*, t2.name as RManager, t3.name as RSector FROM public.project as t1 INNER JOIN users as t2 ON (t1.manager = t2.idusers) INNER JOIN business_sectors as t3 ON(t1.sector = t3.idSector)";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getProjectsByManagerID = function(idManager){
         return new Promise(function (resolve, reject) {
         var query = 'SELECT * FROM public.project WHERE manager = ?';
         query = mysql.format(query,idManager);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.insertProject = function (type,name,manager,dateBeginning,dateEndExpected, dateEnd, deliveringModel,numberConsultants, daysDuration, projclient,sector) {
        return new Promise(function (resolve, reject) {
            console.log('heyyy: ' + sector + projclient + deliveringModel);
            var query = 'Select idusers FROM public.users WHERE name = ?';
            query = mysql.format(query, manager);
            client.query(query,function (err2, result2) {
                    if (err2) {
                        reject(err2);
                    } else {
                        var query = 'Select idSector FROM public.business_sectors WHERE name = ?';
                        query = mysql.format(query, sector);
                        client.query(query,function (err3, result3) {
                                if (err3) {
                                    reject(err3);
                                } else {
                                    client.query('INSERT INTO public.project SET ?', {type: type, name: name, manager: result2[0].idusers, dateBeginning: dateBeginning, dateEndExpected: dateEndExpected, dateEnd: dateEnd, deliveringModel: deliveringModel, numberConsultants: numberConsultants , daysDuration:daysDuration, client:projclient, sector:result3[0].idSector},
                                        function (err, result) {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                resolve(result.insertId);
                                            }
                                        });
                                }
                        });
                    }
            });
        });
    }

    exports.updateProjectDateByID = function(idproject,date){
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.project SET dateEnd = ? WHERE idproject = ?',  [date, idproject ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated project date of ending with id: ' + idproject + 'to: ' + date);
                    }
                });
        });
    }

    <!------------------------------------------------------------------------------------------------ Technology ------------------------------------------------------------->


    exports.getTechnologies = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.technologies WHERE public.technologies.visible=1";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.addTechnology = function(technology){
         return new Promise(function (resolve, reject) {
        client.query('INSERT INTO public.technologies SET ?', {technology: technology },
            function (err, result) {
                if (err) {
                    reject(err);
                } else {

                resolve(result.insertId);
                }
            });
        });
    }

    exports.deleteTechnology = function(techid){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.technologies SET visible=0 WHERE idtechnologies = ?', [techid],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Deleted technology with id: ' + techid);
                    }
                });
         });
    }

    <!------------------------------------------------------------------------------------------------ Project Types ------------------------------------------------------------->


    exports.getProjectTypes = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.project_types  WHERE public.project_types.visible=1";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.addProjectType = function(type){
         return new Promise(function (resolve, reject) {
        client.query('INSERT INTO public.project_types SET ?', {name: type },
            function (err, result) {
                if (err) {
                    reject(err);
                } else {

                resolve(result.insertId);
                }
            });
        });
    }

    exports.deleteProjectType = function(projid){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.project_types SET visible=0 WHERE idType = ?', [projid],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Deleted project type with id: ' + projid);
                    }
                });
         });
    }

    <!------------------------------------------------------------------------------------------------ Business Sectors ------------------------------------------------------------->


    exports.getSectors = function(){
         return new Promise(function (resolve, reject) {
            console.log("...");
         var query = "SELECT * FROM public.business_sectors WHERE public.business_sectors.visible=1";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.addSector = function(sector){
         return new Promise(function (resolve, reject) {
        client.query('INSERT INTO public.business_sectors SET ?', {name: sector },
            function (err, result) {
                if (err) {
                    reject(err);
                } else {

                resolve(result.insertId);
                }
            });
        });
    }


    exports.deleteSector = function(sectorid){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.business_sectors SET visible=0 WHERE idSector = ?', [sectorid],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Deleted Sector with id: ' + sectorid);
                    }
                });
         });
    }


     <!------------------------------------------------------------------------------------------------ Audit Trail ------------------------------------------------------------->


     exports.getAuditByLesson = function(idlesson){
         return new Promise(function (resolve, reject) {
         var query = "SELECT t1.*,t3.name As Editor, t2.creationdate, t4.name As Approver, t5.name as Creator FROM audit_trail as t1 INNER JOIN lessonslearned as t2 ON(t2.idLessonsLearned = t1.idlessonlearned) inner join users t3 on t3.idusers = t1.editor left join users t4 on t4.idusers = t2.approver inner join users t5 on t5.idusers = t2.manager Where t1.idlessonlearned = ?";
         query = mysql.format(query,idlesson);
         client.query(query,function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

     exports.getAuditByID = function(idaudit){
         return new Promise(function (resolve, reject) {
         var query = "SELECT action FROM audit_trail WHERE action IS NOT NULL AND idaudit_trail = ? UNION SELECT situation FROM audit_trail WHERE situation IS NOT NULL AND idaudit_trail = ? UNION SELECT result FROM audit_trail WHERE result IS NOT NULL AND idaudit_trail = ? ";
         query = mysql.format(query,idaudit);
         client.query(query,function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

}());
