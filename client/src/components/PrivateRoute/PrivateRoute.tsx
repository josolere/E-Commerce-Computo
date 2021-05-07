import React from 'react'
import {Route, Redirect} from 'react-router-dom'

interface props{
    auth:boolean,
    component:any,
    path:string
}

const PrivateRoute = ({auth, path, component:Component}:props) => {
    return (
       <Route {...path}
       component={(props:any)=>(
(auth)
? (<Component {...props} />)
: (<Redirect to="/Home" />)
       )}
       />
    )
}

export default PrivateRoute
