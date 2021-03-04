import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1 className="heading-primary">User List App</h1>
        <Link className="btn btn--green btn-animated" to="/create">Create</Link>
        <Link className="btn btn--white btn-animated" to="/view">View</Link>
    </div>
)

export default Home;