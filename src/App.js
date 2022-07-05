
import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";
import { HomeTemplate } from "./templates/HomeTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import AddNew from "./pages/Admin/Films/AddNew";
import Edit from "./pages/Admin/Films/Edit";
import { CheckoutTemlate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import DetailDay from "./pages/DetailDay/DetailDay";
import AddUser from "./pages/Admin/Dashboard/AddUser";
import EditUser from "./pages/Admin/Dashboard/EditUser";
import Loading from './components/Loading/Loading';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <div className="App">
     
        <HomeTemplate path="/" component={Home} />
        <HomeTemplate path="/detail/:id" component={DetailDay} />
        <CheckoutTemlate path="/checkout/:id" component={Checkout} />
        <AdminTemplate path="/admin" component={Dashboard} />
        <AdminTemplate path="/admin/adduser" component={AddUser} />
        <AdminTemplate path="/admin/edituser/:taiKhoan" component={EditUser} />
        <AdminTemplate path="/admin/films" component={Films} />
        <AdminTemplate path="/admin/films/addnew" component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" component={Edit} />
        <AdminTemplate
          path="/admin/films/showtime/:id/:tenphim"
          component={ShowTime}
        />
        
      </div>
    </Router>

  );
}

export default App;
