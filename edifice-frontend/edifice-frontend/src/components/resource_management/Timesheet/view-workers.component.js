import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Card from 'react-bootstrap/Card';


import WorkersDataService from "./../../../services/worker.service";
import WorkedHoursDataService from "./../../../services/worked-hours.service";
import { Link } from 'react-router-dom';

class Workers extends Component {
  constructor(props) {
    super(props);
    this.retrieveWorkers = this.retrieveWorkers.bind(this);
    this.addWorker = this.addWorker.bind(this);
    this.state = {
      workers: [],
      id: this.props.match.params.id
    };
    
  }

  componentDidMount() {
    this.retrieveWorkers();
  }

  retrieveWorkers() {
    WorkersDataService.getAll()
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
    timesheetId:"234",
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
      const { workers,id,index } = this.state;
      console.log(id)
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
                <Card>
                    <div className="card-header">
                        <h6>Select workers to add to the timesheet</h6>
                    </div>
                    <div className="card-body">
                    {workers && workers.map((worker) => (
                                       worker.crewId == id ?
                                            <List key={worker.crewId}>                                
                                                    <Link 
                                                        className="btn btn-success mr-1"
                                                        type="button"
                                                        //onClick={this.addWorker(worker.wId)}
                                                        //onClick={this.addWorker()} 
                                                         >
                                                            Add 
                                                    </Link>
                                                    {worker.firstName} {worker.lastName}                                                                         
                                            </List>:""                       
                                                ))} 
                    </div>    
                </Card>


            </div>



/*
              <div class="modal-header">
                <h4 class="modal-title">Select workers to add to the timesheet</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              {workers && workers.map((worker) => (
                                       worker.crewId === id ?
                                            <List key={worker.crewId}>                                
                                                    <button 
                                                        className="btn btn-success mr-1"
                                                        type="button"
                                                        //onClick={this.addWorker(worker.wId)}
                                                        onClick={this.addWorker()} 
                                                         >
                                                            Add 
                                                    </button>
                                                    {worker.firstName} {worker.lastName}                                                                         
                                            </List>:""                       
                                                ))}  
        </div>
        <div class="modal-footer">
          <a href="#" data-dismiss="modal" class="btn btn-primary">OK</a>
              </div>*/
        
        );
    }
  }

export default Workers;





 