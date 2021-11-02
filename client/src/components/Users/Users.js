import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const User = (props) => {
  return (
    <tr>
      <td>{props.user.firstname}</td>
      <td>{props.user.lastname}</td>
      <td>{props.user.email}</td>
      <td>{props.user.dob}</td>
      <td>{props.user.description}</td>
      <td>
        <Link to={`/update/${props.user._id}`}>Edit</Link> |{" "}
        <button onClick={() => props.deleteUser(props.user._id)}>Delete</button>
      </td>
    </tr>
  );
};

// class Users extends Component {

//     state = {
//         users: []
//     }

//     componentDidMount = () => {
//         axios.get('/')
//             .then(res => {
//                 let date = res.data;

//                 date.map((user) => {
//                     let d = new Date(user.dob);
//                     let dob = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
//                     return user.dob = dob
//                 })
//                 this.setState({ users: res.data })
//             })
//     }

//     deleteUser = (id) => {
//         axios.delete(`/delete/${id}`)

//         this.setState({
//             users: this.state.users.filter(el => el._id !== id)
//         })
//     }

//     userList = () => {
//         return this.state.users.map(userData => {
//             // let d = new Date(userData.dob);
//             // let dob = new Date(d.getFullYear(), d.getMonth(), d.getDate());
//             // console.log(dob)
//             return <User user={userData} deleteUser={this.deleteUser} key={userData._id} />
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Users Data</h1>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Firstname</th>
//                             <th>Lastname</th>
//                             <th>Email Id</th>
//                             <th>Date Of Birth</th>
//                             <th>Description</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         { this.userList() }
//                     </tbody>
//                 </table>
//                 <Link style={{marginTop:'20rem', justifyContent:'center'}} className="btn btn--green btn-animated" to="/create">Create</Link>
//             </div>
//         )
//     }
// }

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const getUsers = async () => {
      await axios.get("/").then((res) => {
        let date = res.data;

        date.map((user) => {
          let d = new Date(user.dob);
          let dob = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
          return (user.dob = dob);
        });
        if (mounted) {
          setUsers(res.data);
          setLoading(false);
        }
      });
    };
    getUsers();
    return () => {
      mounted = false;
    };
  }, []);

  const userList = () => {
    return users.map((userData) => {
      return (
        <User user={userData} deleteUser={deleteUser} key={userData._id} />
      );
    });
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/delete/${id}`);
      if (res.data) {
        setUsers(users.filter((el) => el._id !== id));
      }
    } catch (err) {
      console.log(err.repsonse);
    }
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : users.length === 0 ? (
    <>
      <h2>Add Users</h2>
      <button onClick={() => history.push("/create")}>Create</button>
    </>
  ) : (
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
      <Link
        style={{ marginTop: "20rem", justifyContent: "center" }}
        className="btn btn--green btn-animated"
        to="/create"
      >
        Create
      </Link>
    </div>
  );
};

export default Users;
