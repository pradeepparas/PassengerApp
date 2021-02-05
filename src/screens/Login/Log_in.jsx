import React, { useState } from "react";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import Cookies from 'js-cookie';
import { Link, Redirect } from "react-router-dom";

// Images
import background1 from "./images/background1.png";
import left_image1 from "./images/left_image1.png";
import header from "./images/header.png";
import next_header from "./images/next_header1.png"
import button1 from "./images/button1.png";

// Components
import styles from "./Log_in.module.css";

// Material UI
// import { green } from '@material-ui/core/colors';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

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

const useStyles = makeStyles((theme) => ({
	root: {
    '& checked': {
      color: 'green',
    },
    '& label.Mui-focused': {
			fontSize: '14px',
			fontFamily: 'Montserrat',
			fontWeight: 'normal',
      color: '#272D3B',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#272D3B',
    },
		"& .MuiTextField-root": {
			margin: theme.spacing(2),
			width: "25em",
			display: "block",
			["@media (max-width:320px)"]: {
				width: "90%",
			},
			["@media (min-width:321px) and (max-width:500px)"]: {
				width: "19em",
			},
		},

		"& .MuiOutlinedInput-input": {
			padding:"16.5px 10px",
			["@media (max-width:500px)"]: {
				padding:"14px 10px 17px",
			},
		},

		"& .MuiFormLabel-root": {
			fontSize:"1.1rem",
			["@media (max-width:500px)"]: {
				fontSize:"0.9rem",
			},
		},

		"& .MuiButton-root": {
			width:"90%",
			["@media (max-width:500px)"]: {
				width:"90%",
			},
		},

	},
	label: {
		color: "red",
		["@media (max-width:320px)"]: {},
	},
}));

const Log_in = (props) => {
  // const [t, i18n] = useTranslation('common');
	// const history = useHistory();

	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [username_ErMsg, setusername_ErMsg] = useState("");
	const [password_ErMsg, setpassword_ErMsg] = useState("");
	const [displaytext, setdisplaytext] = useState("hideBlock");
	// const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [collapseLng, setLngCollapse] = useState(false);

  const handleUsernameChange = (event) => {
		setUsername(event.target.value);
		setusername_ErMsg('');
	};

  const handleChange = (event) => {
    if(!event.target.checked){
      Cookies.remove('username');
      Cookies.remove('password');
      Cookies.remove('checked');
    }
    setChecked(event.target.checked);
  };

  const handlePasswordChange = (event) => {

		setPassword(event.target.value);
		setpassword_ErMsg('');
	};
	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		console.log(values.password);
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

  const handleSubmit = (event) => {
    console.log('clicked')
		event.preventDefault();
		if(username.trim()==''){
		// setusername_ErMsg(t('login.username_error'))
		setdisplaytext('showBlock')
	    return
		}
		else if(password.trim()==''){
			// setpassword_ErMsg(t('login.password_error'))
			setdisplaytext('showBlock')
			return
		}
		if(checked){
			Cookies.remove('username');
			Cookies.remove('password');
			Cookies.remove('checked');
			Cookies.set('username',username , { expires: 7 });
			Cookies.set('password',password, { expires: 7 });
			Cookies.set('checked', true, { expires: 7 });
		}

		setIsLoading(true);
		// props.onAuth(username, password);
	};

  return(
    <div>
      <Container fluid={true}>
      <Row>
        <Col md="6" className={styles.left}>
          <div className={styles.image1}>
            <img src={background1} className={styles.background}/>
            <div style={{height: "100%",display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
            <img src={left_image1} style={{zIndex: 1}} className={styles.image} />
            </div>
          </div>
        </Col>
        <Col md="6" className={styles.right}>
          <div className={styles.box}>
            <div className={styles.header}>
              <img src={header} className={styles.passenger}/>
              <div className={styles.next_header}>
                <img src={next_header}  />
                <h2 style={{color: '#B22222'}} className={styles.master_header}>MASTER ADMIN LOGIN</h2>
              </div>
              <form
								className={classes.root}
								noValidate
								autoComplete="off"
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
								onSubmit={handleSubmit}
							>
              <TextField
                required
                // className={classes.}
                id="standard-basic"
                label={
                  <span
                    // className={
                    // 	styles.usernamePassowrdLabel
                    // }
                  >
                  Mobile/Email Address
                    {/*t('login.username' )*/}
                  </span>
                }
                // variant="standard-basic"
                fullWidth={true}
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                required
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      Password{/*t('login.password' )*/}
                  </span>
                }
                type={
                  values.showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                // variant="standard-adornment-password"
                fullWidth={true}
                onChange={handlePasswordChange}
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
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
                    </InputAdornment>
                  ),
                }}
              />
              <div className={styles.forgotPwdDiv}>
                <FormControlLabel
                  className={classes.label}
                  control={
                    <GreenCheckbox
											icon={<RadioButtonUncheckedIcon />}
											checkedIcon={<CheckCircleIcon />}
                      className={styles.checkBox}
                      checked={checked}
                      onChange={handleChange}
                      name="remember me"
                    />
                  }
                  label={
                    <span
                      className={styles.checkBoxLabel}
                      style={{ color: "#272D3B"}}
                    >
                        Remember Me{/*t('login.remember_me' )*/}
                    </span>
                  }
                />
                <div style={{ paddingBottom: "10px" }}>
                  <a
                    href="#"
                    className={styles.forgotPassword}
                  >
                    <Link
                      to="/forgot-password"
											className={styles.checkBoxLabel}
                      style={{ color: "#272D3B" }}
                    >
                      <span>Forgot Password{/*t('login.forgot_password' )*/}</span>
                    </Link>
                  </a>
                </div>
              </div>
							<div className={styles.wrap}>
  							<button onSubmit={handleSubmit} className={styles.button1}>LOGIN</button>
							</div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default Log_in;
