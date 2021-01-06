import React from 'react';
import CategoryItem from './categoryItem';
import { connect } from 'react-redux';
import { makeStyles, rgbToHex, ThemeProvider } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';

import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Badge from '@material-ui/core/Badge';

import { Link } from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import CssBaseline from '@material-ui/core/CssBaseline';
import MailIcon from '@material-ui/icons/Mail';
import { useTheme } from '@material-ui/core/styles';
import { categoryAction } from '../_actions';
import RTL from '../_helper/RTL';

//debugger
const drawerWidth = 240;
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//     display: 'flex',
//   }



// }))(MenuItem);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',


  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },

  },
  list: {

    width: '100%',
    textAlign: 'center'
  },


  appBar: {

    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,

    },
  },
  toolbar: theme.mixins.toolbar,
  toolbarRoot: {
    justifyContent: 'space-around'
  },
  drawerPaper: {
    width: drawerWidth,

  },
  // toolbar: {

  //   display: 'flex',
  //   padding: "100px 0",
  //   justifyContent: "space-between",
  //   flexWrap: "wrap",



  // },


  // appBar: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //   },
  // },


  menuButton: {

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  StyledMenuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    display: 'flex',
  }
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },
  // title: {
  //   flexGrow: 1,
  // },

  // paper: {
  //   marginRight: theme.spacing(2)
  // },
}));

const e2p = (s) => {
  return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}

function SimpleAppBar(props) {


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  debugger
  props.categories.status || props.dispatch(categoryAction.getAll());
  const { width } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { window } = props;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (

    <div id="drawer-container" >
      <div className={classes.toolbar} />

      <List id="drawer-list" className={classes.list}>
        <Typography component="h5" variant="h5">دسته بندی محصولات</Typography>
        {props.categories.categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </List>

    </div>

  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <RTL>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer id={"drawer"}
              container={container}
              variant="temporary"
              anchor={'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              anchor={'left'}
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <AppBar position="relative" className={classes.appBar}>

          <Toolbar className={classes.toolbarRoot} >

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </IconButton>



            <IconButton component={Link} to="/product" color="inherit" aria-label="menu">
              <FontAwesomeIcon icon={faStore} size="2x" />
              {/*
             <Hidden smDown>
              <Typography>فروشگاه</Typography>
            </Hidden>
           */}
            </IconButton>

            { /* <IconButton className={classes.menuButton} component={Link} to="/Wish" color="inherit" aria-label="menu">
            <FontAwesomeIcon icon={faHeart} size="2x"/>
            <Hidden smDown>
              <Typography>علاقه مندی ها</Typography>
            </Hidden>
          </IconButton>*/ }
            <IconButton color="inherit" component={Link} to="/Cart" aria-label="menu">
              <StyledBadge badgeContent={props.cartItemsCount} color="secondary">
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                {/*
               <Hidden smDown>
                <Typography>سبد خرید</Typography>
              </Hidden>
             */}
              </StyledBadge>

            </IconButton>
            <IconButton color="inherit" aria-label="menu"
              onClick={handleClick}
            >

              <FontAwesomeIcon icon={faUser} size="2x" />
              <Typography className={classes.typography}>{props.user.user_Nicename || "حساب کاربر"}</Typography>
              {/*
    <Hidden smDown>
    
  </Hidden>
  */}







            </IconButton>

            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >

              <MenuItem component={Link} to="/Login">
                <ListItemIcon fontSize="large">
                  <FontAwesomeIcon icon={faUserCheck} size="2x" />
                </ListItemIcon>
                <ListItemText primary="وارد شوید " />
              </MenuItem>
              <MenuItem component={Link} to="/Register">
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUserPlus} size="2x" />
                </ListItemIcon>
                <ListItemText primary="ثبت نام کنید " />
              </MenuItem>
              <MenuItem component={Link} to="/Profile">
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUserCog} size="2x" />
                </ListItemIcon>
                <ListItemText primary="تنظیمات  " />
              </MenuItem>
            </StyledMenu>



          </Toolbar>
        </AppBar>

      </div>
    </RTL>



  );
}
SimpleAppBar.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

function mapStateToProps(state) {
  //debugger
  return {
    categories: state.categories
};

}


export default connect(mapStateToProps)(SimpleAppBar);


