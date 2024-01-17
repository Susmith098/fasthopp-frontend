export const initialstate = {
    // usertoken for user and manager
    usertoken: {
        access: null,
        refresh: null,
        is_authenticated: false,
        registerSuccess: null,
        user:{},

        
    },
    //inidividual user data
    userData: null,
    isLoading: false,

    // user and manager collect and store all user data here
    users: [],
    allboards: [],
    columns: [],
    
    //  cards and assignee data
    cardData: {
        cards: [],
        assignee: [],
        comments: [],

    },

    meetingData: [],

    // personal and public notifications
    notifications: {
        broadcast: [],
    },
}