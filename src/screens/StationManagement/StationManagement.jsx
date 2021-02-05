import React, { useState } from 'react';
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
  textField1:{
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function StationManagement(props) {
	const [showModal, setShowModal] = useState(false);

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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data)=>{
  	setModal(true);
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
		{/*Modal for view details*/}
		<Modal1 showModal={showModal} setShowModal={setShowModal} />
		 <GlobalStyle />
      <div className={styles.header}>
        <div className={styles.title}>Station Management</div>
        <Link to="/station-management/add">
        <Button className={classes.button1} variant="contained">
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
         <div /*className={styles.select1}*/>
           <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
             <option selected disabled>Station Name</option>
             <option value="1">Pure CSS</option>
             <option value="2">No JS</option>
             <option value="3">Nice!</option>
         </select>
         </div>

          <div /*className={styles.select1}*/>
            <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
              <option selected disabled>Station Code</option>
              <option value="1">Pure CSS</option>
              <option value="2">No JS</option>
              <option value="3">Nice!</option>
          </select>
          </div>

            <div /*className={styles.select1}*/>
              <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
                <option selected disabled>Station Type</option>
                <option value="1">Pure CSS</option>
                <option value="2">No JS</option>
                <option value="3">Nice!</option>
            </select>
            </div>

          <div /*style={{borderWidth: 2}} className={styles.select1}*/>
            <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
              <option selected disabled>Managed By</option>
              <option value="1">Pure CSS</option>
              <option value="2">No JS</option>
              <option value="3">Nice!</option>
          </select>
          </div>

        <div className={classes.container1}>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            placeholder="From Date"
    				defaultValue={new Date()}
    				className={classes.date1}
            InputProps={{
              placeholder: "From Date",
              endAdornment: null,
            }}
    				// InputLabelProps={{
            //   placeholder: 'From Date',
    				// 	shrink: true,
    				// }}
    			/>
          {/*<DatePicker
            className={styles.input_s}
            peekNextMonth showMonthDropdown showYearDropdown
            dropdownMode="select"
            selected={new Date()}
            value={new Date()}
            onChange={(e) => handleChange(e,'end')} placeholderText='Start Date' />
            <img style={{width: 15, height: 15}} src={downArrow} />*/}
    		</div>

        <div className={classes.container1}>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
    				defaultValue={new Date()}
    				className={classes.date1}
    				InputLabelProps={{
              placeholder: 'To Date',
    					shrink: true,
    				}}
    			/>
    		</div>
      </div>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor: '#e4e4e4'}}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="right">Station Name</TableCell>
            <TableCell align="right">Station Code</TableCell>
            <TableCell align="right">Station Type</TableCell>
            <TableCell align="right">Managed By</TableCell>
            <TableCell align="right">No. of Platforms</TableCell>
            <TableCell align="right">Contact Person</TableCell>
            <TableCell align="right">Contact Person Mobile</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details')}>View Details</div></a>
                  <Link to={`station-management/${index}`}><div onClick={() => console.log('hello')}>Edit Details</div></Link>
                  <a><div onClick={(e) => toggleModal(e, 'delete')}>Delete Station</div></a>
                </div>
                </div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete Bhopal Station?</strong>  </p>

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
				 <Link to={`station-management/${1}`}><button className={styles.modalButton}/*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
				 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={edit} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Edit Details</small>
				 </button></Link>
				 <button className={styles.modalButton} /*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
				 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={printer} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
				 </button>
				 </div>
						<div style={{display: 'flex'}}>

						<div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Name</span><span style={{marginLeft: 80,marginRight: 25}}> - </span>Dewas
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Code</span><span style={{marginLeft: 86,marginRight: 25}}> - </span>DWS
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Type</span><span style={{marginLeft: 88,marginRight: 25}}> - </span>Urban
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>No. of Platforms</span><span style={{marginLeft: 66,marginRight: 25}}> - </span>05
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station GPS Coordinates</span><span style={{marginLeft: 15,marginRight: 25}}> - </span>23N 54E
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Managed By</span><span style={{marginLeft: 90,marginRight: 25}}> - </span>Bansal Constructions
								</div>
								</div>
						</div>

						<div className={styles.box1}>
						<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contract Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Giver</span><span style={{marginLeft: 60,marginRight: 25}}> - </span>Indian Railways
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Winner</span><span style={{marginLeft: 46,marginRight: 25}}> - </span>Bansal Constructions
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Start Date</span><span style={{marginLeft: 29,marginRight: 25}}> - </span>17 July
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Tenure</span><span style={{marginLeft: 50,marginRight: 25}}> - </span>05 Years
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Expected End Date</span><span style={{marginLeft: 31,marginRight: 25}}> - </span>25 July
							</div>
							<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}></span><span style={{marginLeft: 80,marginRight: 25}}> </span>
							</div>
							</div>
							</div>
						</div>

						<div style={{display: 'flex'}}>
						<div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contact Person Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Name</span><span style={{marginLeft: 134,marginRight: 25}}> - </span>ABC
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Phone Number</span><span style={{marginLeft: 76,marginRight: 25}}> - </span>8875485689
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Email</span><span style={{marginLeft: 137,marginRight: 25}}> - </span>abc@gmail.com
								</div>
								</div>
						</div>

						<div className={styles.box1}>
						<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Admin Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Name</span><span style={{marginLeft: 115,marginRight: 25}}> - </span>ABC
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Phone Number</span><span style={{marginLeft: 57,marginRight: 25}}> - </span>8523568978
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Email</span><span style={{marginLeft: 118,marginRight: 25}}> - </span>abc@gmail.com
							</div>
							</div>
							</div>
						</div>
					</Modal>


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      <Pagination count={10} shape="rounded" classes={{ ul: classes.ul1 }} size='small'/>
      </div>
      </div>}
    // </div>
  );
}