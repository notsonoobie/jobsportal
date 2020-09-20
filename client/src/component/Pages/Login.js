import React from 'react'
import SetupForm from '../Layout/SetupForm'

const Login = (props) => {
    const { history } = props
    return (
        <>
            <SetupForm history={history} login={true} />
        </>
    )
}
export default Login