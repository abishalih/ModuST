let initialState = {
    isLogin     : true,
    userInfo    : {
        userID      : '1',
        employeeID  : '999999',
        nickName    : 'Anonym',
        fullName    : 'Anonymous User',
    },
    userPrivillege  : [],
    listMenu        : [],
}

const loginUser = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    // console.log(payload)
    // newState.isLogin = true;
    // newState.listMenu               = payload.data.list_menu;
    // newState.userPrivillege         = payload.data.user_privillege;
    // newState.userInfo.userID        = payload.data.user_id;
    // newState.userInfo.employeeID    = payload.data.employee_id;
    // newState.userInfo.nickName      = payload.data.name;
    // newState.userInfo.fullName      = payload.data.fullname;
    
    newState.isLogin = true;
    newState.listMenu               = [];
    newState.userPrivillege         = [];
    newState.userInfo.userID        = `1`;
    newState.userInfo.employeeID    = `999999`;
    newState.userInfo.nickName      = `Anonym`;
    newState.userInfo.fullName      = `Anonymous User`;
    
    return newState
}

const logoutUser = (state) => {
    let newState = JSON.parse(JSON.stringify(state));
    // newState.isLogin = false;
    // newState.listMenu             = [];
    // newState.userPrivillege       = [];
    // newState.userInfo.userID      = ``;
    // newState.userInfo.employeeID  = ``;
    // newState.userInfo.nickName    = ``;
    // newState.userInfo.fullName    = ``;

    newState.isLogin = true;
    newState.listMenu             = [];
    newState.userPrivillege       = [];
    newState.userInfo.userID      = `1`;
    newState.userInfo.employeeID  = `999999`;
    newState.userInfo.nickName    = `Anonym`;
    newState.userInfo.fullName    = `Anonymous User`;
    
    return newState
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER': return loginUser(state,action.payload);
        case 'LOGOUTUSER': return logoutUser(state);
        default: return state;
    }
}

export default userReducer;