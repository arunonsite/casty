import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



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
                    <Col lg={12}>
                            <Card>
                                <CardBody>
                        <h1>Episodes List</h1>
                        <div style={{float: "right"}}><i class="fa fa-plus-square fa-2x"  aria-hidden="true"></i></div>
                        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Episodes Number</th>
      <th>Episodes Name</th>
      <th>Episodes Description</th>
      <th>Photo</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>1234</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Photo</td>
      <td><i class="far fa-edit"></i> <i class="fa fa-trash" aria-hidden="true"></i></td>
    </tr>
    <tr>
      <td>2</td>
      <td>4565</td>
      <td>Thornton</td>
      <td>@fat</td>
       <td>Photo</td>
       <td><i class="far fa-edit"></i> <i class="fa fa-trash" aria-hidden="true"></i></td>
    </tr>
    
  </tbody>
</Table>
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