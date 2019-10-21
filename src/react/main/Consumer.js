import React from 'react';
import { useGlobalState } from '../State';

const Consumer = () => {
    // const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    return (
        <div id="consumer">{state.consumed}</div>
    )
}

export default Consumer