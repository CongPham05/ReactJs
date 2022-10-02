import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import { Alert } from 'reactstrap';


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount = () => {
        this.props.getAllUsersRedux();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.allUsersRedux !== this.props.allUsersRedux) {
            this.setState({
                usersRedux: this.props.allUsersRedux
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }
    handleEditUser = (user) => {
        this.props.handlEditUserFromParent(user);
    }
    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <div className="users-container">
                <div className='title text-cencer'>Manage user with cong pham</div>
                <div className='user-table mt-4 mx-3'>
                    <table id='customers'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td >
                                            <button
                                                className='btn-edit'
                                                onClick={() => { this.handleEditUser(item) }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => { this.handleDeleteUser(item) }}
                                            >
                                                <i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allUsersRedux: state.admin.allUsers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersRedux: () => dispatch(actions.fecthAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
