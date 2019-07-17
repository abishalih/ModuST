import axios from 'axios';
import userReducer from './reducer';

const userApi = {};

let payload = {}
userApi.loginUser = (req,success,failed) => {
    payload.employee_id  = req.employeeID;
    payload.password    = req.password;
    
    return (dispatch) => {
        axios.post(`http://api-ticketing.com/api-modust/user/auth`, payload)
            .then(res => {
                axios.get(`http://api-ticketing.com/api-modust/user/list_menu/user/`+ res.data.user_id)
                    .then(resUser => {
                        let menu = resUser.data.map((data)=>{
                            return {
                                name:data.menu, 
                                link:data.link,
                            }
                        })
                        res.data.list_menu = menu;
                        axios.get(`http://api-ticketing.com/api-modust/user/list_privillege/user/`+ res.data.user_id)
                            .then(resPrivillege => {
                                let privillege = resPrivillege.data.map((data)=>{
                                    return data
                                })
                                res.data.user_privillege = privillege;
                                dispatch(userReducer.loginUser(res));
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
            
    }
}
userApi.logoutUser = (success,failed) => {
    return (dispatch) => {
        dispatch(userReducer.logoutUser());
    }
}

userApi.registerUser = (req,success,failed) => {
    payload.employee_id = req.employee_id
    payload.nickname    = req.nickname
    payload.fullname    = req.fullname
    payload.company     = req.company
    payload.branch      = req.branch
    payload.department  = req.department
    payload.division    = req.division

    return (dispatch) => {
        axios.post(`http://api-ticketing.com/api-modust/user/register`,payload)
            .then(res => {
                dispatch(userReducer.registerUser(res.data));
            })
            .catch(err => {
                console.log(err)
            });
    }
}

export default userApi;