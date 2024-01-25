import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <Link to="/tasks" className="first-title">to do</Link>
        </div>
    );
};

export default Home;

