export default{
    'API_ROUTE' : {
    "MAIN_SITE" : 'https://casty.azurewebsites.net/'
    },
    'API_PATH' : {
         
         "LOGIN_ROUTE" :"api/Users/Login",
         "GET_USER_LIST_BYCOMPANY_ROUTE" :"/api/Users/ByCompany/",

         "SUPER_USER_LIST" :"/api/Users/SkipTake/",

         "SHOW_LIST" : 'api/Shows/CreatedByUserId/',
         "SHOW_LIST_COMPANY" : 'api/Shows/ByCompany/',
         
         "SHOW_SAVE" : '/api/Shows/New/',
         "SHOW_UPDATE" : 'api/Shows/Update/',
         "SHOW_DELETE" : 'api/Shows/Delete/',
         "SHOW_LOAD_COMPANIES" : '/api/Companies/GetById/',
         "SHOW_SUPER_LOAD_COMPANIES" : '/api/Companies/Full/',
         "SHOW_LOAD_CHANNEL" : 'api/Channels/CreatedBy/',


         "CHANNEL_LIST" : 'api/Channels/CreatedByUserId/',
         "SUPER_CHANNEL_LIST" : 'api/Channels/', ///api/Channels/{SearchCriteria}/SkipTake/{Skip}/{Take}
         "CHANNEL_SAVE" : 'api/Channels/New/',
         "CHANNEL_UPDATE" : 'api/Channels/Update/',
         "CHANNEL_DELETE" : 'api/Channels/Delete/',         
         "LOAD_CHANNEL_BY_USER" : 'api/Channels/CreatedByUserId/',

         "USER_SAVE" : '/api/Users/Register/',

         "COMPANY_LIST" : 'api/Companies/Full',
         "COMPANY_SAVE" : 'api/Companies/New/', 
         "COMPANY_UPDATE" : 'api/Companies/Update/',
         "COMPANY_DELETE" : 'api/Companies/Delete/',

         "EPISODE_LIST" : '/api/Episodes/',
         "EPISODE_SAVE" : 'api/Episodes/New/', 
         "EPISODE_UPDATE" : 'api/Episodes/Update/',
         "EPISODE_DELETE" : 'api/Episodes/Delete/',


         
        }
}