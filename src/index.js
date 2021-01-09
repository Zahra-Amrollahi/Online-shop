import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
//import './index.css'
import { App } from './App';

//import AppMui from './AppMui';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store } from './_helper/store';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Button, Typography, CssBaseline  } from '@material-ui/core'
import vazir2 from './fonts/Vazir.woff';
import RTL from './_helper/RTL';

const vazir = {
  fontFamily: 'Vazir',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: vazir2
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'vazir',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [vazir],
      },
    },
  },
});

let app = (
  
    <ThemeProvider theme={theme}>


      <Provider store={store}>
        <BrowserRouter>

        <CssBaseline />
          <App />







        </BrowserRouter>
      </Provider>
     
    </ThemeProvider>
  




);


ReactDOM.render(app, document.getElementById("root"));
// ReactDOM.render(<Playground></Playground>, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}

serviceWorker.unregister();
