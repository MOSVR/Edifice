import React, { Component } from 'react';

import Create from "./create.component";
import AddWorker from "./add_worker.component";
import Approve from "./approve.component";
import RemoveApprove from "./remove-approve.component";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import TimesheetDataService from "../../../services/timesheet.service";
import CrewDataService from "./../../../services/crew.service";

class ViewTimesheet extends Component {
    constructor(props) {
        super(props);
        this.retrieveTimesheet = this.retrieveTimesheet.bind(this);
        this.retrieveCrew = this.retrieveCrew.bind(this);

        this.state = {
                code:this.props.match.params.code,
                id:this.props.match.params.id,
                timesheet:[],
                crews: []
        };
      }

      componentDidMount() {
        this.retrieveTimesheet(this.props.match.params.code);
        this.retrieveCrew(this.props.match.params.id);
      }

      retrieveCrew(id) {
        CrewDataService.getAll(id)
          .then(response => {
            this.setState({
              crews: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      retrieveTimesheet(id){
          TimesheetDataService.get(id)
          .then(response => {
              this.setState({
                timesheet: response.data
              });
              console.log(response.data);
              })
            .catch(e => {
              console.log(e);
      });
      }

    render() {
        const {id , timesheet,crews} = this.state;

        return (
          <div>
            <Card
              bg={'success'}
              text={'white'}
              className="mb-2">    
              <Card.Body>
                <h4>Timesheet</h4>
              </Card.Body>
            </Card> 


            <Card 
            className="mb-2"
            bg={'light'}>
               <div class="container">                                
                    <div class="row">                     
                      <div class="col-6">
                        <Card.Body>
                            <h6>Code:{timesheet.code}</h6>
                            <h6>Date: {timesheet.date}</h6>
                            <h6>Status: {timesheet.status}</h6>
                            <h6>ProjectId:{timesheet.projectId}</h6>
                        </Card.Body>
                      </div>

                      <div class="col-6">
                        <Card.Body>
                        <h6>Select crew to add worker to timesheet</h6>
                        {crews && crews.map((crew, index) => (
                            <div className="list-group" key={index}>
                                        <Link 
                                        className="list-group-item list-group-item-action"
                                        //data-toggle="modal" 
                                        //data-target="#selectWorkers"
                                        to={"/viewWorkers/"+crew.id}>
                                           {crew.name}
                                        </Link>
                            </div> 
                        ))} 
                        </Card.Body>
                      </div>
                </div>
                </div>
                        </Card>
      
            <div className="card text-right">

            <div className="card-body">    
         {/*       <button                         
                    className="btn btn-primary m-3" 
                    data-toggle="modal" 
                    data-target="#addWorker">
                        Add Workers
         </button>*/}

                    <table className="table table-bordered align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className=" align-middle text-center"  rowspan="2">Crew</th>
                                    <th  className=" align-middle text-center" rowspan="2">Employee Name</th>
                                    <th  className=" align-middle text-center" rowspan="2">Location</th>
                                    <th  className=" align-middle text-center" rowspan="2">Start</th>
                                    <th className=" align-middle text-center" colspan="2">Lunch</th>
                                    <th className=" align-middle text-center" colspan="2">Tea</th>
                                    <th className=" align-middle text-center" rowspan="2">Leave</th>
                                </tr>
                                <tr>
                                    <th className=" align-middle text-center" >Start</th>
                                    <th className=" align-middle text-center" >End</th>
                                    <th className=" align-middle text-center" >Start</th>
                                    <th className=" align-middle text-center" >End</th>
                                </tr>
                            </thead>
                        <tbody>

                            <tr>
                                <td>
                                    flooring
                                </td>
                                <td>Randie pathirae</td>
                                <td>                        
                                  <input 
                                    type="text" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>                                 
                                    <input 
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>           
                                </td>
                                <td>
                                    <input 
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input 
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {timesheet.status == "Pending"?
                    <button 
                    href="#" 
                    className="btn btn-primary mr-3" 
                    data-toggle="modal" 
                    data-target="#approve"> 
                        Approve
                    </button>:
                    
                    <button 
                    href="#" 
                    className="btn btn-primary mr-3" 
                    data-toggle="modal" 
                    data-target="#removeApprove"> 
                        Remove the Approval
                    </button>}

                    <button 
                    href="#" 
                    className="btn btn-secondary mr-3"> 
                        Save Changes
                    </button>
                    
                    {/*------------------------------------ Approve Starts------------------------------------------------------------------ */}
                    <div className="modal fade" id="approve" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <Approve
                    timesheetId={timesheet.code}/>
                    </div>
                    {/*-------------------------------------Approve Ends----------------------------------------------------------------------*/}

                    {/*------------------------------------ Remove Approve Starts------------------------------------------------------------------ */}
                    <div className="modal fade" id="removeApprove" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <RemoveApprove
                    timesheetId={timesheet.code}/>
                    </div>
                    {/*-------------------------------------Remove Approve Ends----------------------------------------------------------------------*/}

                    {/*------------------------------------ Add worker Starts------------------------------------------------------------------ */}
                  <div className="modal fade" id="addWorker" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                   <AddWorker 
                   timesheetId={timesheet.code}
                   id={id}/> 
                    </div>
                    {/*------------------------------------ Add worker Ends--------------------------------------------------------------------- */}





                </div>
            </div>
            
          </div>
          
        );
      }
    }

export default ViewTimesheet;