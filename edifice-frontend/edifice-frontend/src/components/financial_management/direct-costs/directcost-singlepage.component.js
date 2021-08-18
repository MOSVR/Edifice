import React, { useState, useEffect } from "react";
import DirectCostDataService from "./../../../services/directcost.service";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UpdateIcon from '@material-ui/icons/Update';
import { Route, useParams } from "react-router-dom";

const DirectCost = props => {
  //const {projectId}= useParams();
  const initialDirectCostState = {
    id: null,
    costCode: "",
    description: "",
    category: "",
    vendor: "",
    employee: "",
    receivedDate: "",
    paidDate: "",
    ammount: "",
    projectId:""
  };
  const [currentDirectCost, setCurrentDirectCost] = useState(initialDirectCostState);
  const [message, setMessage] = useState("");

  const getDirectCost = id => {
    DirectCostDataService.get(id)
      .then(response => {
        setCurrentDirectCost(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDirectCost(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDirectCost({ ...currentDirectCost, [name]: value });
  };



  const updateDirectCost = () => {
    DirectCostDataService.update(currentDirectCost.id, currentDirectCost)
      .then(response => {
        console.log(response.data);
        setMessage("The direct cost was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDirectCost = () => {
    DirectCostDataService.remove(currentDirectCost.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/directcost/"+currentDirectCost.projectId);//check this again
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      {currentDirectCost ? (
        <div class="container">
          <h4>Direct Costs</h4>
            <div className="form-group">
              <label htmlFor="costCode">Cost Code</label>
             {/* <input
                type="text"
                className="form-control"
                id="costCode"
                required
                value={this.state.costCode}
                onChange={this.onChangeCostCode}
                name="costCode"
             />*/}
                <select 
                className="form-control"
                id="costCode"
                required
                value={currentDirectCost.costCode}
                onChange={handleInputChange}
                name="costCode"
              >
                <option>010-Maintenance Equipment</option>
                <option>924-Sodding</option>
                <option>100-Visual Display Boards</option>
                <option>230-Site Clearing</option>
                <option>240-Dewatering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDirectCost.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              {/*<input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />*/}
  <select 
                className="form-control"
                id="category"
                required
                value={currentDirectCost.category}
                onChange={handleInputChange}
                name="category"
              >
                <option>Expense</option>
                <option>Invoice</option>
                <option>Payroll</option>
              </select>
            </div>




            <div className="form-group">
              <label htmlFor="title">Vendor</label>
              <input
                type="text"
                className="form-control"
                id="vendor"
                name="vendor"
                value={currentDirectCost.vendor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Employee</label>
              <input
                type="text"
                className="form-control"
                id="employee"
                name="employee"
                value={currentDirectCost.employee}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Received Date</label>
              <input
                type="date"
                className="form-control"
                id="receivedDate"
                name="receivedDate"
                value={currentDirectCost.receivedDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Paid Date</label>
              <input
                type="date"
                className="form-control"
                id="paidDate"
                name="paidDate"
                value={currentDirectCost.paidDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Ammount</label>
              <input
                type="text"
                className="form-control"
                id="ammount"
                name="ammount"
                value={currentDirectCost.ammount}
                onChange={handleInputChange}
              />
            </div>

          
          


          <button className="btn btn-danger" onClick={deleteDirectCost}>
            Delete <DeleteIcon/> 
          </button>

          <button
            type="submit"
            className="btn btn-success m-2"
            onClick={updateDirectCost}
          >
            Update <UpdateIcon/>
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default DirectCost;