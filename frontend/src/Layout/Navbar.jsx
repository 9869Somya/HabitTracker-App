import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#153448', padding: '4px 20px'}}>
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand" href="#" style={{ color: 'white' }}>Habitiser</a>

                {/* Toggler button for small screens */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar items */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* No items here */}
                    </ul>

                    {/* Right-aligned dropdown for login and registration */}
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                                Account
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ backgroundColor: '#153448' }}>
                                <li><a className="dropdown-item text-white" href="#">Login</a></li>
                                <li><a className="dropdown-item text-white" href="#">Register</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <style jsx>{`
                .dropdown-item:hover {
                    color: #FFEC9E	 !important; /* Change text color on hover */
                    background-color: #153448 !important; /* Keep background color */
                }
            `}</style>
        </nav>
    );
}

export default Navbar;
