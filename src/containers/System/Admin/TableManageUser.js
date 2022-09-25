import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'


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
    render() {
        let arrUsers = this.state.usersRedux;
        console.log("Check all users redux", arrUsers)

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
                            {arrUsers && arrUsers.length > 0 && arrUsers.map((arrUser, index) => {
                                return (
                                    <tr key={arrUser.id}>
                                        <td>{arrUser.email}</td>
                                        <td>{arrUser.firstName}</td>
                                        <td>{arrUser.lastName}</td>
                                        <td>{arrUser.address}</td>
                                        <td >
                                            <button className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => { this.handleDeleteUser(arrUser) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser
);
