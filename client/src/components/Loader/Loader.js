import React from 'react'
import { RotatingLines } from  'react-loader-spinner'
function Loader() {
  return (
    <div>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="90"
        visible={true}
      />
    </div>
  )
}

export default Loader
