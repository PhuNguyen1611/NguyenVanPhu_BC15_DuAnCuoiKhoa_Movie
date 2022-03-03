import { Fragment } from "react"
import { Route } from "react-router-dom"

const CheckoutTemplate = (props) => {// props ở đây là exact, path, Component

    const { Component, ...restProps } = props

    return <Route {...restProps} render={(propsRoute) => { // propsRoute ở đây là props.location, props.history, props.match

        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />


}

export default CheckoutTemplate;