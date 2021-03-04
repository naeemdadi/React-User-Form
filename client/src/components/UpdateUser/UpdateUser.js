import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios';

class UpdateUser extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        dob: new Date(),
        description: ''
    }

    componentDidMount = () => {
        axios.get('/'+ this.props.match.params.id)
            .then(res => {
                this.setState({
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    email: res.data.email,
                    dob: new Date(res.data.dob),
                    description: res.data.description
                })
            })  
    }

    onChangeFirstname = e => {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname = e => {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail = e => {
        this.setState({
            email: e.target.value
        });
    }

    onChangeDob = dob => {
        this.setState({
            dob: dob
        });
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            dob: this.state.dob,
            description: this.state.description
        }

        axios.patch(`/update/${this.props.match.params.id}`, user)

        window.location = '/view';
    }

    render() {
        return (
            <div>
            <h1>Update User</h1>
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label className="form__label">First Name:</label>
                    <input type="text"
                        className="form__input"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}
                        />
                </div>
                
                <div className="form-group">
                    <label className="form__label">Last Name:</label>
                        <input type="text"
                            className="form__input"
                            value={this.state.lastname}
                            onChange={this.onChangeLastname} />
                </div>

                <div className="form-group">
                    <label className="form__label">Email Id:</label>
                    <input type="email"
                        className="form__input"
                        value={this.state.email}
                        onChange={this.onChangeEmail} />
                </div>

                <div className="form-group">
                    <label className="form__label">Date Of Birth:</label>
                    <DatePicker
                        value={this.state.dob}
                        selected={this.state.dob}
                        onChange={this.onChangeDob} />
                </div>

                <div className="form-group">
                    <label className="form__label">Short Description:</label>
                    <textarea required
                        rows="4"
                        className="form__input"
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit User" className="btn--primary btn--green btn--animated" />
                </div>
            </form>
        </div>
    )
}
}

export default UpdateUser;