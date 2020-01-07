import React from 'react';
import { useGlobalState } from '../State';
import QueuePanel from './QueuePanel';
import Producer from './Producer';
import Consumer from './Consumer';
import Queue from './queue/Queue';
import LogsPanel from './LogsPanel';

const Main = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    return (
        <div id="main">
            <QueuePanel />
            <Producer />
            <Consumer />
            <div id="producer-panel">
                <button id="produce" type="button" className="btn" onClick={
                        () => dispatch({
                            type: "produce", 
                            payload: { queue: state.queue, message: state.message }
                        })}>
                    Produce
                </button>
                <button id="produce" type="button" className="btn" onClick={() => dispatch({type: "produceRandom", payload: { queue: state.queue }})}>
                    Produce random
                </button>
            </div>
            <div id="consumer-panel">
                <button id="consume" type="button" className="btn" onClick={() => dispatch({type: "consume", payload: { queue: state.queue }})}>
                    Consume
                </button>
            </div>
            <Queue />
            <LogsPanel />
        </div>
    )
}

export default Main