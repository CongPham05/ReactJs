import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import { Label } from 'reactstrap';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            preImgURL: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
            userEditId: "",

            action: ""
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     console.log(res);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }

        // } catch (e) {
        //     console.log(e);
        // }
        this.props.getPositonStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ""
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositons = this.props.positionRedux;
            this.setState({
                positionArr: arrPositons,
                position: arrPositons && arrPositons.length > 0 ? arrPositons[0].keyMap : ""
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ""
            })
        }

        if (prevProps.allUsersRedux !== this.props.allUsersRedux) {
            let arrRoles = this.props.roleRedux;
            let arrPositons = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;

            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
                position: arrPositons && arrPositons.length > 0 ? arrPositons[0].keyMap : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                preImgURL: "",
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangImg = async (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let UrlImg = URL.createObjectURL(file);
            this.setState({
                preImgURL: UrlImg,
                avatar: base64
            })
        }
    }
    openPreImg = () => {
        if (!this.state.preImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    onChangeInput = (e, id) => {
        let copytState = { ...this.state };
        copytState[id] = e.target.value;
        this.setState(
            { ...copytState }
        )

    }
    validateInput = () => {
        let isValid = true;
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("Nay anh ban chua nhap " + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.validateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phonenumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phonenumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,


            });
        }


    }
    handlEditUserFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }


        this.setState({
            userEditId: user.id,
            email: user.email,
            password: "user.password",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",
            preImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })

    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar }
            = this.state;
        // console.log('check props from redux :', this.state);


        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>
                        LEARN REACT - REDUX VS HOI DAN IT
                    </div>

                    <div>{isLoadingGender === true ? 'Loading gender' : ''}</div>

                    <div className="user-redux-body" >
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'><FormattedMessage id='menu.manage-user.add' /></div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.email' /></label>
                                    <input
                                        className='form-control'
                                        type='email'
                                        value={email}
                                        onChange={(e) => { this.onChangeInput(e, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.pass-word' /></label>
                                    <input
                                        className='form-control'
                                        type='password'
                                        value={password}
                                        onChange={(e) => { this.onChangeInput(e, 'password') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.first-name' /></label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={firstName}
                                        onChange={(e) => { this.onChangeInput(e, "firstName") }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.last-name' /></label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={lastName}
                                        onChange={(e) => { this.onChangeInput(e, "lastName") }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.phone-number' /></label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={phoneNumber}
                                        onChange={(e) => { this.onChangeInput(e, "phoneNumber") }}
                                    />
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id='menu.manage-user.address' /></label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={address}
                                        onChange={(e) => { this.onChangeInput(e, "address") }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.gender' /></label>
                                    <select className='form-control'
                                        onChange={(e) => { this.onChangeInput(e, "gender") }}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}

                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.position' /></label>
                                    <select className='form-control'
                                        onChange={(e) => { this.onChangeInput(e, "position") }}
                                        value={position}

                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index} value={item.keyMap} >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.roleid' /></label>
                                    <select className='form-control'
                                        onChange={(e) => { this.onChangeInput(e, "role") }}
                                        value={role}


                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label htmlFor='avatar'><FormattedMessage id='menu.manage-user.image' /></label>
                                    <div className='pre-img-container'>
                                        <input
                                            type='file'
                                            id='previewImg'
                                            hidden
                                            onChange={(e) => this.handleOnChangImg(e)}
                                        />
                                        <label htmlFor='previewImg' className='label-upload'>Tai anh <i className="fas fa-upload"></i> </label>
                                        <div
                                            style={{ backgroundImage: `url(${this.state.preImgURL})` }}
                                            className='preview_img'
                                            onClick={() => this.openPreImg()}
                                        >

                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 my-3'>
                                    <button
                                        className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                        onClick={() => { this.handleSaveUser() }}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT
                                            ? <FormattedMessage id='menu.manage-user.edit' />
                                            : <FormattedMessage id='menu.manage-user.save' />}
                                    </button>
                                </div>
                                <div className='col-12 mb-10'>
                                    <TableManageUser
                                        handlEditUserFromParent={this.handlEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.preImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </>


        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        allUsersRedux: state.admin.allUsers,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getAllUsersRedux: () => dispatch(actions.fecthAllUsersStart()),
        editUser: (data) => dispatch(actions.editUser(data)),

        // processLogout:
        //     () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:
        //     (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
