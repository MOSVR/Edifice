import React, { Component } from 'react';

import CrewDataService from "./../../../services/crew.service";
import WorkersDataService from "./../../../services/worker.service";
import WorkedHoursDataService from "./../../../services/worked-hours.service";

import Workers from "./workers-list.component";

class AddWorker extends Component {
    constructor(props) {
        super(props);
        this.retrieveCrew = this.retrieveCrew.bind(this);
        this.retrieveWorkers = this.retrieveWorkers.bind(this);
        this.addWorker = this.addWorker.bind(this);
        this.state = {
          crews: [],
          workers: [],
          currentIndex: -1,
          content: "",
          workerId:"",
          date:"",
          timesheetId:this.props.timesheetId,
          status:"Pending",
          id: this.props.projectId
        };
      }

      componentDidMount() {
        this.retrieveCrew(this.props.id);
        this.retrieveWorkers(this.props.id);
      }

        //get data
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
        
        retrieveWorkers(id) {
            WorkersDataService.getAll(id)
                .then(response => {
                this.setState({
                workers: response.data
                });
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
            });
        }

        
      addWorker() {
        var data = {
          workerId: "12",
          timesheetId: this.state.timesheetId,
        };
        console.log(data)
        console.log("heloooooooooooooooooooo")

    
        WorkedHoursDataService.create(data)
          .then(response => {
            this.setState({
                workerId: response.data.workerId,
                timesheetId:  response.data.timesheetId,
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }


    render() {
        const { crews ,currentIndex,id, workers } = this.state;
        return (  
        <div>
            {/*------------------------------------ Add Emp Starts------------------------------------------------------------------ */}
            <div className="modal-dialog modal-md modal-dialog-centered" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Select Crew</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body" align ="left">

                        {crews && crews.map((crew, index) => (
                            <div className="list-group" key={index}>
                                        <button 
                                        className="list-group-item list-group-item-action"
                                        data-toggle="modal" 
                                        data-target="#selectWorkers">
                                           {crew.name}
                                        </button>

                                        {/*------------------------------------ approve timesheet Starts------------------------------------------------------------------ */}
                                        <div className="modal fade" id="selectWorkers" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
                                            <Workers id={crew.id}/>
                                        </div>
                    {/*-------------------------------------approve timesheet  Ends----------------------------------------------------------------------*/}
      
                                                          
                         { /*      <div className="card-body" >                                     
                                     
                                        </div>*/}
                            </div> 
                        ))}  
                    </div>  
                    <div className="modal-footer">
                        <button 
                        type="button" 
                        className="btn btn-primary" 
                        data-dismiss="modal">
                            OK
                        </button>
                    </div>                                    
                </div>
            </div>
        </div>            
        );
    }
  }

export default AddWorker;





 