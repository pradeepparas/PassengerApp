import React from 'react';
// zIndex
// Material UI
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// Import Images
// import dashboard from './images/Dashboard.png';
import home from "./images/home.svg";
import user_alt1 from './images/user_alt1.svg';
import account_logout from "./images/account_logout.svg";
import dropdown_circle from "./images/dropdown_circle.svg";
import Logo from './images/Logo.svg';
import rupee from './images/rupee.svg';
import servicestack from './images/servicestack.svg';
import train1 from './images/train1.svg';
import train from './images/train.svg';
import user_alt from './images/user_alt.svg';
import user_astronaut from './images/user_astronaut.svg';
import users from './images/users.svg';
import users_cog from './images/users_cog.svg';

// components
import styles from "./Drawer.module.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiListItem-root': {
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 30,
      marginBottom: 30
    },
    // '& .MuiListItemText-root span': {
    //   fontSize: 12
    // },
    '& .MuiListItem-root:hover': {
      color: '#b22222',
      backgroundColor: '#b22222'
    }
  },
  paper1: {
    width: 110,
    overflow: 'hidden',
    marginTop: 12,
    borderRadius: 6
  },
  menuList1: {
    '& .MuiListItem-root': {
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 0,
      marginBottom: 0,
      fontSize: 12,
      fontWeight: '500'
    },
    '& .MuiListItem-root:hover': {
      backgroundColor: 'white',
    },
    backgroundColor: 'white'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  list: {
    color: '#d48383'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: '80%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 1,
    // color: 'black',
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    // backgroundColor: 'yellow',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    ["@media (min-width: 280px) and (max-width: 1318px)"]: {
			position: 'fixed',
			zIndex: 500,
			width: '260px'
		},
    backgroundColor: '#B22222',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: 500,
    backgroundColor: '#B22222',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    minWidth: 0,
    backgroundColor: 'white',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // Profile
  const [open_Profile, setOpenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenProfile((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenProfile(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenProfile(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open_Profile);
  React.useEffect(() => {
    if (prevOpen.current === true && open_Profile === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open_Profile;
  }, [open_Profile]);
  // Profile

  const handleDrawerOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{color: 'white'}} className={classes.root}>
      <CssBaseline style={{color: 'white'}}/>
      <AppBar
        position="fixed"
        style={{color: 'white'}}
        className={clsx(classes.appBar, /*{
          [classes.appBarShift]: open,
        }*/)}
      >
        <Toolbar style={{backgroundColor: 'white',minHeight: 57}}>
        <div className={styles.header} style={{ borderRightStyle: 'groove'}}>MASTER ADMIN</div>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, /*{
              [classes.hide]: open,
            }*/)}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{color: 'white'}} variant="h6" noWrap>

          </Typography>
          <div style={{ width: '77%'}}>
          <div style={{float: 'right'}}>
            <Button
              ref={anchorRef}
              aria-controls={open_Profile ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              John Doe <img style={{width: 15, height: 15, marginLeft: 10}} src={dropdown_circle} />
            </Button>
            <Popper  open={open_Profile} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              className={classes.paper1}
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList className={classes.menuList1} autoFocusItem={open_Profile} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile <img style={{width: 15, height: 15, marginLeft: 25}} src={user_alt1} /></MenuItem>
                    <MenuItem onClick={handleClose}>Logout <img style={{width: 15, marginLeft: 25,height: 15}} src={account_logout} /></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div></div>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{color: 'white'}}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div style={{color: 'white',minHeight: 57}} className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List style={{paddingTop: 40}}>
            <ListItem className={styles.active} button>
              <ListItemIcon><img className={styles.selected} src={home} /></ListItemIcon>
              <ListItemText className={styles.selectedText} primary={"Dashboard"} />
            </ListItem>

            <ListItem className={styles.list} button>
              <ListItemIcon><img className={styles.filter} src={train} /></ListItemIcon>
              <ListItemText className={styles.listText} primary={"Station Management"} />
            </ListItem>

            <ListItem className={styles.list} button>
              <ListItemIcon><img className={styles.filter} src={user_alt} /></ListItemIcon>
              <ListItemText className={styles.listText} primary={"User Management"} />
            </ListItem>

            <ListItem className={styles.list} button>
              <ListItemIcon><img className={styles.filter} src={user_astronaut} /></ListItemIcon>
              <ListItemText className={styles.listText} primary={"Vendor Reports"} />
            </ListItem>

            <ListItem className={styles.list} button>
              <ListItemIcon><img className={styles.filter} src={rupee} /></ListItemIcon>
              <ListItemText className={styles.listText} primary={"Revene Reports"} />
            </ListItem>

            <ListItem className={styles.list} button>
              <ListItemIcon><img className={styles.filter} src={users} /></ListItemIcon>
              <ListItemText className={styles.listText} primary={"App User Reports"} />
            </ListItem>

            <ListItem className={styles.list} button>
              <ListItemIcon><img className={styles.filter} src={users_cog} /></ListItemIcon>
              <ListItemText className={styles.listText} primary={"Profile Settings"} />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div id="toolbar" className={classes.toolbar} />
        {props.page}
      </main>
    </div>
  );
}
