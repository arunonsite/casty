import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import { Redirect } from "react-router-dom";



import { routes, PrivateRoute } from '../routes';


const NavMenuContent = (props) => {
    const loggedInUser = getLoggedInUser();
    const { roles = [] } = loggedInUser;

    console
        .log("role--Current -", loggedInUser);
    // const role ='SuperAdmin';
    const dahs = {
        path: "/",
        exact: true,
        component: () => <Redirect to="/dashboard" />,
        route: PrivateRoute
    };
    const comapn = {
        path: "/",
        exact: true,
        component: () => <Redirect to="/company" />,
        route: PrivateRoute
    };
    const usesrs = {
        path: "/",
        exact: true,
        component: () => <Redirect to="/users" />,
        route: PrivateRoute
    };
    const dashROles = 'SuperAdmin';
    let customRoutes = routes;
    if (roles && roles.indexOf(dashROles) === -1) {
        // role not authorised so redirect to home page
        //customRoutes.push(dahs);
        customRoutes.push(comapn);
    } else {
        customRoutes.push(usesrs);


    }



    const onMenuClickCallback = props.onMenuClickCallback;
    let allowedRoutes = [];
    Object.keys(customRoutes).map((ind) => {
        if (customRoutes[ind].roles !== undefined && customRoutes[ind].path !== '/episodes/:id') {
            customRoutes[ind].roles.reduce((acc, role) => {
                if (roles && roles.indexOf(role) !== -1) {                                              // role not authorised so redirect to home page

                    allowedRoutes.push(customRoutes[ind]);

                }
            }, []);
        }

    });

    return <React.Fragment>
       {/* <ul className="navigation-menu">
            {allowedRoutes.map((menu) =>
                <li>
                    <Link to={menu.path} className="waves-effect has-dropdown"
                        aria-expanded="true">
                        <i className={menu.icon}></i>
                        <span> {menu.name} </span>
                    </Link></li>
            )}
        </ul> */}
    </React.Fragment>
}


class Navbar extends Component {
    constructor(props) {
        super(props);
    }

   

    /**
     * On menu clicked event
     * @param {*} event 
     */
    onMenuClick(event) {
        event.preventDefault();
        const nextEl = event.target.nextSibling;
        if (nextEl && !nextEl.classList.contains('open')) {
            const parentEl = event.target.parentNode;
            if (parentEl) { parentEl.classList.remove('open'); }

            nextEl.classList.add('open');
        } else if (nextEl) { nextEl.classList.remove('open'); }
        return false;
    }



    render() {
        return (
            <React.Fragment>
                <div className="topbar-menu">
                    <div className="container-fluid">
                        <Collapse isOpen={this.props.isMenuOpened} id="navigation">
                            <NavMenuContent onMenuClickCallback={this.onMenuClick} />
                            <div className="clearfix"></div>
                        </Collapse>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(connect()(Navbar));
