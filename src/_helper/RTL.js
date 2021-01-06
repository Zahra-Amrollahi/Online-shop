import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux

// CSS
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";

import { createGenerateClassName, StylesProvider, jssPreset } from "@material-ui/core/styles";
import vazir2 from '../fonts/Vazir.woff';



const vazir = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: vazir2
};

//import JssProvider from 'react-jss/lib/JssProvider';


// Configure JSS

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Theme
////import { themeObject } from "./styling/theme";

// Helpers
//import get from "lodash/get";
// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

//const G_isRtl = document.body.getAttribute("dir") === "rtl";

class RTL extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.node
    ]),
    
  };

  render() {
   
    

    const theme = createMuiTheme({
      
      direction: 'rtl',
      typography: {
        fontFamily: 'vazir',
      },
    });

    return (
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>{this.props.children}</MuiThemeProvider>
      </StylesProvider>
    );
  }
}

export default RTL;