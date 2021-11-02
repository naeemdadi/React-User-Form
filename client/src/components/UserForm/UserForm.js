import React, { useState } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const UserForm = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    dob: new Date(),
    description: "",
  };

  const [state, setState] = useState(initialState);
  const history = useHistory();

  const onChange = (input) => (e) => {
    setState({
      ...state,
      [input]: e.target.value,
    });
  };

  const onChangeDob = (dob) => {
    setState({
      ...state,
      dob: dob,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/create", state);
      if (res.data) {
        setState({
          firstname: "",
          lastname: "",
          email: "",
          dob: "",
          description: "",
        });
        history.push("/view");
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.err);
    }
  };

  return (
    <div>
      <h1 className="heading-primary">Log New User</h1>
      <form onSubmit={onSubmit}>
        <div className="form__group">
          <label className="form__label">First Name:</label>
          <input
            type="text"
            className="form__input"
            required
            value={state.firstname}
            onChange={onChange("firstname")}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Last Name:</label>
          <input
            type="text"
            className="form__input"
            required
            value={state.lastname}
            onChange={onChange("lastname")}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Email Id:</label>
          <input
            type="email"
            required
            className="form__input"
            value={state.email}
            onChange={onChange("email")}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Date Of Birth:</label>
          <DatePicker
            value={state.dob}
            selected={state.dob}
            onChange={onChangeDob}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Short Description:</label>
          <textarea
            required
            rows="4"
            className="form__input"
            value={state.description}
            onChange={onChange("description")}
          />
        </div>

        <div className="form__group form-create-btn">
          <input
            type="submit"
            value="Log User"
            className="btn--primary btn--green btn--animated"
          />
          <Link to="/view" className="btn--primary btn--white btn-animated">
            View
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
