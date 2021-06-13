import React, { useRef, useEffect } from 'react'
import { useTello } from '../providers/TelloProvider'

export interface TelloProps {
}


function Tello(props:TelloProps) {

  const { connect } = useTello();

  return (
    <div>
      <button onClick={() => {connect('braain')}}>connect</button>
    </div>
  )
}

export default Tello;