import React from 'react'
import Homepage from './Homepage'
import Latest from './Latest'
import Arrivals from './Arrivals'
import Featured from './Featured'
import AboutUs from './Aboutus'
import SuccessStories from './Success'
import SocialMedia from './SocialMedia'

const All = () => {
  return (
    <div>
        <Homepage/>
        <Latest/>
        <Arrivals/>
        <Featured/>
        <SuccessStories/>
    </div>
  )
}

export default All