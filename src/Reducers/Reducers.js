import { APP_REFRESH, ID, NOTIFICATION_STORE, PROFILE_IMAGE, TASKDETAILS, UPCOMING_TASK_DATE } from "../actions/ActionTypes";

let Initialstate = {
    TaskDetailsArr:[],
    id : 0,
    upcoming_task_date : '', 
    profile_image : '',
    App_Refresh : true,
    Notifications:[],
};
const Reducers = (state = Initialstate, action ) => {
    console.log('Inside Recucer Fn');
    switch(action.type)
    { 
        
        case TASKDETAILS : 
        return {
            ...state,
            TaskDetailsArr: action.value,
        }
        case ID : 
        return {
            ...state,
            id: action.value,
        }
        case UPCOMING_TASK_DATE :
        return {
            ...state,
            upcoming_task_date : action.value,
        }
        case PROFILE_IMAGE : 
        return {
            ...state,
            profile_image: action.value,
        }
        case APP_REFRESH : 
        return {
            ...state,
            App_Refresh : !state.App_Refresh,
        }
        case NOTIFICATION_STORE : 
        return {
            ...state,
            Notifications : action.value,
        }
        default:
            return state;
    }
    
}
export default Reducers;