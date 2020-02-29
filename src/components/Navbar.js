import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import { Redirect } from "react-router-dom";



import { routes, PrivateRoute } from '../routes';


const NavMenuContent = (props) => {    
const loggedInUser = getLoggedInUser();
 const {roles=[]} = loggedInUser;

  console
  .log("role--Current -",loggedInUser );
 // const role ='SuperAdmin';
 const dahs= {
   path: "/",
   exact: true,
   component: () => <Redirect to="/dashboard" />,
   route: PrivateRoute
 };
 const usesrs= {
   path: "/",
   exact: true,
   component: () => <Redirect to="/users" />,
   route: PrivateRoute
 };
 const dashROles = 'SuperAdmin';
 let customRoutes = routes;
 if (roles && roles.indexOf(dashROles) === -1) {
   // role not authorised so redirect to home page
   customRoutes.push(dahs);
 } else{
   customRoutes.push(usesrs);

    console
    .log("customRoutes---", customRoutes);
 }
    const onMenuClickCallback = props.onMenuClickCallback;

       let allowedRoutes =[];
       Object.keys(customRoutes).map((ind) =>{
            
            if(customRoutes[ind].roles !== undefined){
                  customRoutes[ind].roles.reduce((acc, role) => {                   
                   if (roles && roles.indexOf(role) !== -1) {
                                              // role not authorised so redirect to home page
                                              
                                               allowedRoutes.push(customRoutes[ind]);
                      
                     }   
                  }, []);
            }           

       });   

    return <React.Fragment>
        <ul className="navigation-menu">
        { allowedRoutes.map((menu) =>  					 
                   <li> 
                        <Link to={menu.path}className="waves-effect has-dropdown"
                          aria-expanded="true">
                    <i className={menu.icon}></i>
                    <span> { menu.name} </span>
                </Link></li>                     
        )}
        </ul>
    </React.Fragment>
}


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.initMenu = this.initMenu.bind(this);
    }

    /**
     * 
     */
    componentDidMount = () => {
        this.initMenu();
    }

    /**
     * Init the menu
     */
    initMenu = () => {
        var links = document.getElementsByClassName('side-nav-link-ref');
        var matchingMenuItem = null;
        for (var i = 0; i < links.length; i++) {
            if (this.props.location.pathname === links[i].pathname) {
                matchingMenuItem = links[i];
                break;
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
            var parent = matchingMenuItem.parentElement;

            /**
             * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3. 
             * We should come up with non hard coded approach
             */
            if (parent) {
                parent.classList.add('active');
                const parent2 = parent.parentElement;
                if (parent2) {
                    parent2.classList.add('in');
                }
                const parent3 = parent2.parentElement;
                if (parent3) {
                    parent3.classList.add('active');
                    var childAnchor = parent3.querySelector('.has-dropdown');
                    if (childAnchor) childAnchor.classList.add('active');
                }

                const parent4 = parent3.parentElement;
                if (parent4)
                    parent4.classList.add('in');
                const parent5 = parent4.parentElement;
                if (parent5)
                    parent5.classList.add('active');
            }
        }
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
