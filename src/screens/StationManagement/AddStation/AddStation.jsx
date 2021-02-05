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
import styles from './AddStation.module.css';
import logo from './logo.png';
import flag from '../flag.svg';
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

export default function AddStation(props) {
  const [isAdd, setIsAdd] = useState(true);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const classes = useStyles();
  const history= useHistory();
  const [state, setState]=useState({
      stationName:"",
      stationCode:"",
      stationType:"",
      managedBy:"",
      noPlatforms:"",
      stationLatitude:"",
      stationLongitude:"",
      contractGiver:"",
      contractWinner:"",
      startDate:"",
      endDate:"",
      contractTenure:"",
  });

  const [details, setDetails] = useState({
    personName: "",
    personNumber: "",
    personEmail: "",
    adminName: "",
    adminNumber: "",
    adminEmail: "",
    adminPassword: ""
  })

  const [pchecked, setPChecked] = useState(false);
  const [achecked, setAchecked] = useState(false);
  const [errors , setErros]= useState({})
  // const [password, setPassword] = useState('');

  useEffect(()=>{
		autofillDetails()
	},[pchecked])

  const autofillDetails = () => {
    if(pchecked == true){
      debugger
      setDetails({
        ...details,
        adminName: details.personName,
        adminNumber: details.personNumber,
        adminEmail: details.personEmail
      })
    } else {
      setDetails({
        ...details,
        adminName: "",
        adminNumber: "",
        adminEmail: ""
      })
    }
  }

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
       var emailValid = details.adminEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var personEmail = details.personEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var mobileValid = details.adminNumber.toString().match(/^[0]?[6789]\d{9}$/);
       var usernameRegex = state.stationName.toString().match(/^[a-zA-Z0-9]+$/);
       var code = state.stationCode.match(/^[a-zA-Z]+$/);

       var isValid= true;
       if(state.stationName.trim()==''|| !usernameRegex){
           errors.stationName="station name is required or invalid name";
           isValid =false;
       }
      else if(state.stationCode.toString().trim()==''|| !code){
          errors.stationCode="station code is required or invalid code";
          isValid =false;
      }
    else  if(state.stationType.trim()==''){
          errors.stationType="station type is required";
          isValid =false;
      }
      else if(state.managedBy.trim()==''){
          errors.managedBy="managed by is required";
          isValid =false;
      }
      else if(state.noPlatforms.toString().trim()=='' || isNaN(state.noPlatforms)){
          errors.noPlatforms="number of platforms is required or invalid number";
          isValid =false;
      }

      else if(state.stationLatitude.toString().trim()=='' || isNaN(state.stationLatitude)){
          errors.stationLatitude="Latitude is required or invalid value";
          isValid =false;
      }

      else if(state.stationLongitude.toString().trim()=='' || isNaN(state.stationLongitude)){
          errors.stationLongitude="Longitude is required or invalid value";
          isValid =false;
      }

      else if(state.contractGiver.trim()=='' || !state.contractGiver.toString().match(/^[a-zA-Z0-9]+$/)){
          errors.contractGiver="contract giver field is empty or accept only alphabets";
          isValid =false;
      }
      else if(state.contractWinner.trim()==''|| !state.contractWinner.toString().match(/^[a-zA-Z0-9]+$/)){
          errors.contractWinner="contract winner field is empty";
          isValid =false;
      }
      else if(state.contractTenure.trim()=='' || !state.contractTenure.toString().match(/^[a-zA-Z0-9]+$/)){
          errors.contractTenure="contract tenure is required or invalid field";
          isValid =false;
      }

      else if(details.personName.trim()=='' || !details.personName.toString().match(/^[a-zA-Z0-9]+$/)){
          errors.personName="person name is required or invalid field";
          isValid =false;
      }
      else if(details.personNumber.trim()=='' || !details.personNumber.toString().match(/^[0]?[6789]\d{9}$/)){
          errors.personNumber="phone number is required or invalid number";
          isValid =false;
      }
      else if(details.personEmail.trim()=='' || !personEmail){
          errors.personEmail="email is required or invalid field";
          isValid =false;
      }
      else if(details.adminName.trim()=='' || !details.adminName.toString().match(/^[a-zA-Z0-9]+$/)){
          errors.adminName="admin name is required or invalid field";
          isValid =false;
      }
      else if(details.adminNumber.trim()=='' || !mobileValid){
          errors.adminNumber="number is required or invalid number";
          isValid =false;
      }
      else if(details.adminEmail.trim()=='' || !emailValid){
          errors.adminEmail="email is required or invalid email Id";
          isValid =false;
      }
      // else if(state.quantity.trim()==''){
      //     errors.quantity=(t("add_package.quantity_error"));
      //     isValid =false;
      // }
      setErros({...errors, errors:errors})
      return isValid
   }

  const handlecheckedChange = (event) => {
    console.log(event.target.checked);
    console.log(event.target.value);
    debugger
    if(event.target.name === 'person'){
      setPChecked(event.target.checked)
    } else {
      setAchecked(event.target.checked)
    }

    // setChecked(event.target.checked);
  };

  const passwordGenerate = () => {
    var randomstring = Math.random().toString(36).slice(-8);
    setDetails({
        ...details,
        adminPassword: randomstring
      })
    console.log(randomstring)
    debugger
  }

  const handleInputs = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    // debugger
    setErros({errors, [event.target.name]:""})
  }

  const handleDetails = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value
    })
    // debugger
    setErros({errors, [event.target.name]:""})
  }

  const handleChange = (date, type) => {
      debugger
        if(type=='start'){
          setState({
            ...state,
            startDate:moment(date).format("DD-MM-YYYY")
          })
        } else {
          setState({
            ...state,
            endDate:moment(date).format("DD-MM-YYYY")
          })
        }

   };

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Add Station</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/station-management')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
        <div className={styles.box}>
        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Details</div>
            <div className={styles.grid}>
              <div className={styles.textfield}>
              <label style={{color: 'black'}}>Station Name</label>
                <input autocomplete="off" name="stationName" value={state.stationName} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.stationName}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Station Code</label>
                <input style={{textTransform:'uppercase'}} autocomplete="off" name="stationCode" value={state.stationCode} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.stationCode}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Station Type</label>
                <select className={styles.select1} name="stationType" /*value={state.stationType}*/ onChange={handleInputs}>
                  <option selected disabled>Station Type</option>
                  <option value="1">Pure CSS</option>
                  <option value="2">No JS</option>
                  <option value="3">Nice!</option>
              </select>
              <div className={styles.error_message}>{errors.stationType}</div>
              </div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Managed By</label>
              <select className={styles.select1} name="managedBy" /*value={state.managedBy}*/ onChange={handleInputs}>
                <option selected disabled>Managed By</option>
                <option value="1">Pure CSS</option>
                <option value="2">No JS</option>
                <option value="3">Nice!</option>
            </select>
            <div className={styles.error_message}>{errors.managedBy}</div>
            </div>

            <div className={styles.textfield}>
              <label style={{color: 'black'}}>No. of Platforms </label>
              <input autocomplete="off" name="noPlatforms" value={state.noPlatforms} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.noPlatforms}</div>
            </div>

            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Station GPS Latitude</label>
              <input autocomplete="off" name="stationLatitude" value={state.stationLatitude} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.stationLatitude}</div>
            </div>

              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Station GPS Longitude</label>
                <input autocomplete="off" className={styles.inputfield} type="text" name="stationLongitude" value={state.stationLongitude} onChange={handleInputs}/>
                <div className={styles.error_message}>{errors.stationLongitude}</div>
              </div>
            </div>
        </div>

        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contract Details</div>
            <div className={styles.grid1}>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Giver</label>
                <input autocomplete="off" name="contractGiver" value={state.contractGiver} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.contractGiver}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Winner</label>
                <input autocomplete="off" name="contractWinner" value={state.contractWinner} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.contractWinner}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Start Date</label>
                <DatePicker
                  className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  selected={new Date()}
                  value={state.startDate}
                  onChange={(e) => handleChange(e,'start')} placeholderText='' />
                <div className={styles.error_message}>{errors.startDate}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Expected End Date</label>
                <DatePicker
                className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  selected={new Date()}
                  value={state.endDate}
                  onChange={(e) => handleChange(e,'end')} placeholderText='' />
                  <div className={styles.error_message}>{errors.endDate}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Tenure</label>
                <input autocomplete="off" name="contractTenure" value={state.contractTenure} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.contractTenure}</div>
              </div>
            </div>
        </div>

        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <div className={styles.box2}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contact Person Details</div>
          <div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Name</label>
              <input autocomplete="off" name="personName" value={details.personName} onChange={handleDetails} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.personName}</div>
            </div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Phone Number</label>
              <input autocomplete="off" name="personNumber" value={details.personNumber} onChange={handleDetails} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.personNumber}</div>
            </div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Email</label>
              <input autocomplete="off" name="personEmail" value={details.personEmail} onChange={handleDetails} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.personEmail}</div>
            </div>
            <div className={styles.textfield}>
            <FormControlLabel
              className={classes.label}
              control={
                <GreenCheckbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  className={styles.checkBox}
                  checked={pchecked}
                  onChange={handlecheckedChange}
                  name="person"
                />
              }
              label={
                <span
                  className={styles.checkBoxLabel}
                  style={{ color: "#272D3B"}}
                >
                    Assign as Station Admin{/*t('login.remember_me' )*/}
                </span>
              }
            />
            </div>
          </div>
          </div>

          <div className={styles.box2}>
        <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Admin</div>
        <div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Name</label>
            <input autocomplete="off" disabled={pchecked?true:false} name="adminName" value={details.adminName} onChange={handleDetails} className={styles.inputfield} type="text" />
            <div className={styles.error_message}>{errors.adminName}</div>
          </div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Phone</label>
            <input autocomplete="off" disabled={pchecked?true:false} name="adminNumber" value={details.adminNumber} onChange={handleDetails} className={styles.inputfield} type="text" />
            <div className={styles.error_message}>{errors.adminNumber}</div>
          </div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Email</label>
            <input autocomplete="off" disabled={pchecked?true:false} name="adminEmail" value={details.adminEmail} onChange={handleDetails} className={styles.inputfield} type="text" />
            <div className={styles.error_message}>{errors.adminEmail}</div>
          </div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Password</label>
            <div style={{display: 'flex'}}>
            <input autocomplete="off" name="adminPassword" value={details.adminPassword} onChange={handleDetails} className={styles.inputfield} type="text" />
            <button style={{display: 'contents'}} onClick={passwordGenerate}>
            <img style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={logo} />
            <small style={{display: 'flex', alignItems: 'center',color: 'black'}}>Autogenerate</small>
            </button></div>
          </div>

          <div className={styles.textfield}>
          <FormControlLabel
            className={classes.label}
            control={
              <GreenCheckbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                className={styles.checkBox}
                checked={achecked}
                onChange={handlecheckedChange}
                name="admin"
              />
            }
            label={
              <span
                className={styles.checkBoxLabel}
                style={{ color: "#272D3B"}}
              >
                  Share credentials via email{/*t('login.remember_me' )*/}
              </span>
            }
          />
          </div>
        </div>
          </div>
        </div>
      </div>
      <div className={styles.saveButton}>
      <Button style={{marginRight: 45}} onClick={() => history.push('/station-management')}  className={classes.button2} variant="contained">
        Cancel
      </Button>
      <Button style={{width: 100, marginRight: 20}} onClick={handleSubmit} className={classes.button1} variant="contained">
        Save
      </Button>
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
