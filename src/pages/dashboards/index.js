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
                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-6">
                                    <div class="avatar-lg rounded-circle bg-soft-primary border-primary border">
                                        <i class="fe-heart font-22 avatar-title text-primary"></i>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="text-right">
                                        <h3 class="text-dark mt-1">$<span data-plugin="counterup">58,947</span></h3>
                                        <p class="text-muted mb-1 text-truncate">Total Revenue</p>
                                    </div>
                                </div>
                            </div>  
                        </div>  
                    </div> 
                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-6">
                                    <div class="avatar-lg rounded-circle bg-soft-success border-success border">
                                        <i class="fe-shopping-cart font-22 avatar-title text-success"></i>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="text-right">
                                        <h3 class="text-dark mt-1"><span data-plugin="counterup">127</span></h3>
                                        <p class="text-muted mb-1 text-truncate">Today's Sales</p>
                                    </div>
                                </div>
                            </div> 
                        </div>  
                    </div>  

                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-6">
                                    <div class="avatar-lg rounded-circle bg-soft-info border-info border">
                                        <i class="fe-bar-chart-line- font-22 avatar-title text-info"></i>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="text-right">
                                        <h3 class="text-dark mt-1"><span data-plugin="counterup">0.58</span>%</h3>
                                        <p class="text-muted mb-1 text-truncate">Conversion</p>
                                    </div>
                                </div>
                            </div>  
                        </div> 
                    </div> 

                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-6">
                                    <div class="avatar-lg rounded-circle bg-soft-warning border-warning border">
                                        <i class="fe-eye font-22 avatar-title text-warning"></i>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="text-right">
                                        <h3 class="text-dark mt-1"><span data-plugin="counterup">78.41</span>k</h3>
                                        <p class="text-muted mb-1 text-truncate">Today's Visits</p>
                                    </div>
                                </div>
                            </div> 
                        </div>  
                    </div>  
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