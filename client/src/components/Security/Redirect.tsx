import  { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Cookies } from "react-cookie";


interface props {
    component: any
}

const RedirectProtect = (props: props) => {

    const Component = props.component;

    const [gotCookies, setGotCookies] = useState()

    const cookie = new Cookies

    useEffect(() => {
        setGotCookies(cookie.get('User'))
    }, [])

    return (
        <Route  render={() => {
            return gotCookies
                ? props.component 
                : <Redirect to={{
                    pathname: '/login',
                }} />
        }} />
    )
}

export default RedirectProtect as any;