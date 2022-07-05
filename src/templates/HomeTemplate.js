import { Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const HomeTemplate = (props) => {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <div className="container">
            <Header />

            <props.component {...propsRoute} />

            <Footer />

          </div>
        );
      }}
    />
  );
};
