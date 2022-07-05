import { Route } from "react-router-dom"
import { Fragment, useEffect } from "react";

export const CheckoutTemlate = (props) => {
    useEffect(()=>{
        window.scrollTo(0,0)
      })
    

    return <Route exact path={props.path} render={(propsRoute) => {
        return <Fragment>
            <props.component {...propsRoute} />
        </Fragment>
    }} />
}
