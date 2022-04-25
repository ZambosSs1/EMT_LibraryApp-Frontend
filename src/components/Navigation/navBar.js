import React from "react";

const navBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex w-75 justify-content-between">
                <a className="navbar-brand" href="/">Home</a>
                <div id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/books">Books</a>
                        <a className="nav-link" href="/categories">Categories</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default navBar;