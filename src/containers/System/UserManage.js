import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[]
        }
     }
 
    async componentDidMount() {
        let response = await getAllUsers('ALL');
      
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    render() {

        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return (
            <div className="users-container">
                <div className='title text-cencer'>
                    Manage user with cong pham
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
                            
                                 {arrUsers && arrUsers.map((arrUser,index) => {
                                    return (
                                        <tr>
                                            <td key={arrUser.id}>{arrUser.email}</td>
                                            <td key={arrUser.id}>{arrUser.firstName}</td>
                                            <td key={arrUser.id}>{arrUser.lastName}</td>
                                             <td key={arrUser.id}>{arrUser.address}</td>
                                             <td >
                                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                        )                                              
                                })}       
                            </tbody>
                    </table>
                    
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
