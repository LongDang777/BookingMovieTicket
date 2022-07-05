import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import { DOMAIN } from './util/config';
import * as signalR from '@aspnet/signalr'
//import da ngon ngu
import './i18n';

// connect server
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

connection.start().then(()=>{
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>
    ,
    document.getElementById('root')
  );
}).catch((err)=>{
  console.log(err);
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
