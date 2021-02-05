import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import {Link, useHistory}  from  'react-router-dom';
import moment from 'moment';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	Form,
	FormGroup,
} from "reactstrap";

// components
import styles from './AddUser.module.css';

// import logo from './logo.png';
import flag from '../../StationManagement/flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Checkbox,
  Button
  } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const GreenCheckbox = withStyles({
  root: {
    color: '#B22222',
    '&$checked': {
      color: '#B22222',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#b22222',
    },
  },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#b22222'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#b22222'
    }
  },
  label: {
		color: "red",
		["@media (max-width:320px)"]: {},
	},
  textField1:{
    outline: 'none',
    width: 190,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      borderColor: '#6c757d'
    },
    '&:after': {
      borderColor: '#6c757d'
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#6c757d',
    // },
  },
  page1: {
    marginTop: 40,
    // color: '#b22222',
    // borderRadius: 8
  },
  button1: {
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#b22222',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#b22222',
      color: '#FFF'
    }
  },
  button2: {
    width: 100,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#272d3b',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#272d3b',
      color: '#FFF'
    }
  },
  container1: {
		display: "flex",
		flexWrap: "wrap",
    width: 170,
	},
	date1: {
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
}));

export default function AddUser(props) {
  const [isAdd, setIsAdd] = useState(true);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const classes = useStyles();
  const history= useHistory();
  const [state, setState]=useState({
      userName:"",
      userNumber:"",
      role:"",
      stationName:"",
      userEmail:"",
      userPassword:"",
  });
	const [values, setValues] = useState({
		password: "",
		showPassword: false,
	})
  const [errors , setErros]= useState({})
  // const [password, setPassword] = useState(''); setDetails

  // close modal
  const toggleModalClose =()=>{
    setModal(false)
  }

  // Handle Submit Station
  const handleSubmit = (e) => {

      e.preventDefault();
      if (!validateForm()) {
          return
      }
      setModal(true);
      setIsAdd(true);
      // state.orgId=localStorage.getItem('orgId')
      // props.addPackage(state)
  }

  // validate form
  const validateForm =()=>{
    // All regex for validation
       var emailValid = state.userEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var mobileValid = state.userNumber.toString().match(/^[0]?[6789]\d{9}$/);
       var usernameRegex = state.userName.toString().match(/^[a-zA-Z0-9]+$/);

       var isValid= true;
       if(state.userName.trim()==''|| !usernameRegex){
           errors.userName="user name is required or invalid name";
           isValid =false;
       }
      else if(state.userNumber.toString().trim()==''|| !mobileValid){
          errors.userNumber="phone number is required or invalid number";
          isValid =false;
      }
			else if(state.userEmail.toString().trim()=='' || !emailValid){
          errors.userEmail="number of platforms is required or invalid number";
          isValid =false;
      }
    else  if(state.stationName.trim()==''){
          errors.stationName="station name is required";
          isValid =false;
      }
      else if(state.role.trim()==''){
          errors.role="role field is required";
          isValid =false;
      }
      else if(state.userPassword.toString().trim()==''){
          errors.userPassword="password is required";
          isValid =false;
      }

      setErros({...errors, errors:errors})
      return isValid
   }

  const handleInputs = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    // debugger
    setErros({errors, [event.target.name]:""})
  }

	// Password visibility on off
	const handleClickShowPassword = () => {
		console.log(values.password);
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Add User</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/user-management')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
        <div className={styles.box}>
        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>User Details</div>
            <div className={styles.grid}>
              <div className={styles.textfield}>
              <label style={{color: 'black'}}>Name</label>
                <input autocomplete="off" name="userName" value={state.userName} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.userName}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Phone Number</label>
                <input autocomplete="off" name="userNumber" value={state.userNumber} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.userNumber}</div>
              </div>

							<div className={styles.textfield}>
	              <label style={{color: 'black'}}>Email</label>
	              <input autocomplete="off" name="userEmail" value={state.userEmail} onChange={handleInputs} className={styles.inputfield} type="text" />
	              <div className={styles.error_message}>{errors.userEmail}</div>
	            </div>

            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Station Name</label>
              <select className={styles.select1} name="stationName" value={state.stationName} onChange={handleInputs}>
                <option selected disabled>Station Name</option>
                <option value="1">Pure CSS</option>
                <option value="2">No JS</option>
                <option value="3">Nice!</option>
            </select>
            <div className={styles.error_message}>{errors.stationName}</div>
            </div>

						<div className={styles.textfield}>
							<label style={{color: 'black'}}>Role</label>
							<select className={styles.select1} name="role" /*value={state.role}*/ onChange={handleInputs}>
								<option selected disabled>Role</option>
								<option value="1">Pure CSS</option>
								<option value="2">No JS</option>
								<option value="3">Nice!</option>
						</select>
						<div className={styles.error_message}>{errors.role}</div>
						</div>

            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Password</label>

              <input style={{position: 'relative'}} autocomplete="off" name="userPassword" value={state.userPassword} onChange={handleInputs} className={styles.inputfield} type={values.showPassword? "text" : "password"} />
							<IconButton
								style={{position: 'relative', backgroundColor: 'white', width: 33, height: 33}}
								className={styles.passwordIcon}
								aria-label="toggle password visibility"
								onClick={
									handleClickShowPassword
								}
								onMouseDown={
									handleMouseDownPassword
								}
								edge="end"
							>
								{values.showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
							<div style={{marginTop: -31}} className={styles.error_message}>{errors.userPassword}</div>
            </div>


						{/*Dummy Div*/}
						<div></div>
						<div></div>
						<div className={styles.saveButton}>
			      <Button style={{marginRight: 45}} onClick={() => history.push('/station-management')}  className={classes.button2} variant="contained">
			        Cancel
			      </Button>
			      <Button style={{width: 100, marginRight: 20}} onClick={handleSubmit} className={classes.button1} variant="contained">
			        Save
			      </Button>
			      </div>
            </div>
        </div>

      </div>

      {/* After Delete Modal */}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>{isAdd ? "Successfully Added Station": "Successfully Updated"} </strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button1}
							onClick={toggleModalClose}
						>
						OK
						</Button>
					</ModalFooter>
				</Modal>
    </div>
  );
}