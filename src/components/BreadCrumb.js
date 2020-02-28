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


  render() {

    console.log("This.props---", this.props);
    const {user:{firstName='', lastName=''}} = this.props;
    return (
      <React.Fragment>
             <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Channels</a></li>
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Shows</a></li>
                                    <li class="breadcrumb-item active">Episodes</li>
                                </ol>
                            </div>
                            <h4 class="page-title">ShowName -Episodes</h4>
                        </div>
                    </div>
              </div> 
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

