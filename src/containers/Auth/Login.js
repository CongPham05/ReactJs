import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeInput = (e) => {
        this.setState({
            username: e.target.value
        })

    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })

    }
    handleLogin = async () => {
        this.setState({ errMessage: '' })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({ errMessage: data.message })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('Login succes')
            }
        }
        catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({ errMessage: e.response.data.message })
                }
            }
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handlerKeyDown = (e) => {
        if (e.keyCode == 13 || e.key === "Enter") {
            this.handleLogin();
        }
    }
    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>LOGIN</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName:</label>
                            <input placeholder='Name'
                                type='text'
                                className='form-control'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeInput(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>PassWord:</label>
                            <div className='custom-input-password' >
                                <input
                                    placeholder='Password'
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    onKeyDown={(e) => this.handlerKeyDown(e)}
                                />

                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? "far fa-eye-slash" : "far fa-eye"}></i>
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 mt-3'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password</span>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span className='text-other-login '> Or Login with:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
