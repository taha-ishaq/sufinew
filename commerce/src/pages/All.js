import React from 'react'
import Homepage from './Homepage'
import Latest from './Latest'
import Arrivals from './Arrivals'
import Featured from './Featured'
import AboutUs from './Aboutus'
import SuccessStories from './Success'

const All = () => {
  return (
    <div>
        <Homepage/>
        <Latest/>
        <Arrivals/>
        <Featured/>
        <AboutUs/>
        <SuccessStories/>
    </div>
  )
}

export default All