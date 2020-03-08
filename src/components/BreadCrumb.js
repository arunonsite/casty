import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Container } from 'reactstrap';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/logo-sm.png';
import logo from '../assets/images/logo-dark.png';
import profilePic from '../assets/images/users/user-1.jpg';




class BreadCrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigatePage = (value) => {
 this.props.navigatePage(value);
  }


  render() {
    const {user:{firstName='', lastName=''}, list=[],navigatePage} = this.props;
    return (
      <React.Fragment>
             <ol class="breadcrumb m-0">
             {list.map((value, index) => {
        return (index === (list.length - 1)) ? <li class="breadcrumb-item active">{value.name}</li> :
         <li class="breadcrumb-item"><a href={value.link}>{value.name}</a></li>
      })}
      </ol>
      </React.Fragment >
    );
  }
}
const mapStateToProps = (state) => {
  const {Auth:{user={}} }= state;
 return { user };
};

export default connect(mapStateToProps )(BreadCrumb);
//export default connect()(Topbar);

