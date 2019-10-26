import React from 'react';
import { useGlobalState } from '../State';
import Producer from './Producer';
import Consumer from './Consumer';
import Queue from './queue/Queue';

const Main = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    return (
        <div id="main">
            <Producer />
            <Consumer />
            <div id="producer-panel">
                <button id="produce" type="button" className="btn" onClick={
                        () => dispatch({
                            type: "produce", 
                            payload: { message: state.message }
                        })}>
                    Produce
                </button>
                <button id="produce" type="button" className="btn" onClick={() => dispatch({type: "produceRandom"})}>
                    Produce random
                </button>
            </div>
            <div id="consumer-panel">
                <button id="consume" type="button" className="btn" onClick={() => dispatch({type: "consume"})}>
                    Consume
                </button>
            </div>
            <Queue />
        </div>
    )
}

export default Main