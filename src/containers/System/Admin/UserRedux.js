import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import { Label } from 'reactstrap';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            preImgURL: "",
            isOpen: false,
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
            this.setState({
                genderArr: this.props.genderRedux,
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            })
        }
    }

    handleOnChangImg = (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let UrlImg = URL.createObjectURL(file);
            this.setState({
                preImgURL: UrlImg,
            })
        }
    }
    openPreImg = () => {
        if (!this.state.preImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    render() {
        let gender = this.state.genderArr;
        let position = this.state.positionArr;
        let role = this.state.roleArr;

        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        console.log('check props from redux :', this.state);


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
                                    <input className='form-control' type='email' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.pass-word' /></label>
                                    <input className='form-control' type='password' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.first-name' /></label>
                                    <input className='form-control' type='text' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.last-name' /></label>
                                    <input className='form-control' type='text' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.phone-number' /></label>
                                    <input className='form-control' type='text' />
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id='menu.manage-user.address' /></label>
                                    <input className='form-control' type='text' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.gender' /></label>
                                    <select className='form-control'>
                                        {gender && gender.length > 0 &&
                                            gender.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}

                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.position' /></label>
                                    <select className='form-control'>
                                        {position && position.length > 0 &&
                                            position.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='menu.manage-user.roleid' /></label>
                                    <select className='form-control'>
                                        {role && role.length > 0 &&
                                            role.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}>
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
                                <div className='col-12'>
                                    <button className='btn btn-primary'><FormattedMessage id='menu.manage-user.save' /></button>
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


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        // processLogout:
        //     () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:
        //     (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
