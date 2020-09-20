import React from 'react'
import SetupForm from '../Layout/SetupForm'

const Home = (props) => {
    return (
        <>
            <SetupForm {...props} register={true} />   
        </>
    )
}


export default Home