import React, { Component } from "react";
import Dates from './core_tools/admin/dates.component'
import Defaults from './core_tools/admin/defaults.component'
import Roles from './core_tools/admin/roles.component'
import { Link } from "react-router-dom";

//import PDF generating
import Report from './report/report.component'

import ProgressBar from 'react-customizable-progressbar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

//import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Assessment,HomeWork,LocationOn,Description,SupervisorAccount,Timeline,  Build} from '@material-ui/icons';

import UserService from "../services/user.service";
import EmployeeDataService from "../services/employee.service";
import VendorDataService from "../services/vendor.service";
import CostCodeDataService from "../services/costcode.service";
import ProjectDataService from "../services/project.service";

//css styles
const cardStyle = {
  backgroundColor: "#6B7BA4",
  "&:hover": {
    backgroundColor: "#efefef"
  }
}

const linkText = {
  color: "#FFFFFF",
  textDecoration: "none"
}

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.getprojectCount = this.getprojectCount.bind(this);
    this.getVendorCount = this.getVendorCount.bind(this);
    this.getEmployeeCount = this.getEmployeeCount.bind(this);
    this.getprojectDetails = this.getprojectCount.bind(this);
    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.state = {
      projects: [],
      content: "",
      projectCount: 0,
      vendorCount: 0,
      employeeCount: 0,
      currProjectId: 0,
      costCodes: [],
      id: "this.props.match.params.id"
    };

    //console.log(this.getprojectDetails());
  }

  expand(card) {
    card.classList.toggle('profile--expanded');

    // If card is not expanded after toggle, add 'unexpanded' class
    if (!card.classList.contains('profile--expanded')) card.classList.toggle('profile--unexpanded');
    // Else if card is expanded after toggle and still contains 'unexpanded' class, remove 'unexpanded'
    else if (card.classList.contains('profile--expanded') && card.classList.contains('profile--unexpanded')) card.classList.toggle('profile--unexpanded');
  }

  toggleTheme() {
    let docu = document.querySelector('html');

    docu.classList.toggle('light-theme');
    docu.classList.toggle('dark-theme');
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    this.retrieveProjects();
    this.getprojectCount();
    this.getVendorCount();
    this.getEmployeeCount();
  }

  getEmployeeCount() {
    //get Employee count
    EmployeeDataService.getAll().then(response => {
      this.setState({
        employeeCount: response.data.length,
 
      });
      //console.log(this.employeeCount);
    })
      .catch(e => {
        console.log(e);
      });
  }

  getprojectCount() {
    //get Project count
    ProjectDataService.getAll().then(response => {
      this.setState({
        projectCount: response.data.length,
        
      });
      //console.log(projectDetails);
    })
    .catch(e => {
      console.log(e);
    });
  }

  getVendorCount() {
    //get Project count
    VendorDataService.getAll().then(response => {
      this.setState({
        vendorCount: response.data.length,
        
      });
      //console.log(projectDetails);
    })
    .catch(e => {
      console.log(e);
    });
  }
  //private  var projectDetails=[];
  retrieveProjects() {
    ProjectDataService.getAll()
      .then(response => {
        this.setState({
          projects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  generatePDF(project){
    Report.generatePDF(project);
  }
  
  createUser(userId) {
    if (typeof userId == 'undefined') {
      window.location="/register"
    }else{
      window.location="/register/"+userId
    }
  }

  getProjectCostCodes(id){

    CostCodeDataService.getAll(id)
        .then(response => {
        this.setState({
            costCodes: response.data
        })
        console.log(response.data);
        console.log(this.state);
        })
        .catch(e => {
        console.log(e);
    });
    console.log(this.state)
    const temp=[];

    this.state.costCodes.forEach((item, index)=>{
        console.log(item.costCode)
        temp.push(item.costCode)
    })
    
    console.log(temp);
    return temp;
  }

  render() {
    const { projectDetails,projectCount,vendorCount,employeeCount,projects } = this.state;
    
    var elements = {};
    //this.getprojectDetails(elements);
    console.log(projects);
    const items = []

    const today = new Date();
    
    const progressInDays = (start,end) => {
      let date1 = new Date(start);
      let date2 = new Date(end);
      let diffTime = Math.abs(date2 - date1);
      let diffTime2 = Math.abs(date2 - today);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      let remainDays = Math.ceil(diffTime2/(1000 * 60 * 60 * 24));
      console.log(diffTime + " milliseconds");
      console.log(diffDays + " days");
      console.log(remainDays + " remain days");

      return remainDays;
    }

    return (
      `
    .card-hover:hover {
      color:red;
      transform: scale(1.001);
      background: #f0c14b;
    }
    `,
      <div className="container">

        <h3> <Timeline/> CORE TOOLS HOME</h3>
        <p>Current statistics of ongoing projects </p>
        <div className="row">
            <div className="col-lg-3 col-sm-6 pb-2" id="employeecard">
              <div className="card card-hover shadow-sm" style={cardStyle}>
              <a className="d-block nav-heading text-center mt-3" style={linkText}> <Link  style={linkText} to="/employees">

                <h1 className="nav-heading-title mb-0" style={{ fontSize:55 }}>{employeeCount}</h1>
                <h5 mb-0> <SupervisorAccount style={{ fontSize:25 }}/>  Employees</h5>
              </Link></a>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 pb-5" id="projectcard">
              <div className="card card-hover shadow-sm" style={cardStyle}>
                
              <Link className="d-block nav-heading text-center mt-3" style={linkText} to="/projects">
                <h1 className="nav-heading-title mb-0" style={{ fontSize:55 }}>{projectCount}</h1>
                <h5> <HomeWork style={{ fontSize:25 }}/>  Projects</h5>
              </Link>

              {/* <Link to={"/projects"}>
              <h1 className="nav-heading-title mb-0" style={{ fontSize:55 }}>{projectCount}</h1>
                <h5> <HomeWork style={{ fontSize:25 }}/>  Projects</h5>

              </Link> */}
              </div>
            </div>

            <div className="col-lg-3 col-sm-6" id="vendorcard">
              <div className="card card-hover shadow-sm" style={cardStyle}>
              <a className="d-block nav-heading text-center mt-3" style={linkText}> <Link to="/vendor" style={linkText}>

                <h1 className="nav-heading-title" style={{ fontSize:55 }}>{vendorCount}</h1>
                <h6> <HomeWork style={{ fontSize:25 }}/>  Vendors & Subcontractors</h6>
              </Link></a>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6" id="equipmentcard">
            <div className="card card-hover shadow-sm" style={cardStyle}>
              <a className="d-block nav-heading text-center mt-3" style={linkText}> <Link to="/equipments" style={linkText}>
                <h1 className="nav-heading-title" style={{ fontSize: 55 }}>{vendorCount}</h1>
                <h6> <Build style={{ fontSize: 25 }} />  Equipments</h6>
              </Link></a>
            </div>
          </div>

          <div className="col-8 mb-4 mr-5">
            <a onClick={()=>{this.generatePDF();}} className="btn btn-primary p-2"><Description style={{ fontSize:20 }}/> Generate Report</a>
          </div>
          </div>
            <div classname-="mb-2 pb-4">
              <h3> Ongoing Projects:</h3>
            </div>
          
            {projects.map(project =>(
              <div className="card card-hover shadow-sm card-text-edifice my-3">
              <div className="row">
                <Link className="col-5 m-2" style={{ textDecoration:'none' }}>
                <h4>{project.title}</h4>
                <h6>Description : {project.description}</h6>
                <h6>Location: {project.location}</h6> 
                <h6>From : {project.startdate} to {project.enddate}</h6>
                <a onClick={()=>{this.generatePDF(project,this.getProjectCostCodes(project.id));}} className="btn btn-primary p-2 my-2"><Description style={{ fontSize:20 }}/> Generate Report</a>
                </Link>
                <div className="col-4 mt-4">
                <center>
                <h2><b>{progressInDays(project.startdate,project.enddate)}{" "}</b>Days</h2>
                <h3>Remaining</h3>
                </center>
                </div>
                <div className="col-2">
                <center>
                <ProgressBar
                    radius={60}
                    progress={project.progressValue}
                    cut={120}
                    rotate={-210}
                    initialAnimation
                    initialAnimationDelay={1}
                    strokeWidth={13}
                    strokeColor="#273f7d"
                    transition="2s ease"
                    trackStrokeWidth={12}
                    trackTransition="1s ease"
                    pointerRadius={3}
                    pointerStrokeWidth={12}
                />
                {/* <h6 className="mb-10"><b>66%</b></h6>  */}
                </center> 
                </div>
                </div>
              </div>
            ))}

          
        <div className="row">
          
          {/* Admin content */}
          <div className="col-10">
            <div className="tab-content" id="nav-tabContent">
              {/*Admin core tools description  */}
              <div className="modal fade pt-4" id="list-admin" role="dialog" aria-labelledby="list-home-list" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered pt-4" role="document">
                  <div className="modal-content">
                    <p>Manage Important dates</p>
                    <div class="col text-center">
                      <a href="/dates" className="btn btn-outline-primary"> Go To Dates</a>
                    </div>  
                    <p>Manage Deafults</p>
                    <a href="/defaults" className="btn btn-outline-primary"> Go To Defaults</a>
                    <p>Manage Roles</p>
                    <a href="/roles" className="btn btn-outline-primary"> Go To Roles</a>
                  </div>
                </div>  
              </div>
              {/* Admin project description */}
              <div className="tab-pane fade" id="list-home" role="tabpanel" aria-labelledby="list-profile-list">
              {/* This is the pre project creation tab  */}
                <h2>Project Admin</h2>
                
                <p>Create a new project inside the system</p>
                <a href="/addproject" className="btn btn-outline-primary">+ Add New Project</a>
                <p>List All Project</p>
                <a href="/projects" className="btn btn-outline-primary">Project Home</a>
              </div>
              <div className="tab-pane fade" id="list-directory" role="tabpanel" aria-labelledby="list-messages-list">
              <h5>Directory</h5>
                <p>View Employee Directory</p>
                <a href="/employees" className="btn btn-outline-primary"> Employees</a>
                <p>View Vendor Directory</p>
                <a href="/vendor" className="btn btn-outline-primary"> Vendors</a>
                <p>View Project Directory</p>
                <a href="/projects" className="btn btn-outline-primary"> Projects</a>
              </div>

              <div className="tab-pane fade" id="list-document" role="tabpanel" aria-labelledby="list-settings-list">
                <h5>This is document</h5>
                <p>Manage pre construction level docments</p>
                <a href="/document" className="btn btn-outline-primary"> Go To a Document</a>
              </div>
              
              <div className="tab-pane fade" id="list-tasks" role="tabpanel" aria-labelledby="list-settings-list">
                <h5>Tasks</h5><hr/>
                <a href="/tasksconfiguration" className="btn btn-outline-primary mr-3"> Task Tool Configuration</a>
                <a href="/managetasks" className="btn btn-outline-primary"> Manage Tasks</a>
              </div>
              <div className="tab-pane fade" id="list-report" role="tabpanel" aria-labelledby="list-settings-list">This is report</div>
            </div>
          </div>
          {/*  debug stuff DELETE*/}
          {/* <div><p>sfdsfds</p></div> */}
          
        </div>
        {/* <Defaults /><Dates /><Roles /> */}
      </div>
    );
  }
}