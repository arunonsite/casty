export default{
    'API_ROUTE' : {
    "MAIN_SITE" : 'https://casty.azurewebsites.net/'
    },
    'API_PATH' : {
         
         "LOGIN_ROUTE" :"api/Users/Login",
         "GET_USER_LIST_BYCOMPANY_ROUTE" :"/api/Users/ByCompany/",

         "SUPER_USER_LIST" :"/api/Users/SkipTake/",
         "USER_UPDATE" : '/api/Users/Update',

         "SHOW_LIST" : 'api/Shows/CreatedByUserId/',
         "SHOW_LIST_COMPANY" : 'api/Shows/ByCompany/',
         
         "SHOW_SAVE" : '/api/Shows/New/',
         "SHOW_UPDATE" : 'api/Shows/Update/',
         "SHOW_DELETE" : 'api/Shows/Delete/',
         "SHOW_LOAD_COMPANIES" : '/api/Companies/GetById/',
         "SHOW_SUPER_LOAD_COMPANIES" : '/api/Companies/Full/',
         "SHOW_ADMIN_LOAD_CHANNEL" : '/api/Channels/ByCompany/',

    
         "CHANNEL_LIST" : 'api/Channels/CreatedByUserId/',
         "SUPER_CHANNEL_LIST" : 'api/Channels/', ///api/Channels/{SearchCriteria}/SkipTake/{Skip}/{Take}
         "CHANNEL_SAVE" : 'api/Channels/New/',
         "CHANNEL_UPDATE" : 'api/Channels/Update/',
         "CHANNEL_DELETE" : 'api/Channels/Delete/',         
         "LOAD_CHANNEL_BY_USER" : 'api/Channels/CreatedByUserId/',
         "CHANNEL_LOAD_COMPANIES" : '/api/Companies/GetById/',

         "USER_SAVE" : '/api/Users/Register/',

         "COMPANY_LIST" : 'api/Companies/Full',
         "COMPANY_SAVE" : 'api/Companies/New/', 
         "COMPANY_UPDATE" : 'api/Companies/Update/',
         "COMPANY_DELETE" : 'api/Companies/Delete/',

         "EPISODE_LIST" : '/api/Episodes/',
         "EPISODE_SAVE" : 'api/Episodes/New/', 
         "EPISODE_UPDATE" : 'api/Episodes/Update/',
         "EPISODE_DELETE" : 'api/Episodes/Delete/',



         "DEPARTMENT_SAVE" : '/api/Departments/New',
         "DEPARTMENT_UPDATE" : '/api/Departments/Update',
         "DEPARTMENT_DELETE" : '/api/Departments/Delete',
         "DEPARTMENT_LIST" : '/api/Departments/',
         

         
        }
}