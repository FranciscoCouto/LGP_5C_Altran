(function() {

    'use strict';
    /**
     * Create the module and call the requires
     */
    var app = angular.module('lessonslearned', [
        'ngRoute',
        'ngCookies',
        'pascalprecht.translate',
        'ui.bootstrap',
        'angular-advanced-searchbox',
        'isteven-multi-select',
        'angular.filter',
        'ui.checkbox',
        'ngTagsInput'
    ]);

    /**
     * Configure the Routes */

    app.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
				templateUrl: "app/views/login.html",
                controller: "LoginCtrl",
				css: "styles/home.css"
            })

             .when("/home", {
                templateUrl: "app/views/home.html",
                controller: "HomeCtrl",
				css: "styles/home.css"
            })

            .when("/users", {
                templateUrl: "app/views/admin/user_list.html",
                controller: "UserListCtrl",
				css: "styles/list_users.css"
            })

            .when("/listll", {
                templateUrl: "app/views/list_ll.html",
                controller: "listllCtrl",
				css: "styles/list_ll.css"
            })

            .when("/mylistll", {
                templateUrl: "app/views/mylist_ll.html",
                controller: "mylistllCtrl",
				css: "styles/list_ll.css"
            })

			.when("/view_ll/:id/", {
                templateUrl: "app/views/view_ll.html",
                controller: "ViewLLCtrl",
				css: "styles/view_ll.css"
            })

            .when("/list_audit/:id/", {
                templateUrl: "app/views/list_audit.html",
                controller: "AuditListCtrl",
				css: "styles/list_ll.css"
            })

            .when("/list_projects", {
                templateUrl: "app/views/list_project.html",
                controller: "ProjectListCtrl",
                css: "styles/list_ll.css"
            })

			.when("/settings",{
                templateUrl: "app/views/settings.html",
                controller: "SetCtrl",
				css: "styles/settings.css"
            })
            .when("/statistics",{
                templateUrl: "app/views/statistics.html",
                controller: "StatCtrl"
            })


            .when("/forbidden",{
                templateUrl: "app/views/404.html",
                controller: "HomeCtrl"
            })

            .otherwise({
                redirectTo: '/forbidden'
            });

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        //$locationProvider.html5Mode({ enabled: true, requireBase: false });
        $locationProvider.html5Mode(true);

    });

    app.config(['$translateProvider', function($translateProvider) {
        $translateProvider
            .useSanitizeValueStrategy('escape')
            .translations('en', { //TODO: Translations from each language on different files
               
                OPENPR: 'Active',
                CLOSEPR: 'Terminated',
                OPENCLOSE: 'Open/Close',
                ENABLE:'Enable',
                APPROVE: 'Approve',
                REJECT: 'Reject',
                SITUATION: 'Situation',                
                ACTION: 'Action',
                RESULTS: 'Results',
                FEEDBACK: 'Feedback',
                DIMENSION: 'Dimension',
                TECHNOLOGIES: 'Technologies',
                DISABLE: 'Disable',
                STATUS: 'Status',
                ADMIN: 'Administrator',
                SUBMITTER: 'Submitter',
                READER: 'Reader',
                CHOOSEFILE: 'Choose image',
                HOME: 'Home',
                ADMIN_PANEL: 'Administration',
                USERS: 'Users',
                LESSONS: 'Lessons Learned',
                STATS: 'Statistics',
                IN_WAIT: 'In Wait',
                AUDIT_TRAIL: 'Audit Trail',
                SETTINGS: 'Settings',
                PROJECTS: 'Projects',
                MY_LL: 'My LLs',
                NAVIGATION: 'Navigation',
                AREYOUSURE: 'Are you sure?',

                TECHS: 'Technologies',
                PROJECT_TYPES: 'Project Types',
                BUSINESS_SECTORS: 'Business Sectors',

                LANGUAGE: 'Language',

                EXPORT: 'Export',
                EXPORT_TO_PDF: 'Export to PDF file',
                EXPORT_TO_CSV: 'Export to CSV file',
                ADD_USER: 'Add user',

                SELECT: 'Select...',
                SEARCH: 'Search',
                CLIENT: 'Client',
                SELECT_CLIENT: 'Project\'s Client',
                NONE: 'None',

                //Pagination buttons
                FIRST: 'First',
                LAST: 'Last',
                NEXT: 'Next',
                PREVIOUS: 'Previous',

                //Create LL
                SELECT_TECHS: 'Select Technologies',
                SELECT_MANAGER: 'Select Project Manager',
                SELECT_PROJECT: 'Select Project',
                DESCRIPTION: 'Description of the situation',
                ACTION_TAKEN: 'Action taken',
                RESULT_DESCRIPTION: 'Results observed',
                CHARS_LEFT: 'characters left',
                SUBMIT: 'Submit',
                SAVE_DRAFT: 'Save',
                CANCEL: 'Cancel',
                CREATE_LL: 'Create Lesson Learned',

                //Create Project
                LL_TITLE: 'Project Title',
                PROJECT_NAME: 'Project Name',
                PROJECT_MANAGER: 'Project Manager',
                COLABORATORS: 'Users',
                BUSINESS_SECTOR: 'Busines Sector',
                DAYS_LENGTH: 'Project Duration (days)',
                PROJECT_TYPE: 'Project Type',
                ADD_PROJECT: 'Add Project',
                DELIVERING_MODEL: 'Delivering Model',
                STARTING_DATE: 'Start Date',
                EXPECTED_DATE: 'End Date Foreseen',
                CONCLUSION_DATE: 'End Date',
                CREATE_PROJECT: 'Creating Project',
				PROJECT_DATA: 'Project Data',
				NUMBER_CONS: 'Number of Consultants',
                
                ALLOCATE_PM: 'Alocate PM',
                CHOOSE_PERSON: 'Choose user',

                UPDATE_TYPES: 'Update Project Types',
                UPDATE_TECHS: 'Update Technologies',
                UPDATE_SECTORS: 'Update Business Sectors',

                //Lista LL
                ACTIVE: 'Active',
                INACTIVE: 'Inactive',
                SUBMITTED: 'Pending approval',
                NO_PROJECT: 'No Project',

                //Lista Users
                USER_MANAGEMENT: 'User Management',
                EDITING_USER: 'Edit User information',
                USER_NAME: 'Name',
                PASSWORD: 'Password',
                AGAIN: 'Password again',
                HAS_PERMISSIONS: 'Current permission level',
                CHANGE_TO: 'Change to',
                CONFIRM_CHANGE: 'Change password',
                MODIFY_DATA: 'Modify main data',
                MODIFY_PERMISSIONS: 'Change permissions',
                MODIFY_PASSWORD: 'Change password',
                MODIFY_PROJECTS: 'Add projects',
                MODIFY_CONFIRM: 'Confirm changes',
                TYPE_PASS: 'Type your password',
				PERMISSION_LEVEL: 'Permission Level',
				USER_LEVEL: ' Permission Level ',
				CREATE: 'Create',
				EMAIL: 'Email address',

                TECHNOLOGY: 'Technologies',
                AUTHOR: 'Author',
                PROJECT: 'Project',
                SECTOR: 'Sector',
                INSPECT: 'Inspect',
                APPROVED: 'Approved',
                DRAFT: 'Draft',
                PENDING: 'Pending aproval',
                ALL: 'All',
                
                //LISTA AUDIT
                CREATION_DATE: 'Creation Date',
                CHANGE_DATE: 'Date of Change',
                CREATOR: 'Creator',
                APPROVER: 'Approver',
                EDITOR: 'Editor',
                TYPE_OF_CHANGE: 'Operation',
                FIELDS_CHANGED: 'Fields Changed',
                VIEWING_CHANGES: 'Viewing Changes',
                TYPE: 'Type',
                ADDTAG: 'Add a Tag',
                
                //LOGIN
                FORGOT: 'Forgot the password?',
                CONTINUEAS: 'Do you wish to continue as ',
                LOGOUT: 'Logout',
                USERNAME: 'Username',
                REMEMBERME: 'Remember me',
                SIGNIN: 'Sign in',

                //CREATE USER
                PERSONAL_INFO: 'User Data',
                PERSONAL_IMG: 'Collaborator Image',
                
                OPERATION:'OPERATION',
                update: 'update',
                //ERRORS
                ERRORMESSAGE2:'SOMETHING JUST WENT WRONG !',
                ERROR: '404 error',
                ERRORMESSAGE: "For some reason you coudn't access the page you were looking for",
                ERRORLOGIN: 'Username or password invalid',
                ERRORLOGIN1: 'Error Logging in, please try again later',
                ERRORUSERINFORMATION: 'Could not retrieve users information',
                ERRORMANAGERINFORMATION: 'Could not retrieve Managers information',
                ERRORSESSION: 'Could not verify session',
                ERRORCREATEIMAGE: 'Error uploading image',
                ERRORRENAMEIMAGE: 'Could not rename image',
                ERRORCREATEPERMISSION: 'Permission not valid',
                ERRORCREATEEMAIL: 'Email not valid',
                ERRORCREATEUSER: 'Email already in use',
                ERRORDELETEUSER:'No such user with that email',
                ERRORUPDATEUSEREMAIL:'No such user with that ID',
                ERRORADMINPASS: 'Wrong Admin Password',
                ERRORUPDATEPASS: "Couldn't update user password",
                ERRORMATCHPASS: "Passwords don't match",
                ERRORLESSONSTOP: "Could not retrieve Lesson's Learned information",
                ERRORSEARCHLL: 'Search by that keyword returned nothing',
                ERRORLLBYSTATUS: 'Could not retrieve Lessons Learned with that state',
                ERRORLESSONID: 'Could not retrieve Lesson Learned with that id',
                ERRORINSERTINGLL: 'Error inserting lesson to database',
                ERRORINSERTINGLLFIELDBLANK: 'Error inserting lesson to database. The three description fields cannot be blank.',
                ERRORINSERTINGLLFIELDBIG: 'Error inserting lesson to database. The description fields have a limit of 1000 characters.',
                ERRORUPDATINGLESSONSTATE: 'Incorrect state! Choose one of the following: draft|submitted|approved|inactive',
                ERRORPROJECTINFO: 'Could not retrieve projects information',
                ERRORLLMANAGERID: 'Could not retrieve Lessons Learned information with that manager id',
                ERRORPROJECTMANAGERID: 'Could not retrieve projects inforgmation with that manager id',
                ERRORINSERTINGPROJECTDB: 'Error inserting project to database',
                ERRORPROJECTID: 'No such project with that id',
                ERRORTECHINFO: 'Could not retrieve technologies information',
                ERRORTECHINFODB: 'Error inserting technology to database',
                ERRORDELETINGTECHDB: 'Error deleting technology',
                ERRORPROJECTTYPEINFO: 'Could not retrieve project types information',
                ERRORINSERTPROJECTTYPEDB:'Error inserting project type to database',
                ERRORDELETINGPROJECTTYPE: 'Error deleting project type',
                ERRORGETSECTOR: 'Could not retrieve business sectors information',
                ERRORINSERTSECTORDB: 'Error inserting business sector to database',
                ERRORDELETSECTOR: 'Error deleting sector',
                ERRORAUDITINFO: 'Could not retrieve Audit information for that lesson',
                ERRORCREATINGUSERDB: 'Error inserting user to database',
                ERRORDELETINGUSER: 'Error deleting user from database',
                ERRORDELETINGSELF: 'Error deleting user from database. You can\'t delete current user.',
                ERRORDELETEUSERID: 'User doesn\'t exist or has Lessons associated already.',
                DELETEUSERSUCCESS: 'Successfully deleted user.'
                                
            })
            .translations('pt', {
                OPENPR: 'Ativo',
                CLOSEPR: 'Terminado',
                OPENCLOSE: 'Abrir/Fechar',
                ENABLE:'Ativar',
                APPROVE: 'Aprovar',
                REJECT: 'Rejeitar',
                SITUATION: 'Situação',                
                ACTION: 'Ação',
                RESULTS: 'Resultados',
                FEEDBACK: 'Feedback',
                DIMENSION: 'Dimensão',
                TECHNOLOGIES: 'Tecnologias',
                DISABLE: 'Desativar',
                STATUS: 'Estado',
                
                ADMIN: 'Administrador',
                SUBMITTER: 'Editor',
                READER: 'Leitor',
                CHOOSEFILE: 'Escolher imagem',
                
                HOME: 'Começar',
                ADMIN_PANEL: 'Administração',
                USERS: 'Utilizadores',
                LESSONS: 'Lições Aprendidas',
                STATS: 'Estatísticas',
                IN_WAIT: 'À espera de aprovação',
                AUDIT_TRAIL: 'Histórico',
                SETTINGS: 'Configurações',
                PROJECTS: 'Projetos',
                MY_LL: 'Minhas LL',
                NAVIGATION: 'Navegação',
                AREYOUSURE: 'Tem a certeza?',
                ADDTAG: 'Adicionar Tag',


                TECHS: 'Tecnologias',
                PROJECT_TYPES: 'Tipos de Projeto',
                BUSINESS_SECTORS: 'Setores de Negócio',

                LANGUAGE: 'Dialeto',

                EXPORT: 'Exportar',
                EXPORT_TO_PDF: 'Exportar para ficheiro PDF',
                EXPORT_TO_CSV: 'Exportar para ficheiro CSV',
                ADD_USER: 'Adicionar utilizador',

                SELECT: 'Selecionar...',
                SEARCH: 'Pesquisar',
                CLIENT: 'Cliente',
                SELECT_CLIENT: 'Cliente',
                NONE: 'Nenhum',

                //Pagination buttons
                FIRST: 'Início',
                LAST: 'Fim',
                NEXT: 'Próximo',
                PREVIOUS: 'Anterior',

                //Create LL
                SELECT_TECHS: 'Selecionar Tecnologias',
                SELECT_MANAGER: 'Selecionar Gestor de Projeto',
                SELECT_PROJECT: 'Selecionar Projeto',
                DESCRIPTION: 'Descrição da situação',
                ACTION_TAKEN: 'Descrição da ação tomada',
                RESULT_DESCRIPTION: 'Descrição do resultado',
                CHARS_LEFT: 'caracteres restantes',
                SUBMIT: 'Submeter',
                SAVE_DRAFT: 'Guardar',
                CANCEL: 'Cancelar',
                CREATE_LL: 'Criar Lesson Learned',
                TYPE: 'Tipo',

                //Create Project
                LL_TITLE: 'Título de Projeto',
                PROJECT_NAME: 'Nome do Projeto',
                PROJECT_MANAGER: 'Gestor de Projeto',
                COLABORATORS: 'Utilizadores',
                BUSINESS_SECTOR: 'Setor de Negócio',
                DAYS_LENGTH: 'Duração Projeto',
                PROJECT_TYPE: 'Tipo de Projeto',
                ADD_PROJECT: 'Adicionar Projeto',
                DELIVERING_MODEL: 'Modelo de Entrega',
                STARTING_DATE: 'Data de Início',
                EXPECTED_DATE: 'Data de Fim previsto',
                CONCLUSION_DATE: 'Data de Conclusão',
                CREATE_PROJECT: 'Criar Projecto',
				PROJECT_DATA: 'Dados de Projeto',
				NUMBER_CONS: 'Number of consultants',

                ALLOCATE_PM: 'Alocar PM',
                CHOOSE_PERSON: 'Escolha o utilizador',

                UPDATE_TYPES: 'Atualizar Tipos de Projeto',
                UPDATE_TECHS: 'Atualizar Tecnologias',
                UPDATE_SECTORS: 'Atualizar Setores de Negócio',

                //Lista LL
                ACTIVE: 'Ativas',
                INACTIVE: 'Inativa',
                SUBMITTED: 'Aprovação pendente',
                NO_PROJECT: 'Sem Projecto',

                //Lista Users
                USER_MANAGEMENT: 'Gestão de utilizadores',
                EDITING_USER: 'Editar utilizador',
                USER_NAME: 'Nome',
                PASSWORD: 'Password',
                AGAIN: 'Repetir password',
                HAS_PERMISSIONS: 'Nível de permissão atual',
                CHANGE_TO: 'Mudar para',
                CONFIRM_CHANGE: 'Alterar password',
                MODIFY_DATA: 'Modificar dados principais',
                MODIFY_PERMISSIONS: 'Alterar permissões',
                MODIFY_PASSWORD: 'Alterar a password',
                MODIFY_PROJECTS: 'Associar projetos',
                MODIFY_CONFIRM: 'Confirmar alterações',
                TYPE_PASS: 'Digite a sua password',
				PERMISSION_LEVEL: 'Nível de permissões',
				USER_LEVEL: ' Nível de Permissões ',
				CREATE: 'Criar',
				EMAIL: 'Endereço E-mail',


                TECHNOLOGY: 'Tecnologias',
                AUTHOR: 'Autor',
                PROJECT: 'Projeto',
                SECTOR: 'Setor',
                INSPECT: 'Ver Informação',
                APPROVED: 'Aprovado',
                DRAFT: 'Rascunho',
                PENDING: 'À espera de aprovação',
                ALL: 'Todos',
                
                //LISTA AUDIT
                CREATION_DATE: 'Data de Criação',
                CHANGE_DATE: 'Data de edição',
                CREATOR: 'Criador',
                APPROVER: 'Approver',
                EDITOR: 'Editor',
                TYPE_OF_CHANGE: 'Operação',
                FIELDS_CHANGED: 'Campos Mudados',
                VIEWING_CHANGES: 'Ver Mudanças',
                
                //LOGIN
                FORGOT: 'Não se lembra da senha?',
                CONTINUEAS: 'Deseja continuar como ',
                LOGOUT: 'Sair',
                USERNAME: 'Nome de Usuário',
                REMEMBERME: 'Lembrar',
                SIGNIN: 'Entrar',

                //CREATE USER
                PERSONAL_INFO: 'Dados do utilizador',
                PERSONAL_IMG: 'Imagem Pessoal',
                OPERATION:'OPERAÇÃO',
                update: 'atualização',
                
                //ERRORS
                ERRORMESSAGE2:'ALGO DEU ERRADO !',
                ERROR: '404 erro',
                ERRORMESSAGE: "Por alguma razão não foi possível aceder à página que procura",
                ERRORLOGIN: 'Nome de usuário ou senha errados',
                ERRORLOGIN1: 'Erro no serviço de autenticação, por favor tente mais tarde',
                ERRORUSERINFORMATION: 'Não foi possivel encontrar informação do usuário',
                ERRORMANAGERINFORMATION: 'Não foi possivel encontrar informação do gestor',
                ERRORSESSION: 'Não foi possível verificar a sessão',
                ERRORCREATEIMAGE: 'Erro a carregar a imagem',
                ERRORRENAMEIMAGE: 'Erro a alterar o nome da imagem',
                ERRORCREATEPERMISSION: 'Permissão inválida',
                ERRORCREATEEMAIL: 'Email inválido',
                ERRORCREATEUSER: 'Email em uso',
                ERRORDELETEUSER:'Não existe nenhum usuário com o email introduzido',
                ERRORUPDATEUSEREMAIL:'Não existe nenhum usuário com o ID introduzido',
                ERRORADMINPASS: 'Senha de Admin incorreta',
                ERRORUPDATEPASS: "Não foi possível atualizar a senha do usuário",
                ERRORMATCHPASS: "Senhas introduzidas diferentes",
                ERRORLESSONSTOP: 'Não foi possível encontrar informação da Lição Aprendida',
                ERRORSEARCHLL: 'A pesquisa por essa palavra chave não encontrou nada',
                ERRORLLBYSTATUS: 'Não foi possível Lições Aprendidas com esse estado',
                ERRORLESSONID: 'Não foi possível Lições Aprendidas com esse id',
                ERRORINSERTINGLL: 'Erro ao inserir Lição Aprendida',
                ERRORINSERTINGLLFIELDBLANK: 'Erro ao inserir Lição Aprendida. Os campos de descrição não podem ficar em branco.',
                ERRORINSERTINGLLFIELDBIG: 'Erro ao inserir Lição Aprendida. Os campos de descrição não podem ter mais de 1000 caracteres cada.',
                ERRORUPDATINGLESSONSTATE: 'Estado incorreto. Escolha um dos seguintes: rascunho/submetido/aprovado/inativo',
                ERRORPROJECTINFO: 'Não foi possível encontrar informação de projetos',
                ERRORLLMANAGERID: 'Não foi possível encontrar informação da Lição Aprendida com esse id de gestor',
                ERRORPROJECTMANAGERID: 'Não foi possível encontrar informação de projetoscom esse id de gestor',
                ERRORINSERTINGPROJECTDB: 'Erro ao inserir projeto',
                ERRORPROJECTID: 'Não existe nenhum projeto com esse id',
                ERRORTECHINFO: 'Não foi possível encontrar tecnologias do projeto',
                ERRORTECHINFODB: 'Erro ao inserir tecnologias',
                ERRORDELETINGTECHDB: 'Erro ao apagar tecnologia da base de dados',
                ERRORPROJECTTYPEINFO: 'Não foi possível encontrar informação dos tipos de projeto',
                ERRORINSERTPROJECTTYPEDB:'Erro ao inserir tipo de projeto',
                ERRORDELETINGPROJECTTYPE: 'Erro ao apagar tipo de projeto',
                ERRORGETSECTOR: 'Não foi possível encontrar informação do setor de negócio',
                ERRORINSERTSECTORDB: 'Erro ao inserir setor de negócio',
                ERRORDELETSECTOR: 'Erro ao apagar setor de negócio da base de dados',
                ERRORAUDITINFO: 'Não foi possível encontrar informação do Audit para essa Lição Aprendida',
                ERRORCREATINGUSERDB: 'Erro ao inserir utilizador',
                ERRORDELETINGUSER: 'Erro ao apagar utilizador',
                ERRORDELETINGSELF: 'Erro ao apagar utilizador. Não pode apagar o utilizador atual.',
                ERRORDELETEUSERID:'Utilizador não existe ou tem Lições criadas.',
                DELETEUSERSUCCESS: 'Utilizador removido com sucesso.'

            })
            .translations('fr', {
                OPENPR: 'Actif',
                CLOSEPR: 'Terminé',
                OPENCLOSE: 'Ouvert/Fermer',
               ENABLE:'Activer',
                APPROVE: 'Approuver',
                REJECT: 'Rejeter',
                SITUATION: 'Situation',                
                ACTION: 'Action',
                RESULTS: 'Résultats',
                FEEDBACK: "Retour d'information",
                DIMENSION: 'Dimension',
                TECHNOLOGIES: 'Technologies',
                DISABLE: 'Désactiver',
                STATUS: 'État',
                TYPE: 'Genre',
                ADDTAG: 'Ajouter un Tag',
                
                ADMIN: 'Administrateur',
                SUBMITTER: 'Editeur',
                READER: 'Lecteur',
                
                CHOOSEFILE: "Choisir l'image",
                HOME: 'Début',
                ADMIN_PANEL: 'Administration',
                USERS: 'Utilisateurs',
                LESSONS: 'Les Leçons Apprises',
                STATS: 'Statistiques',
                IN_WAIT: 'En attente d´approbation',
                AUDIT_TRAIL: 'Histoire',
                SETTINGS: 'Réglages',
                PROJECTS: 'Projects',
                MY_LL: 'Mes LL',
                NAVIGATION: 'Navigation',
                AREYOUSURE: 'Êtes-vous sûr?',

                TECHS: 'Technologies',
                PROJECT_TYPES: 'Types de projets',
                BUSINESS_SECTORS: "Secteurs d'activité",

                LANGUAGE: 'Langue',

                EXPORT: 'Exportation',
                EXPORT_TO_PDF: 'Exporter vers un fichier PDF',
                EXPORT_TO_CSV: 'Exporter vers un fichier CSV',
                ADD_USER: 'Ajouter l´utilisateur',

                SELECT: 'Sélectionner...',
                SEARCH: 'Chercher',
                CLIENT: 'Client',
                SELECT_CLIENT: 'Client',
                NONE: 'Aucun',

                //Pagination buttons
                FIRST: 'Première',
                LAST: 'Dernier',
                NEXT: 'Prochaine',
                PREVIOUS: 'Précédent',
                
                TECHNOLOGY: 'Technologie',
                AUTHOR: 'Auteur',
                PROJECT: 'Projet',
                SECTOR: 'Secteur',
                INSPECT: 'Inspecter',
                APPROVED: 'Approuvé',
                DRAFT: 'Brouillon',
                PENDING: 'Validation en attente',
                ALL: 'Tout',
                

                //Create LL
                SELECT_TECHS: 'Sélectionnez Technologies',
                SELECT_MANAGER: 'Sélectionnez Project Manager',
                SELECT_PROJECT: 'Choisir un Project',
                DESCRIPTION: 'Description de la situation',
                ACTION_TAKEN: 'Prendre action description',
                RESULT_DESCRIPTION: 'Description de résultat',
                CHARS_LEFT: 'rester caractères',
                SUBMIT: 'Soumettre',
                SAVE_DRAFT: 'Enregistrer',
                CANCEL: 'Annuler',
                CREATE_LL: 'Leçons apprises création',

                //Create Project////////////////////////////////////////////
                LL_TITLE: 'Titre du projet',
                PROJECT_NAME: 'Nom du projet',
                PROJECT_MANAGER: 'Chef de projet',
                COLABORATORS: 'Utilisateurs',
                BUSINESS_SECTOR: "Secteurs d'activité",
                DAYS_LENGTH: 'Durée du projet',
                PROJECT_TYPE: 'Type de projet',
                ADD_PROJECT: 'Ajouter un projet',
                DELIVERING_MODEL: 'Modèle délivrant',
                STARTING_DATE: 'Date de début',
                EXPECTED_DATE: 'Date de fin prévue',
                CONCLUSION_DATE: 'Date de fin',
                CREATE_PROJECT: 'Créer un projet',
				PROJECT_DATA: 'Données du projet',
				NUMBER_CONS: 'Nombre de consultants',

                ALLOCATE_PM: 'Allouer PM',
                CHOOSE_PERSON: "Choisissez l'utilisateur",

                UPDATE_TYPES: 'Types de mise à jour du projet',
                UPDATE_TECHS: 'Mise à jour Technologies',
                UPDATE_SECTORS: "Secteurs d'activité Mise à jour",

                //Lista LL
                ACTIVE: 'Actif',
                INACTIVE: 'Négligé',
                SUBMITTED: 'Validation en attente',
                NO_PROJECT: 'Aucun projet',

                //Lista Users
                USER_MANAGEMENT: 'Gestion des utilisateurs',
                EDITING_USER: 'Modifier l\'utilisateur',
                USER_NAME: 'Nom',
                PASSWORD: 'Mot de pass',
                AGAIN: 'Mot de pass à nouveau',
                HAS_PERMISSIONS: 'Niveau d\'autorisation actuel',
                CHANGE_TO: 'Confirmer le changement',
                CONFIRM_CHANGE: 'Modifier le mot de passe',
                MODIFY_DATA: 'Modifier les données clés',
                MODIFY_PERMISSIONS: 'Modifier les autorisationss',
                MODIFY_PASSWORD: 'Modifier mot de passe',
                MODIFY_PROJECTS: 'Ajouter des projets',
                MODIFY_CONFIRM: 'Confirmer les modifications',
                TYPE_PASS: 'Tapez votre mot de passe',
				PERMISSION_LEVEL: 'Niveau d\'autorisation',
				USER_LEVEL: ' Niveau d\'autorisation ',
				CREATE: 'Créer',
				EMAIL: 'Adresse e-mail',

                //LISTA AUDIT
                CREATION_DATE: 'Date de création',
                CHANGE_DATE: 'Date du changement',
                CREATOR: 'Créateur',
                APPROVER: 'Approbateur',
                EDITOR: 'Editeur',
                TYPE_OF_CHANGE: 'Opération',
                FIELDS_CHANGED: 'Domaines édités',
                VIEWING_CHANGES: 'Affichage changements',
                //LOGIN
                FORGOT: 'Vous avez oublié le mot de passe?',
                CONTINUEAS: 'Voulez-vous continuer comme ',
                LOGOUT: 'Se déconnecter',
                USERNAME: "Nom d'utilisateur",
                REMEMBERME: 'Souviens-toi de moi',
                SIGNIN: 'Connecter',

                //CREATE USER
                PERSONAL_INFO: 'Données D\'Utilisateur',
                PERSONAL_IMG: "Image de l'employé",
                
                OPERATION:'OPÉRATION',
                update: 'réviser',
                //ERRORS
                ERRORMESSAGE2:'Quelque chose ne va pas !',
                ERROR: '404 erreur',
                ERRORMESSAGE: "Pour une raison quelconque vous ne pouvez pas accéder à la page que vous recherchez",
                ERRORLOGIN: "Nom d'utilisateur ou mot de passe invalide",
                ERRORLOGIN1: "Erreur Connexion, s'il vous plaît réessayer plus tard",
                ERRORUSERINFORMATION: "Impossible de récupérer les informations de l'utilisateur",
                ERRORMANAGERINFORMATION: 'Impossible de récupérer les informations des gestionnaires',
                ERRORSESSION: 'Impossible de vérifier la session',
                ERRORCREATEIMAGE: "Image L'ajout d'erreur",
                ERRORRENAMEIMAGE: 'Could not rename image',
                ERRORCREATEPERMISSION: "Impossible de renommer l'image",
                ERRORCREATEEMAIL: 'Email pas valide',
                ERRORCREATEUSER: 'Email déjà utilisé',
                ERRORDELETEUSER:'Aucune utilisateur avec cet e-mail',
                ERRORUPDATEUSEREMAIL:'Aucun tel utilisateur avec cet ID',
                ERRORADMINPASS: 'Mauvais mot de passe Admin',
                ERRORUPDATEPASS: "Impossible de mettre à jour le mot de passe de l'utilisateur",
                ERRORMATCHPASS: "Les mots de passe ne correspondent pas",
                ERRORLESSONSTOP: 'Impossible de récupérer les leçons apprises des informations',
                ERRORSEARCHLL: "Recherche par mot-clé qui n'a rien retourné",
                ERRORLLBYSTATUS: 'Impossible de récupérer les leçons apprises avec cet état',
                ERRORLESSONID: 'Impossible de récupérer Leçon apprise avec cette id',
                ERRORINSERTINGLL: 'Erreur insertion leçon à la base de données',
                ERRORINSERTINGLLFIELDBLANK: 'Erreur insertion leçon à la base de données.',
                ERRORINSERTINGLLFIELDBIG: 'Erreur insertion leçon à la base de données.',
                ERRORUPDATINGLESSONSTATE: "État incorrect! Choisissez l'un des éléments suivants: projet | soumis | approuvé | inactif",
                ERRORPROJECTINFO: 'Impossible de récupérer des informations sur les projets',
                ERRORLLMANAGERID: "Impossible de récupérer les leçons apprises avec l'information que le gestionnaire id",
                ERRORPROJECTMANAGERID: 'Impossible de récupérer des informations sur les projets avec ce gestionnaire id',
                ERRORINSERTINGPROJECTDB: 'Erreur insertion projet base de données',
                ERRORPROJECTID: 'Aucun projet avec cette id',
                ERRORTECHINFO: 'Impossible de récupérer des informations sur les technologies',
                ERRORTECHINFODB: 'Erreur insertion de la technologie de base de données',
                ERRORDELETINGTECHDB: "La technologie de suppression d'erreur",
                ERRORPROJECTTYPEINFO: 'Impossible de récupérer des informations sur les types de projets',
                ERRORINSERTPROJECTTYPEDB: 'Erreur insertion de type à base de données de projet',
                ERRORDELETINGPROJECTTYPE: 'Erreur type de projet de suppression',
                ERRORGETSECTOR: "Impossible de récupérer des informations sur les secteurs d'activité",
                ERRORINSERTSECTORDB: 'Erreur insertion secteur des entreprises à la base de données',
                ERRORDELETSECTOR: "Secteur de la suppression d'erreur",
                ERRORAUDITINFO: "Impossible de récupérer les informations d'audit pour cette leçon",
                ERRORCREATINGUSERDB: 'Erreur insertion utilisateur de base de données',
                ERRORDELETINGUSER: 'Erreur suppression utilisateur de base de données',
                ERRORDELETINGSELF: 'Erreur suppression utilisateur de base de données',
                ERRORDELETEUSERID:'Utilisateur n\'existe pas ou a créé Leçons.',
                DELETEUSERSUCCESS: 'Utilisateur supprimé avec succès.'
            })
        $translateProvider.preferredLanguage('pt');
    }]);


	app.directive('head', ['$rootScope','$compile',
		function($rootScope, $compile){
			return {
				restrict: 'E',
				link: function(scope, elem){
					var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
					elem.append($compile(html)(scope));
					scope.routeStyles = {};
					$rootScope.$on('$routeChangeStart', function (e, next, current) {
						if(current && current.$$route && current.$$route.css){
							if(!angular.isArray(current.$$route.css)){
								current.$$route.css = [current.$$route.css];
							}
							angular.forEach(current.$$route.css, function(sheet){
								delete scope.routeStyles[sheet];
							});
						}
						if(next && next.$$route && next.$$route.css){
							if(!angular.isArray(next.$$route.css)){
								next.$$route.css = [next.$$route.css];
							}
							angular.forEach(next.$$route.css, function(sheet){
								scope.routeStyles[sheet] = sheet;
							});
						}
					});
				}
			};
		}
	]);

}());
