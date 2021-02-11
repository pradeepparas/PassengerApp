import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link, Redirect } from "react-router-dom";
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

// Images
import downArrow from './downArrow.png';
import delete_logo from './delete.svg';
import edit from './edit.png';
import printer from './printer.png';
import flag from './flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';

// components
import styles from './StationManagement.module.css';
import styled from 'styled-components';
import { Modal1 } from './Modal';
import { GlobalStyle } from './globalStyles';
import * as constantValue from '../constants/constants';
import * as actions from "../../redux/actions/stationActions";
const api_url = constantValue.apiUrl;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Button1 = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
	textField: {
		["@media (min-width: 280px) and (max-width: 1158px)"]: {
			width: '60%'
		},
		["@media (min-width: 280px) and (max-width: 750px)"]: {
			width: '90%'
		},
	},
  textField1:{
		["@media (min-width: 280px) and (max-width: 1158px)"]: {
      width: '100%',
      marginBottom: 5
    },
    outline: 'none',
    width: 150,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      outline: 'none',
      borderColor: '#6c757d'
    },
    '&:hover': {
      outline: 'none',
      // borderColor: '#6c757d'
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
	link1: {
		width: '100%',
		borderRadius: 16,
    color: 'white',
    backgroundColor: '#b22222',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#b22222',
      color: '#FFF'
    }
	},
  button1: {
		["@media (min-width: 280px) and (max-width: 1158px)"]: {
      width: '60%',
      marginBottom: 5
    },
		["@media (min-width: 280px) and (max-width: 750px)"]: {
			width: '90%'
		},
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
		["@media (min-width: 280px) and (max-width: 1158px)"]: {
      width: '60%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		["@media (min-width: 280px) and (max-width: 750px)"]: {
			width: '90%'
		},
    // width: 170,
	},
	date1: {
    // width: 131,
    height: 40,
    fontSize: 12,
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    '&:hover': {
      outline: 'none',
      borderColor: 'red'
    },
	},
	input1: {
    '&:hover': {
      outline: 'none',
      borderColor: 'red'
    },
    height: 18,
    paddingLeft: 4,
    paddingRight: 1,
		color: "#4D4F5C",
		fontSize: "smaller",
	},
  focused1: {
    borderColor: 'white'
  }
}));

function createData(stationName, stationCode, stationType, managedBy, 
  noPlatforms, personName, personNumber, startDate, endDate,
  stationLatitude, stationLongitude, contractGiver, contractWinner, contractTenure, personEmail,
  adminName, adminNumber, adminEmail ) {
  return { stationName, stationCode, stationType, managedBy, 
    noPlatforms, personName, personNumber, startDate, endDate,
    stationLatitude, stationLongitude, contractGiver, contractWinner, contractTenure, personEmail,
    adminName, adminNumber, adminEmail };
}

const rows = [
  createData('Indore', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26", 
  "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
  createData('Bhopal', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26", 
  "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
  createData('Habib Ganj', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26", 
  "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
  createData('Indore', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26", 
  "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
  createData('Indore', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26", 
  "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
];

export function StationManagement(props) {
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })
	const [showModal, setShowModal] = useState(false);
	// const [rows, setRows] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
	const [arrayDetails, setArrayDetails] = useState([]);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [age, setAge] = React.useState('');

	const openModal = () => {
    setShowModal(prev => !prev);
  };
// Handle Delete function
	const handleDeleteSubmit = () => {
    console.log(arrayDetails.id)
    debugger
    props.deleteStation(arrayDetails.id)
		// set delete modal false
		setModal({
			deleteModal: false,
			deletedModal: true
		})
	}

  useEffect(() => {
    console.log(date.start)
    // debugger
  }, [date.start])

	// useEffect for Getting Data
	// useEffect(() => {
	// 	setRows(props.details)
	// 	console.log(rows)
	// 	debugger
	// }, [props.details])

  // Edit Station
  const editStation=(e, data, i)=>{
    data.id=i
    props.setStationData(data)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{
    rows[i].id = i;
    console.log(rows[i])
    debugger
  	setArrayDetails(rows[i]);
    setModal(true);
    console.log(arrayDetails)
    // debugger
    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {
			console.log(arrayDetails)
			// debugger
      setModal({
        details: true
      })
    }
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }

    // Changing Date fields
    const handleDateChange = (data, type) => {
      console.log(data)
      // debugger
      if(type == 'start') {
        setDate({
          ...date,
          start: data.target.value
        })
      } else {
        setDate({
          ...date,
          end: data.target.value
        })
      }
    }

    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })
    }

    // function for adding station or Setting IsEdit False
    const addStation = () => {
      props.setIsEditFalse(false)
    }

  return(
    <div className={styles.main}>
		{/*Modal for view details*/}
		<Modal1 showModal={showModal} setShowModal={setShowModal} />
		 <GlobalStyle />
      <div className={styles.header}>
        <div className={styles.title}>Station Management</div>
        <Link to="/station-management/add">
        <Button onClick={addStation} className={classes.link1} variant="contained">
          + Add Station
        </Button>
        </Link>
      </div>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            className={classes.textField1}
            id="outlined-adornment-weight"
            value={values.weight}
            onChange={handleChange('weight')}
            startAdornment={<SearchOutlinedIcon />}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              placeholder: 'Search',

              color: 'red',
              'aria-label': 'weight',
            }}
            // labelWidth={12}
          />
        </FormControl>

        {/*Search Button*/}
        <Button className={classes.button1} variant="contained">
          Search
        </Button>

         {/*Select*/}
         <div className={styles.selectDiv1}>
           <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
             <option selected disabled>Station Name</option>
             <option value="1">Indore</option>
             <option value="2">Bhopal</option>
             <option value="3">Habib Ganj</option>
         </select>
         </div>

          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
              <option selected disabled>Station Code</option>
              <option value="1">HBJ</option>
              <option value="2">IND</option>
              <option value="3">DWX</option>
          </select>
          </div>

            <div className={styles.selectDiv1}>
              <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
                <option selected disabled>Station Type</option>
                <option value="1">Urban</option>
                <option value="2">Rural</option>
                <option value="3">Semi Rural</option>
            </select>
            </div>

          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
              <option selected disabled>Managed By</option>
              <option value="1">Indian Railways</option>
              <option value="2">Bansal Constructions</option>
          </select>
          </div>

        <div className={classes.container1}>
				<TextField
					id="date"
					variant="outlined"
					type="date"
					size="small"
          name="start"
          value={date.start}
          onChange={(e) => handleDateChange(e, 'start')}
					className={classes.date1}
					InputProps={{
						placeholder: "From Date",
						classes: { input: classes.input1 },
						max: new Date().toISOString().slice(0, 10),
            focused: classes.focused1,
					}}
				/>
    		</div>

        <div className={classes.container1}>
				<TextField
					id="date"
					variant="outlined"
					type="date"
					size="small"
          name="end"
          value={date.end}
          onChange={(e) => handleDateChange(e, 'end')}
					className={classes.date1}
					InputProps={{
            min: date.start.toString().slice(0, 10),
						placeholder: "From Date",
						classes: { input: classes.input1 },
						focused: classes.focused1,
					}}
				/>
    		</div>
      </div>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor: '#e4e4e4'}}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="center">Station Name</TableCell>
            <TableCell align="center">Station Code</TableCell>
            <TableCell align="center">Station Type</TableCell>
            <TableCell align="center">Managed By</TableCell>
            <TableCell align="center">No. of Platforms</TableCell>
            <TableCell align="center">Contact Person</TableCell>
            <TableCell align="center">Contact Person Mobile</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {rows.length > 0 && <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
							<TableCell align="center">{row.stationName}</TableCell>
              <TableCell align="center">{row.stationCode}</TableCell>
              <TableCell align="center">{row.stationType}</TableCell>
              <TableCell align="center">{row.managedBy}</TableCell>
              <TableCell align="center">{row.noPlatforms}</TableCell>
              <TableCell align="center">{row.personName}</TableCell>
              <TableCell align="center">{row.personNumber}</TableCell>
              <TableCell align="center">{row.startDate}</TableCell>
              <TableCell align="center">{row.endDate}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                  <Link to={`station-management/${index}`}><div onClick={(e) => editStation(e, row, index)}>Edit Details</div></Link>
                  <a><div onClick={(e) => toggleModal(e, 'delete', index)}>Delete Station</div></a>
                </div>
                </div></TableCell>
            </TableRow>
          ))}

        </TableBody>}
      </Table>
    </TableContainer>
		{rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted Station</strong>  </p>
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

      <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.stationName} Station?</strong>  </p>

					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button2}
							onClick={toggleModalClose}
						>
						NO
						</Button>
						<Button
              style={{width: 100}}
							variant="contained"
							className={classes.button1}
							onClick={(e) => { handleDeleteSubmit(e) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>

				{/* Modal for view Details */}
				<Modal className={styles.modalContainer} contentClassName={styles.customClass}
				 isOpen={modal.details} toggle={toggleModalClose} centered={true}>
				 <CancelIcon
					 style={{
						 width: 40,
						 height: 40,
						 backgroundColor: 'white',
						 color: "#b22222",
						 borderRadius: 55,
						 position: "absolute",
						 top: "-14",
						 right: "-16",
						 cursor: "pointer",
					 }}
					 onClick={toggleModalClose}
				 />
				 <div style={{display: 'flex', justifyContent: 'flex-end'}}>
				 <Link to={`station-management/1`}><button className={styles.modalButton}/*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
				 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={edit} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Edit Details</small>
				 </button></Link>
				 <button className={styles.modalButton} /*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
				 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={printer} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
				 </button>
				 </div>
						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>

						<div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Name</span><span style={{marginLeft: 80,marginRight: 25}}> - </span>{arrayDetails.stationName}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Code</span><span style={{marginLeft: 86,marginRight: 25}}> - </span>{arrayDetails.stationCode}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Type</span><span style={{marginLeft: 88,marginRight: 25}}> - </span>{arrayDetails.stationType}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>No. of Platforms</span><span style={{marginLeft: 66,marginRight: 25}}> - </span>{arrayDetails.noPlatforms}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station GPS Coordinates</span><span style={{marginLeft: 15,marginRight: 25}}> - </span>{arrayDetails.stationLatitude}°N, {arrayDetails.stationLongitude}°E
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Managed By</span><span style={{marginLeft: 90,marginRight: 25}}> - </span>{arrayDetails.managedBy}
								</div>
								</div>
						</div>

						<div className={styles.box1}>
						<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contract Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Giver</span><span style={{marginLeft: 60,marginRight: 25}}> - </span>{arrayDetails.contractGiver}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Winner</span><span style={{marginLeft: 46,marginRight: 25}}> - </span>{arrayDetails.contractWinner}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Start Date</span><span style={{marginLeft: 29,marginRight: 25}}> - </span>{arrayDetails.startDate}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Tenure</span><span style={{marginLeft: 50,marginRight: 25}}> - </span>{arrayDetails.contractTenure}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Expected End Date</span><span style={{marginLeft: 31,marginRight: 25}}> - </span>{arrayDetails.endDate}
							</div>
							<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}></span><span style={{marginLeft: 80,marginRight: 25}}> </span>
							</div>
							</div>
							</div>
						</div>

						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>
						<div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contact Person Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Name</span><span style={{marginLeft: 134,marginRight: 25}}> - </span>{arrayDetails.personName}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Phone Number</span><span style={{marginLeft: 76,marginRight: 25}}> - </span>{arrayDetails.personNumber}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Email</span><span style={{marginLeft: 137,marginRight: 25}}> - </span>{arrayDetails.personEmail}
								</div>
								</div>
						</div>

						<div className={styles.box1}>
						<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Admin Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Name</span><span style={{marginLeft: 115,marginRight: 25}}> - </span>{arrayDetails.adminName}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Phone Number</span><span style={{marginLeft: 57,marginRight: 25}}> - </span>{arrayDetails.adminNumber}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Email</span><span style={{marginLeft: 118,marginRight: 25}}> - </span>{arrayDetails.adminEmail}
							</div>
							</div>
							</div>
						</div>
					</Modal>


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      <Pagination count={rows.length} shape="rounded" classes={{ ul: classes.ul1 }} size='small'/>
      </div>
      </div>}
			</div>
  );
}

const mapStateToProps = (state) => {
	return {
		details: state.Stations.details,
		// loading: state.auth.loading,
		// error: state.auth.error,
		// isAuthenticated: state.auth.token !== null,
		// authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    setStationData: (data) => {
      dispatch(actions.setStationDate(data)) 
    },
    setIsEditFalse: (value) => {
      dispatch(actions.setIsEditFalse(value))
    },
    deleteStation: (id) => {
      dispatch(actions.deleteStation(id))
    }
		// add_station: (details) =>
		// 	dispatch(actions.stationActions(details))
		// onAuth: (username, password) =>
		// 	dispatch(actions.auth(username, password)),
		// 	updateSignup:()=>
		// 	  dispatch(actions.updateSingupFlag()),
		// onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default compose(connect(mapStateToProps,  mapDispatchToProps))(StationManagement);
