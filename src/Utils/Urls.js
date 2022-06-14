// ========================= BASE URL =========================

// DJANGO
export const BASE_URL = "https://mygadgests.live/"

// CHAT SERVER
export const CHAT_SERVER_URL = "https://sample.mygadgests.live/"

// ========================= BASE URL=========================





// ======================== BACKEND SERVER URLS ===========================


// Refresh token url if token is expired
export const REFRESH_TOKEN_URL = "/accounts/token/refresh/"


// Login url for user 
export const LOGIN_URL = "/accounts/token/"


// Signup url of the user
export const SIGNUP_URL = "/accounts/signup/"


// Logout url of the user
export const LOGOUT_URL = "/accounts/logout/"


// Fetch all the services
export const FETCH_SERVICES_URL = "/services/list_service/"


// Get all the of service details
export const GET_SERVICE_URL = "/services/service/"

// CRUD services
export const CRUD_SERVICES = "services/"


export const FETCH_SERVICES_OF_SELLER_URL = "/services/"

// Get the package deatils of the selected service
export const GET_PACKAGES_OF_SERVICE_URL = "/services/scope_and_price/?service_id="


// Get the all the  users have contact with the current user
export const GET_USERS_IN_CONTACT_URL = "/chat/contacts"


// Get all the users details
export const GET_USER_DETAILS_URL = "/accounts/users/"


// get servicess of the seller
export const SERVICES_OF_THE_SELLER_URL = "/services/"


// get conversation id of the chat
export const GET_OR_CREATE_CONVERSATION_ID_URL = "/chat/"


// create seller
export const CRUD_SELLER_URL = "/seller/seller/"

// get subcategory
export const GET_SUBCATEGORY_URL = "subcategory/"

// ======================== BACKEND SERVER URLS ENDS ===========================




// ======================== CHAT SERVER URLS ===========================

// Get chats using the sender and reciever id
export const GET_MESSAGES_URL = CHAT_SERVER_URL + "/messages"


// Send messeges
export const SEND_MESSAGES_URL = CHAT_SERVER_URL + "/send_messages"


// message at first time
export const ESTABLISH_CONNECTION = CHAT_SERVER_URL + "/establish_connection"


// ======================== CHAT SERVER URLS ENDS ===========================











