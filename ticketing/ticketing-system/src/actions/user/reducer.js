const user = {};

user.loginUser = (data) => ({
    type: 'LOGINUSER',
    payload: data
});
user.registerUser = (data) => ({
    type: 'REGISTERUSER',
    payload: data
});
user.logoutUser = () => ({
    type: 'LOGOUTUSER',
});

export default user;