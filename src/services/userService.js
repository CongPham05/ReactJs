import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)

}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get("/api/get-all-doctor")
}
const postInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}
const getDetailInforDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-doctor-by-id?doctorId=${doctorId}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post('api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post('/api/pattient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get('/api/get-specialty')
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    postInforDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById
}