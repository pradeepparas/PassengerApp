import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from 'redux';
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
import downArrow from '../StationManagement/downArrow.png';
import delete_logo from '../StationManagement/delete.svg';
import edit from '../StationManagement/edit.png';
import flag from '../StationManagement/flag.svg';

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
import styles from './Vendors.module.css';
import * as actions from "../../redux/actions/vendorActions";
// import styled from 'styled-components';

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
      width: '100%'
    }
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
  button1: {
    ["@media (min-width: 280px) and (max-width: 1158px)"]: {
      width: '100%',
      marginBottom: 5
    },
    borderRadius: 80,
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
		["@media (min-width: 280px) and (max-width: 1158px)"]: {
      width: '100%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		display: "flex",
		// flexWrap: "wrap",
    width: 192,
	},
	table: {
		overflowX: 'scroll'
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
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
  input1: {
    '&:hover': {
      outline: 'none',
      // backgroundColor: 'red',
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

// function createData(userName, userNumber, userEmail, service, stationName, hours, date) {
//   return { userName, userNumber, userEmail, service, stationName, hours, date };
// }

// const rows = [
//   createData("John Doe", 8854875896, "john@gmail.com", "Medicines", "Habib Ganj","Mon - Sat (10 AM - 10 PM)", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "Food and Beverages", "Bhopal","Mon - Sat (10 AM - 10 PM)", "01/01/21"),
//   createData("Mark", 8854875896, "john@gmail.com", "Medicines", "Indore","Mon - Sat (10 AM - 10 PM)", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "Medicines", "Habib Ganj","Mon - Sat (10 AM - 10 PM)", "01/01/21"),
//   createData("Jack", 8854875896, "john@gmail.com", "Food and Beverages", "Habib Ganj","Mon - Sat (10 AM - 10 PM)", "01/01/21"),
// ];

export function Vendors(props) {
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })
  const [rows, setRows] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
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
		// set delete modal false
		setModal({
			deleteModal: false,
			deletedModal: true
		})
	}

  useEffect(() => {
    // setRoleList(props.role)
    // if(props.userDetails){
    //   setDropDownDetails(props.userDetails)
    //   console.log(props.userDetails)
    //   // debugger
    // }

    if(props.vendorDocs){
      // console.log("",props.vendorDocs)
      setRows(props.vendorDocs)
      debugger
    }
  }, [props.vendorDocs])

  // Getting Vendors List
  useEffect(() => {
    // props.getRole();
    // props.getUserData();
    props.getVendorDataByParams(1, 10);
    // debugger
  }, [])

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

  // Get Vendors Data List


  // Search Field Value
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{
  	setModal(true);
    setArrayDetails(rows[i]);

    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {
			
      setModal({
        details: true
      })
    }
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }
    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })
    }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Vendors</div>
      </div>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <div className={styles.searchBarDiv}>
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
             <option selected disabled>Vendor Name</option>
             <option value="1">John Doe</option>
             <option value="2">Name</option>
         </select>
         </div>

         <div className={styles.selectDiv1}>
           <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
             <option selected disabled>Services Offered</option>
             <option value="1">Medicines</option>
             <option value="2">Food And Beverages</option>
             <option value="3">Porter</option>
         </select>
         </div>

          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
              <option selected disabled>Delivery Station</option>
              <option value="1">Bhopal</option>
              <option value="2">Indore</option>
              <option value="2">Habib Ganj</option>
          </select>
          </div>
          </div>

        <div className={styles.dateDiv}>
        <div className={classes.container1}>
        <label style={{width: 70}} className={styles.dateLabel}>From Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            placeholder="From Date"
    				// defaultValue={new Date()}
            name="start"
            value={date.start}
            onChange={(e) => handleDateChange(e, 'start')}
    				className={classes.date1}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    				// InputLabelProps={{
            //   placeholder: 'From Date',
    				// 	shrink: true,
    				// }}
    			/>
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
    				// defaultValue={new Date()}
            name="end"
            value={date.end}
            onChange={(e) => handleDateChange(e, 'end')}
    				className={classes.date1}
    				// InputLabelProps={{
            //   label: 'To Date',
    				// 	shrink: true,
            //   classes: { input: classes.input1 },
            //   focused: classes.focused1,
    				// }}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    			/>
    		</div>
        </div>
      </div>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor: '#e4e4e4'}}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="center">Vendor Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Registration Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.mobile}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{moment(row.createdAt).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                  <a><div onClick={(e) => toggleModal(e, 'delete', index)}>Block</div></a>
                </div>
                </div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Blocked Vendor</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
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
				</Modal>}

			{/*Delete User*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to block {arrayDetails.userName} Vendor?</strong>  </p>

					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
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
				</Modal>}

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
						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>

						<div className={styles.box1}>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Name</span><span style={{marginLeft: 60,marginRight: 25}}> - </span>{arrayDetails.name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Mobile Number</span><span style={{marginLeft: 49,marginRight: 25}}> - </span>{arrayDetails.mobile}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Email</span><span style={{marginLeft: 112,marginRight: 25}}> - </span>{arrayDetails.email}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Warehouse Address</span><span style={{marginLeft: 22,marginRight: 25}}> - </span>{arrayDetails.warehouse_address}
								</div>
                {/* Empty Div */}
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}></span><span style={{marginLeft: 90,marginRight: 25}}></span>
								</div>
								</div>
						</div>

						<div className={styles.box1}>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Service Offered</span><span style={{marginLeft: 94,marginRight: 25}}> - </span>-
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Delivery Station</span><span style={{marginLeft: 90,marginRight: 25}}> - </span>-
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Operational Hours</span><span style={{marginLeft: 75,marginRight: 25}}> - </span>-
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Delivery Preparation Duration</span><span style={{marginLeft: 2,marginRight: 25}}> - </span>45 mins
							</div>
              { /* Extra div */ }
							<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}></span><span style={{marginLeft: 80,marginRight: 25}}> </span>
							</div>
							</div>
							</div>
						</div>
            <ModalFooter className={styles.footer}>
  						<Button
                style={{width: 100}}
  							variant="contained"
                color="black"
                className={classes.button1}
  							onClick={toggleModalClose}
  						>
  						Ok
  						</Button>
  					</ModalFooter>
					</Modal>


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      <Pagination count={10} shape="rounded" classes={{ ul: classes.ul1 }} size='small'/>
      </div>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
	debugger
	return {
	  vendorDocs: state.Vendors.docs,
    total: state.Vendors.total,
    limit: state.Vendors.limit
    
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    getVendorDataByParams: (pageNo, size, params) => {
      dispatch(actions.getVendorDataByParams(pageNo, size, params))
    },
    // getRole: () => {
    //   dispatch(actions.getRole())
    // },
    // getUserData: () => {
    //   dispatch(getStationData())
    // },
    // setIsEditFalse: (value) => 
    //   dispatch(actions.setIsEditFalse(value)),
		// // add_user: (user) =>
		// // 	dispatch(actions.userActions(user))
	  // setUserData	: (data) =>
		// 	dispatch(actions.setUserData(data)),
    // deleteUser: (id) => 
    //   dispatch(actions.deleteUser(id))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Vendors);