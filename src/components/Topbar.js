import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../helpers/authUtils';
import { Redirect } from "react-router-dom";
import classNames from 'classnames';
import {  Container } from 'reactstrap';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/logo-sm.png';
import logo from '../assets/images/log.jpg';
import profilePic from '../assets/images/users/user-1.jpg';
import { routes, PrivateRoute } from '../routes';

const Notifications = [{
  id: 1,
  text: 'Caleb Flakelar commented on Admin',
  subText: '1 min ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'primary'
},
{
  id: 2,
  text: 'New user registered.',
  subText: '5 min ago',
  icon: 'mdi mdi-account-plus',
  bgColor: 'info'
},
{
  id: 3,
  text: 'Cristina Pride',
  subText: 'Hi, How are you? What about our next meeting',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'success'
},
{
  id: 4,
  text: 'Caleb Flakelar commented on Admin',
  subText: '2 days ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'danger'
},
{
  id: 5,
  text: 'Caleb Flakelar commented on Admin',
  subText: '1 min ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'primary'
},
{
  id: 6,
  text: 'New user registered.',
  subText: '5 min ago',
  icon: 'mdi mdi-account-plus',
  bgColor: 'info'
},
{
  id: 7,
  text: 'Cristina Pride',
  subText: 'Hi, How are you? What about our next meeting',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'success'
},
{
  id: 8,
  text: 'Caleb Flakelar commented on Admin',
  subText: '2 days ago',
  icon: 'mdi mdi-comment-account-outline',
  bgColor: 'danger'
}];


const NavMenuContent = (props) => {
  const loggedInUser = getLoggedInUser();
  const { roles = [] } = loggedInUser;

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
      if (customRoutes[ind].roles !== undefined && customRoutes[ind].path !== '/shows/:id' && customRoutes[ind].path !== '/episodes/:id') {
          customRoutes[ind].roles.reduce((acc, role) => {
              if (roles && roles.indexOf(role) !== -1) {                                              // role not authorised so redirect to home page

                  allowedRoutes.push(customRoutes[ind]);

              }
          }, []);
      }

  });

  return <React.Fragment>

<ul class="list-unstyled topnav-menu topnav-menu-left m-0">
          {allowedRoutes.map((menu) =>
           
              <li class="dropdown d-none d-lg-block">
                  <Link to={menu.path} className="nav-link dropdown-toggle waves-effect side-nav-link-ref"
                      aria-expanded="true">
                      <i className={menu.icon}></i>
                      <span> {menu.name} </span>
                  </Link>
                  </li>
          )}
      </ul> 
  </React.Fragment>
}

const ProfileMenus = [{
  label: 'My Account',
  icon: 'fe-user',
  redirectTo: "/",
},

{
  label: 'Logout',
  icon: 'fe-log-out',
  redirectTo: "/logout",
  hasDivider: true
}]


class Topbar extends Component {
  constructor(props) {
    super(props);
    this.initMenu = this.initMenu.bind(this);
    this.state = {};
  }
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
  getTypeOnSearch=(event)=> {

    this.props.typeOnSearch(event.target.value)
  }

  render() {

    const {user:{firstName='', lastName=''}} = this.props;
    return (
      <React.Fragment>
        <div className="navbar-custom">
          <Container fluid>
            <ul className="list-unstyled topnav-menu float-right mb-0">

            <li className="dropdown notification-list">
                <Link className={classNames('navbar-toggle', 'nav-link', {'open': this.props.isMenuOpened})} to="#" onClick={this.props.menuToggle}>
                    <div className="lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Link>
            </li>

{/* 
              <li>
                <NotificationDropdown notifications={Notifications} />
              </li> */}

              <li>
                <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus} username={firstName+', '+lastName} firstName={firstName} />
              </li>
            </ul>

            <div className="logo-box">
              <Link to="/" className="logo text-center">
                <span className="logo-lg">
                <img src={logo} alt="" ></img>
                </span>
                <span className="logo-sm">
                <h1>Casty</h1>
                </span>
              </Link>
            </div>

         {/*    <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
            
            <li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
				 <i class="mdi mdi-home"></i> Dashboard
                </a>
            </li>
			<li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
				  <i class="mdi mdi-account-group"></i> User Management
                </a>
            </li>
			<li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
				  <i class="mdi mdi-city"></i> Company
                  
                </a>
            </li>
			<li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="departments.html" role="button" aria-haspopup="false" aria-expanded="false">
				<i class="mdi mdi-border-all"></i> Departments
                    
                </a>
            </li>
			<li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
				 <i class="mdi mdi-play-circle-outline"></i> Channels
                   
                </a>
            </li>
			<li class="dropdown d-none d-lg-block">
                <a class="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
				<i class="mdi mdi-play-box-outline"></i> Shows
                    
                </a>
            </li>
    
            
        </ul>
          */}
            <NavMenuContent onMenuClickCallback={this.onMenuClick} />
           </Container>
        </div>
      </React.Fragment >
    );
  }
}
const mapStateToProps = (state) => {
  const {Auth:{user={}} }= state;

 return { user };
};

export default withRouter(connect(mapStateToProps)(Topbar));
//export default connect()(Topbar);

