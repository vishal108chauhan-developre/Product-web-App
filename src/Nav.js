import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logoutmethod = () => {
        localStorage.clear();
        navigate('/SignUp');
    };

    return (
        <div className="nav_Header">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className="App-logo"
            />

            {
                auth ? (
                    <ul className="nav-ul">
                        <li><Link to="/">Product</Link></li>
                        <li><Link to="/Add">Add Product</Link></li>
                        <li><Link to="/Update">Update Product</Link></li>
                        <li><Link to="/Profile">Profile</Link></li>
                        <li><Link onClick={logoutmethod} to="/SignUp">LogOut ({JSON.parse(auth).name})</Link></li>
                    </ul>
                ) : (
                    <div className="nav-right">
                        <Link to="/SignUp">SignUp</Link>
                        <Link to="/Login">Login</Link>
                    </div>
                )
            }
        </div>
    );
}

export default Nav;
