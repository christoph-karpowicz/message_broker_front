import React from 'react';
import { useGlobalState } from '../State';

const Queue = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    return (
        <div id="queue">queue</div>
    )
}

export default Queue