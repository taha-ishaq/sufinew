import React from 'react'
import Homepage from './Homepage'
import Latest from './Latest'
import Arrivals from './Arrivals'
import Featured from './Featured'

const All = () => {
  return (
    <div>
        <Homepage/>
        <Latest/>
        <Arrivals/>
        <Featured/>
    </div>
  )
}

export default All