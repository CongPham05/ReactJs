import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService,
    getAllDoctors

} from "../../services/userService";

import { toast } from 'react-toastify';



// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getAction) => {
        try {

            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));

            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e);

        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionStart = () => {
    return async (dispatch, getAction) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));

            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e);

        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleStart = () => {
    return async (dispatch, getAction) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));

            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e);

        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log("check user redux : ", res)
            if (res && res.errCode === 0) {
                dispatch(createNewUserSuccess());
                dispatch(fecthAllUsersStart());
                toast.info("Ban Them nguoi dung Thanh cong !");
            }
            else {
                dispatch(createNewUserFailed())

            }
        } catch (e) {
            dispatch(createNewUserFailed())
            console.log("create New User Failed", e)
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS
})
export const createNewUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})


export const fecthAllUsersStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fecthAllUsersSuccess(res.users.reverse()))
            }
            else {
                dispatch(fecthAllUsersFailed())

            }
        } catch (e) {
            dispatch(fecthAllUsersFailed())
            console.log("Lay Data All User Failed", e)
        }
    }
}
export const fecthAllUsersSuccess = (dataAllUserRedux) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: dataAllUserRedux
})
export const fecthAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fecthAllUsersStart());
                toast.error("Ban da xoa Thanh cong !")
            }
            else {
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log("create New User Failed", e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fecthAllUsersStart());
                toast.success("Ban da Edit Thanh cong !")
            }
            else {
                dispatch(editUserFailed());
                toast.error("Edit User Failed")
            }
        } catch (e) {
            dispatch(editUserFailed());
            toast.error("Edit User Failed")
            console.log("Edit User Failed", e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fecthTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("");

            if (res && res.errCode === 0) {
                dispatch(fecthTopDoctorSuccess(res.data))
            }
            else {
                dispatch(fecthTopDoctorFailed());
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTORS_FAILED", e)
            dispatch(fecthTopDoctorFailed());
        }
    }
}

export const fecthTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctor: data,
})
export const fecthTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})

export const fecthAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDt: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTORS_FAILED", e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            });
        }
    }
}
