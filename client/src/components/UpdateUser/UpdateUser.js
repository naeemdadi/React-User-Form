import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import axios from "axios";

// class UpdateUser extends Component {
//     state = {
//         firstname: '',
//         lastname: '',
//         email: '',
//         dob: new Date(),
//         description: ''
//     }

//     componentDidMount = () => {
//         axios.get('/'+ this.props.match.params.id)
//             .then(res => {
//                 this.setState({
//                     firstname: res.data.firstname,
//                     lastname: res.data.lastname,
//                     email: res.data.email,
//                     dob: new Date(res.data.dob),
//                     description: res.data.description
//                 })
//             })
//     }

//     onChangeFirstname = e => {
//         this.setState({
//             firstname: e.target.value
//         });
//     }

//     onChangeLastname = e => {
//         this.setState({
//             lastname: e.target.value
//         });
//     }

//     onChangeEmail = e => {
//         this.setState({
//             email: e.target.value
//         });
//     }

//     onChangeDob = dob => {
//         this.setState({
//             dob: dob
//         });
//     }

//     onChangeDescription = e => {
//         this.setState({
//             description: e.target.value
//         });
//     }

//     onSubmit = e => {
//         e.preventDefault();

//         const user = {
//             firstname: this.state.firstname,
//             lastname: this.state.lastname,
//             email: this.state.email,
//             dob: this.state.dob,
//             description: this.state.description
//         }

//         axios.patch(`/update/${this.props.match.params.id}`, user)
//     }

//     render() {
//         return (
//             <div>
//             <h1>Update User</h1>
//             <form onSubmit={this.onSubmit}>

//                 <div className="form-group">
//                     <label className="form__label">First Name:</label>
//                     <input type="text"
//                         className="form__input"
//                         value={this.state.firstname}
//                         onChange={this.onChangeFirstname}
//                         />
//                 </div>

//                 <div className="form-group">
//                     <label className="form__label">Last Name:</label>
//                         <input type="text"
//                             className="form__input"
//                             value={this.state.lastname}
//                             onChange={this.onChangeLastname} />
//                 </div>

//                 <div className="form-group">
//                     <label className="form__label">Email Id:</label>
//                     <input type="email"
//                         className="form__input"
//                         value={this.state.email}
//                         onChange={this.onChangeEmail} />
//                 </div>

//                 <div className="form-group">
//                     <label className="form__label">Date Of Birth:</label>
//                     <DatePicker
//                         value={this.state.dob}
//                         selected={this.state.dob}
//                         onChange={this.onChangeDob} />
//                 </div>

//                 <div className="form-group">
//                     <label className="form__label">Short Description:</label>
//                     <textarea required
//                         rows="4"
//                         className="form__input"
//                         value={this.state.description}
//                         onChange={this.onChangeDescription} />
//                 </div>

//                 <div className="form-group form-create-btn">
//                     <input type="submit" value="Edit User" className="btn--primary btn--green btn--animated" />
//                     <Link to='/view' className="btn--primary btn--white btn-animated">View</Link>
//                 </div>
//             </form>
//         </div>
//     )
// }
// }

// export default UpdateUser;

const UpdateUser = (props) => {
  let initialState = {
    firstname: "",
    lastname: "",
    email: "",
    dob: new Date(),
    description: "",
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    let mounted = true;
    axios.get("/" + props.match.params.id).then((res) => {
      if (mounted) {
        setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          dob: new Date(res.data.dob),
          description: res.data.description,
        });
      }
    });
    return () => {
      mounted = false;
    };
  }, [props]);

  const onChange = (input) => (e) => {
    setState({
      [input]: e.target.value,
    });
  };

  const onChangeDob = (dob) => {
    setState({
      dob: dob,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.patch(`/update/${props.match.params.id}`, state);
    if (res.data) {
      props.history.push("/view");
    }
  };
  return (
    <div>
      <h1>Update User</h1>{" "}
      <form onSubmit={onSubmit}>
        {" "}
        <div className="form-group">
          <label className="form__label">First Name:</label>{" "}
          <input
            type="text"
            className="form__input"
            value={state.firstname}
            onChange={onChange("firstname")}
          />
        </div>
        <div className="form-group">
          <label className="form__label">Last Name:</label>
          <input
            type="text"
            className="form__input"
            value={state.lastname}
            onChange={onChange("lastname")}
          />
        </div>
        <div className="form-group">
          <label className="form__label">Email Id:</label>
          <input
            type="email"
            className="form__input"
            value={state.email}
            onChange={onChange("email")}
          />
        </div>
        <div className="form-group">
          <label className="form__label">Date Of Birth:</label>
          <DatePicker value={state.dob} onChange={onChangeDob} />
        </div>
        <div className="form-group">
          <label className="form__label">Short Description:</label>
          <textarea
            required
            rows="4"
            className="form__input"
            value={state.description}
            onChange={onChange("description")}
          />
        </div>
        <div className="form-group form-create-btn">
          <input
            type="submit"
            value="Edit User"
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

export default UpdateUser;
