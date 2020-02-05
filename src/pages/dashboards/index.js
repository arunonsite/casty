import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        };
    }

    render() {

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col>
                            <div className="page-title-box">
                                <Row>
                                    <Col lg={7}>
                                        <h4 className="page-title">Welcome, {this.state.user.firstName}</h4>
                                    </Col>
                                    <Col lg={5} className="mt-lg-3 mt-md-0">
                                        
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                 <Row>
                 <Col md={6} xl={3}>
                           
                                <div class="card-box">
                                    <Row>
                                        <Col md={6}>
                                        
                                            <div class="avatar-sm bg-blue rounded">
                                                <i class="fe-aperture avatar-title font-22 text-white"></i>
                                            </div>
                                        
                                        </Col>
                                        <Col md={6}>
                                       
                                            <div class="text-right">
                                                <h3 class="my-1"><span data-plugin="counterup">12</span></h3>
                                                <p class="text-muted mb-1 text-truncate">Users</p>
                                            </div>
                                            </Col>
                                        
                                    </Row>
                                    
                                </div> 
                           
                           </Col>
                           <Col md={6} xl={3}>
                           
                                <div class="card-box">
                                    <Row>
                                        <Col md={6}>
                                        
                                            <div class="avatar-sm bg-blue rounded">
                                                <i class="fe-aperture avatar-title font-22 text-white"></i>
                                            </div>
                                        
                                        </Col>
                                        <Col md={6}>
                                       
                                            <div class="text-right">
                                                <h3 class="my-1"><span data-plugin="counterup">145</span></h3>
                                                <p class="text-muted mb-1 text-truncate">Channels</p>
                                            </div>
                                            </Col>
                                        
                                    </Row>
                                    
                                </div> 
                           
                           </Col>
                           <Col md={6} xl={3}>
                           
                                <div class="card-box">
                                    <Row>
                                        <Col md={6}>
                                        
                                            <div class="avatar-sm bg-blue rounded">
                                                <i class="fe-aperture avatar-title font-22 text-white"></i>
                                            </div>
                                        
                                        </Col>
                                        <Col md={6}>
                                       
                                            <div class="text-right">
                                                <h3 class="my-1"><span data-plugin="counterup">1245</span></h3>
                                                <p class="text-muted mb-1 text-truncate">Shows</p>
                                            </div>
                                            </Col>
                                        
                                    </Row>
                                    
                                </div> 
                           
                           </Col>
                           <Col md={6} xl={3}>
                           
                                <div class="card-box">
                                    <Row>
                                        <Col md={6}>
                                        
                                            <div class="avatar-sm bg-blue rounded">
                                                <i class="fe-aperture avatar-title font-22 text-white"></i>
                                            </div>
                                        
                                        </Col>
                                        <Col md={6}>
                                       
                                            <div class="text-right">
                                                <h3 class="my-1"><span data-plugin="counterup">245</span></h3>
                                                <p class="text-muted mb-1 text-truncate">Episodes</p>
                                            </div>
                                            </Col>
                                        
                                    </Row>
                                    
                                </div> 
                           
                           </Col>
                           </Row>
                           
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    Welcome to Casty Dashboard
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(DefaultDashboard);