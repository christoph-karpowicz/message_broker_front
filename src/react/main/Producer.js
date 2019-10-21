import React from 'react';
import { useGlobalState } from '../State';

const Producer = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    // const state = useGlobalState().state
  
    return (
        <div id="producer">
            <textarea id="message" className="" name="message" onChange={e => dispatch({ type: "setMessage", val: e.target.value })}></textarea>
        </div>
    )
}

export default Producer