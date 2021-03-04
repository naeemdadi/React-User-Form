import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserForm extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        dob: new Date(),
        description: ''
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

        axios.post('https://naeem-react-form.herokuapp.com/create', user)

        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            dob: '',
            description: ''
        })
    }

    render() {
        return (
        <div>
            <h1 className="heading-primary">Log New User</h1>
            <form onSubmit={this.onSubmit}>

                <div className="form__group">
                    <label className="form__label">First Name:</label>
                    <input type="text"
                    className="form__input"
                        required
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}/>
                </div>
                
                <div className="form__group">
                    <label className="form__label">Last Name:</label>
                        <input type="text"
                            className="form__input"
                            required
                            value={this.state.lastname}
                            onChange={this.onChangeLastname} />
                </div>

                <div className="form__group">
                    <label className="form__label">Email Id:</label>
                    <input type="email"
                        required
                        className="form__input"
                        value={this.state.email}
                        onChange={this.onChangeEmail} />
                </div>

                <div className="form__group">
                    <label className="form__label">Date Of Birth:</label>
                    <DatePicker
                        value={this.state.dob}
                        selected={this.state.dob}
                        onChange={this.onChangeDob} />
                </div>

                <div className="form__group">
                    <label className="form__label">Short Description:</label>
                    <textarea required
                        rows="4"
                        className="form__input"
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                </div>

                <div className="form__group form-create-btn">
                    <input type="submit" value="Log User" className="btn--primary btn--green btn--animated" />
                    <Link to='/view' className="btn--primary btn--white btn-animated">View</Link>
                </div>
            </form>
        </div>
    )
}
}

export default UserForm;