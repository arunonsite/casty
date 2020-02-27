export default{
    'API_ROUTE' : {
    "MAIN_SITE" : 'https://casty.azurewebsites.net/'
    },
    'API_PATH' : {
         
         "LOGIN_ROUTE" :"api/Users/Login",
         "GET_USER_LIST_BYCOMPANY_ROUTE" :"/api/Users/ByCompany/",

         "SHOW_LIST" : 'api/Shows/CreatedByUserId/',
         "SHOW_SAVE" : '/api/Shows/New/',
         "SHOW_UPDATE" : 'api/Shows/Update/',
         "SHOW_DELETE" : 'api/Shows/Delete/',


         "CHANNEL_LIST" : 'api/Channels/CreatedByUserId/',
         "CHANNEL_SAVE" : 'api/Channels/New/',
         "CHANNEL_UPDATE" : 'api/Channels/Update/',
         "CHANNEL_DELETE" : 'api/Channels/Delete/',

         
         "LOAD_CHANNEL_BY_USER" : 'api/Channels/CreatedByUserId/',

         "USER_SAVE" : '/api/Users/Register/',

         
        }
}