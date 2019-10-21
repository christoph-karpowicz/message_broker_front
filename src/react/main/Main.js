import React, { useState } from 'react';
import { useStateValue } from '../State';

const Main = () => {
    const [state, dispatch] = useStateValue()
    const [message, setMessage] = useState("")
  
    return (
        <div id="main">
            <div id="producer">
                <textarea id="message" className="" name="message" onChange={e => setMessage(e.target.value)}></textarea>
            </div>
            <div id="consumer">{state.consumed}</div>
            <div id="producer-panel">
                <button id="produce" type="button" className="btn" onClick={() => dispatch({type: "produce", val: message})}>
                    Produce
                </button>
            </div>
            <div id="consumer-panel">
                <button id="consume" type="button" className="btn" onClick={() => dispatch({type: "consume"})}>
                    Consume
                </button>
            </div>
            <div id="queue">queue</div>
        </div>
    )
}

export default Main