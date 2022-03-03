import { Fragment } from "react"
import { Route } from "react-router-dom"
import Footer from "./Layout/Footer/Footer"
import Header from "./Layout/Header/Header"
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel"





export const HomeTemplate = (props) => {// props ở đây là exact, path, Component


    const { Component, ...restProps } = props

    return <Route {...restProps} render={(propsRoute) => { // propsRoute ở đây là props.location, props.history, props.match

        return <Fragment>
            <Header />
            <Component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />


}