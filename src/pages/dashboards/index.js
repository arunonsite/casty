import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

import  * as dashboardActions from '../../redux/dashboard/actions';
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { addDays } from 'date-fns';
import { bindActionCreators } from 'redux';

import Chart from 'react-apexcharts'
class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            date: [new Date(), addDays(new Date(), 7)],
            lineBar : { 
                series: [{
                data: [21, 22, 10, 28, 16, 21, 13, 30]
              }],
              options: {
                chart: {
                  height: 350,
                  type: 'bar',
                  events: {
                    click: function(chart, w, e) {
                      // console.log(chart, w, e)
                    }
                  }
                },
              //  colors: colors,
                plotOptions: {
                  bar: {
                    columnWidth: '45%',
                    distributed: true
                  }
                },
                dataLabels: {
                  enabled: false
                },
                legend: {
                  show: false
                },
                xaxis: {
                  categories: [
                    ['John' ],
                    ['Joe'],
                    ['Jake', ],
                    'Amber',
                    ['Peter', 'Brown'],
                    ['Mary', 'Evans'],
                    ['David', 'Wilson'],
                    ['Lily', 'Roberts'], 
                  ],
                  labels: {
                    style: {
                   //   colors: colors,
                      fontSize: '12px'
                    }
                  }
                }
              },
            
            
              
              
              },
            radialBar :{
                series: [20],
                options: {
                  chart: {
                    height: 350,
                    type: 'radialBar',
                    toolbar: {
                      show: true
                    }
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                       hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: '#fff',
                        strokeWidth: '67%',
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
                  
                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: -10,
                          show: true,
                          color: '#888',
                          fontSize: '17px'
                        },
                        value: {
                          formatter: function(val) {
                            return parseInt(val);
                          },
                          color: '#111',
                          fontSize: '36px',
                          show: true,
                        }
                      }
                    }
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shade: 'dark',
                      type: 'horizontal',
                      shadeIntensity: 0.5,
                      gradientToColors: ['#ABE5A1'],
                      inverseColors: true,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: 'round'
                  },
                  labels: ['Percent'],
                },
     
            }
        }
      
    
}
    

    changeFileterDate = (date) =>{
        this.setState({ date })
         let da = {"DateStart":date[0],"DateEnd":date[1]};
        this.props.actions.loadDashbaord(da);
    }
    componentDidMount(){        
        this.loadPageData();    
      }

    loadPageData = () => {  //this.state.departments.push()
        
        let da = {"DateStart":new Date(),"DateEnd":addDays(new Date(), 7)};
        this.props.actions.loadDashbaord(da);
       }
    render() {
        const {
            dashboardData : {
            Users= {},
Episodes= {},
TotalMinutesConsumed= {},
Audience_PlayedXDay=[],
TopFavorites=[],
TopSubscriptions=[],
PercentagePlayed ={}
        }
    } = this.props;

         console.log("this.props----", this.props);
        
        let xazixs= [];
        let barData= [];

        Audience_PlayedXDay.map((item)=>{
            xazixs.push(item.DayName);            
            barData.push(item.EpisodesPlayed);            
        })
         const { lineBar={},  radialBar={}}=this.state;
         const barOtions = Object.assign({...lineBar}, { 
             options: {...lineBar.options, xaxis :  {categories: xazixs}},
             series : [{data : barData}]
            });
            const radialOtions = Object.assign({...radialBar}, { 
                options: {...radialBar.options},
                series : [PercentagePlayed.Percentage]
               });


         console.log("barOtions---", barOtions);
         

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}
                    <Row>
                        <Col>
                            <div className="page-title-box">
                                <Row>
                                    <Col lg={9}>
                                        <h4 className="page-title">Welcome, {this.state.user.firstName}</h4>
                                    </Col>
                                    <Col lg={3} className="mt-lg-3 mt-md-0">
                                    <DateRangePicker
                                    onChange={this.changeFileterDate}
          value={this.state.date}
          
        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row>
               
                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-4">
                                    <div class="avatar-lg bg-soft-primary border-primary border" style={{"height": "3.5rem","width":" 3.5rem","borderRadius": "10px"}}>
                                        <i class="mdi mdi-account-group font-22 avatar-title text-primary"></i>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="text-left">
									 <p class="text-muted mb-1 text-truncate">Total Users</p>
        <h5 class="text-dark mt-1">{Users.Count !== undefined  ? Users.Count : 0 }<span /></h5>
                                       
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div> 

                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-4">
                                    <div class="avatar-lg bg-soft-danger border-danger border" style={{"height": "3.5rem","width":" 3.5rem","borderRadius": "10px"}}>
                                        <i class="mdi mdi-camera-image font-22 avatar-title text-danger"></i>
                                    </div>
                                </div>
                                <div class="col-8">
                                   <div class="text-left">
									 <p class="text-muted mb-1 text-truncate">Total Episodes</p>
                                        <h5 class="text-dark mt-1">{Episodes.Count !== undefined  ? Episodes.Count : 0 }<span /></h5>
                                       
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div> 

                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-4">
                                    <div class="avatar-lg bg-soft-info border-info border" style={{"height": "3.5rem","width":" 3.5rem","borderRadius": "10px"}}>
                                        <i class="fe-bar-chart-line- font-22 avatar-title text-info"></i>
                                    </div>
                                </div>
                                <div class="col-8">
                                   <div class="text-left">
									 <p class="text-muted mb-1 text-truncate">Total Shows</p>
                                        <h5 class="text-dark mt-1">58,947<span /></h5>
                                       
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div>

                    <div class="col-md-6 col-xl-3">
                        <div class="widget-rounded-circle card-box">
                            <div class="row">
                                <div class="col-4">
                                    <div class="avatar-lg bg-soft-warning border-warning border" style={{"height": "3.5rem","width":" 3.5rem","borderRadius": "10px"}}>
                                        <i class="mdi mdi-timer font-22 avatar-title text-warning"></i>
                                    </div>
                                </div>
                                <div class="col-8">
                                   <div class="text-left">
									 <p class="text-muted mb-1 text-truncate">Total Minutes Consumed</p>
                                        <h5 class="text-dark mt-1">{TotalMinutesConsumed.Minutes !== undefined ? TotalMinutesConsumed.Minutes : 0.00}<span /></h5>
                                       
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div> 
               
                   </Row>

                    <div class="row">
                    <div class="col-xl-4">
                        <div class="card-box">
                            <h4 class="header-title mb-3">Average Completion Rate</h4>
                            <Chart options={radialOtions.options} 
                                series={radialOtions.series} 
                                type="radialBar" height={320} />
                            <div class="widget-chart text-center" dir="ltr">
                                <h5 class="text-muted mt-3">Average Completion Rate</h5>

                              

        <h2>{PercentagePlayed.Percentage}</h2>

                               
                              
                                
                            </div>
                        </div>  
                    </div> 

                    <div class="col-xl-8">
                        <div class="card-box">
                            <h4 class="header-title mb-3">Audience</h4>

                            <div id="sales-analytics" class="flot-chart mt-4 pt-1" >
                            
                            <Chart  options={barOtions.options} 
                            series={barOtions.series} type="bar" 
                            
                            height={378} />


                            </div>
                        </div>  
                    </div>  
                </div>
                    <div class="row">
                    <div class="col-xl-6">
                        <div class="card-box" style={{"height":"385px"}}>
                            <h4 class="header-title mb-3">Subscriptions</h4>
							
                            
                        </div>
                    </div>  

                    <div class="col-xl-6">
                        <div class="card-box">
                            <h4 class="header-title mb-3">Popular Episodes</h4>
                            <div class="table-responsive">
                                <table class="table table-borderless table-hover table-centered m-0">
                                    <tbody>
                                    {TopFavorites.map((cols, index) => (
                                       
                                                <tr>
                                                <td>{index+1}</td>
                                                   <td style={{"width": "36px"}}>
                                                       <img src="assets/images/users/user-2.jpg" alt="contact-img" title="contact-img" class="rounded-circle avatar-sm" />
                                                   </td>
                                                   <td>
                                    <h5 class="m-0 font-weight-normal">{cols.ShowName}</h5>
                                                        <p class="mb-0 text-muted"><small>{cols.ShowId}</small></p> 
                                                   </td>
                                                   
                                                   <td>
                                                   {cols.ShowRating}
                                                   </td>
                                               </tr>
                                             ))}
                                      

                                    </tbody>
                                </table>
                            </div>
                        </div>  
                    </div>  
                </div>
                 
                </div>
            </React.Fragment>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(dashboardActions, dispatch),
    };
  }
  const mapStateToProps = (state) => {

    console.log("state----", state);
     const {DashboardReducer : {dashboardData ={}}} = state;
  
    
    return { dashboardData };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(DefaultDashboard);




