import { APP_REFRESH, ID, NOTIFICATION_STORE, PROFILE_IMAGE, TASKDETAILS, UPCOMING_TASK_DATE } from "./ActionTypes"

export const taskDetails = (payload) =>
{
    return{
        type : TASKDETAILS,
        value : payload,
    }
}
export const taskID = (payload) =>
{
    return{
        type : ID,
        value : payload,
    }
}
export const upcomingTaskDate = (payload) =>
{
    return{
        type : UPCOMING_TASK_DATE,
        value : payload,
    }
}
export const profileImage = (payload) =>
{
    return{
        type : PROFILE_IMAGE,
        value : payload,
    }
}
export const appRefresh = (payload) =>
{
    return{
        type : APP_REFRESH,
    }
}
export const notificationStore = (payload) =>
{
    return{
        type : NOTIFICATION_STORE,
        value : payload,
    }
}