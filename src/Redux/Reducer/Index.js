import { combineReducers } from "redux";
import { setUserStatusReducer } from "./tokenReducer"
import { setServiceReducer } from "./servicesReducer";
import { setContacts, setIncomingMesseges, setListeningToThisUser, setMessages } from "./socketReducer";
import { setSocketIo } from "./socketReducer";
import { setServiceUserReducer } from "./Services.User.Id";
import { modalReducer } from "./UserModal";
import { findCurrPageReducer } from "./findCurrentPageReducer";
import { stepperReducer } from "./StepperAction";

export const reducer = combineReducers({

    userStatus         :   setUserStatusReducer,
    services           :   setServiceReducer,
    messeges           :   setIncomingMesseges,
    Socket             :   setSocketIo, 
    userContacts       :   setContacts,
    userListenTo       :   setListeningToThisUser,
    userMessages       :   setMessages,
    servicesUserDetails:   setServiceUserReducer,
    modalConf          :   modalReducer,
    currActivePage     :   findCurrPageReducer,
    activeStep         :   stepperReducer

})