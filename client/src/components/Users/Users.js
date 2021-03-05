import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.firstname}</td>
        <td>{props.user.lastname}</td>
        <td>{props.user.email}</td>
        <td>{props.user.dob}</td>
        <td>{props.user.description}</td>
        <td>
            <Link to={`/update/${props.user._id}`}>Edit</Link> | <Link to="/view" onClick={() => {props.deleteUser(props.user._id)}}>Delete</Link>
        </td>
    </tr>
)

class Users extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        axios.get('/')
            .then(res => {
                let date = res.data;
                
                date.map((user) => {
                    let d = new Date(user.dob);
                    let dob = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
                    return user.dob = dob
                })
                this.setState({ users: res.data })
            })
    }

    deleteUser = (id) => {
        axios.delete(`/delete/${id}`)

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList = () => {
        return this.state.users.map(userData => {
            // let d = new Date(userData.dob);
            // let dob = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            // console.log(dob)
            return <User user={userData} deleteUser={this.deleteUser} key={userData._id} />
        })
    }

    render() {
        return (
            <div>
                <h1>Users Data</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email Id</th>
                            <th>Date Of Birth</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
                <Link style={{marginTop:'20rem', justifyContent:'center'}} className="btn btn--green btn-animated" to="/create">Create</Link>
            </div>
        )
    }
}

export default Users;