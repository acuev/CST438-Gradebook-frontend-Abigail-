import * as React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import {SERVER_URL} from '../constants.js';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//if div stops working, becasue added class name
class addingAssignment extends React.Component {
	
	constructor(props) {
    super(props);
	this.state = {assignmentName:'', dueDate:'', courseId:'', redirecting: false, errorMessage: false };
  }
  
  // handle the submit 
  handleSubmit = () => {

	this.setState({redirecting: false});
	this.setState({errorMessage: false});
	
    const token = Cookies.get('XSRF-TOKEN');
    fetch('http://localhost:8081/assignment',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
		'X-XSRF-TOKEN': token 
      },
	  
      body: JSON.stringify({
        assignmentName: this.state.assignmentName,
        dueDate: this.state.dueDate,
        courseId: this.state.courseId 
      })
    })
     .then(res => {
		 if (res.ok) {  
			console.log("assignment was added")
			this.setState({redirecting: true});
			toast.success("Assignment Added ", {
            position: toast.POSITION.BOTTOM_LEFT
            });
         } else {
            //console.error('error in adding assignment');
			this.setState({errorMessage: true});
      }}
	  ).catch(err => {
          //console.error(e);
		  this.setState({errorMessage: true});
      }); 
  }
  
  //handle changes
  handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }
  
  render() {
	  const { assignmentName, dueDate, courseId, redirecting, errorMessage } = this.state;
	  
	  return (
      <div>
      
      <h3> Add a new Assignment </h3>
      <TextField style = {{width:200}} label="Name" name="assignmentName" onChange={this.handleChange} value={assignmentName} /> 
      <br/><br/>
      <TextField style = {{width:200}} label="Due Date:" name="dueDate" onChange={this.handleChange}  value={dueDate} /> 
      <br/><br/>
      <TextField autoFocus style = {{width: 200}} label="Course ID:" name="courseId" onChange={this.handleChange}  value={courseId}/>   
      <br/><br/>
      <Button id = "goBack" component={Link} to={{pathname:'/'}} variant="outlined" color="primary"  style={{margin: 10}}>
            Go Back </Button>
      <Button id = "createAssignment" variant="outlined" color="primary" style={{margin: 10}}onClick={this.handleSubmit} 
              disabled={this.state.redirecting===true}> Submit </Button>
      <br/><br/> 
      <div class = "green" style={{ display: (this.state.redirecting ? 'block' : 'none'), color: 'green' }} > Assignment Successfully Added! </div>
      <div class = "red" style={{ display: (this.state.errorMessage ? 'block' : 'none'), color: 'red' }} > Error Assignment was not added. Make sure there are no blanks or errors!! </div>
      
      </div>
		
    ); 
	}
}

export default addingAssignment;
