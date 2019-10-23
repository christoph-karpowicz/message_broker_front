import React from 'react';
import { useGlobalState } from '../State';

const Queue = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    const nodes = rstate.map(node =>
        <div>{node.msg}</div>
    )
    
    return (
        <div id="queue">{nodes}</div>
    )
}

export default Queue