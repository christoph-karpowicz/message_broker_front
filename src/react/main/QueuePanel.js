import React from 'react';
import { useGlobalState } from '../State';

const Producer = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    const queueList = rstate.queueList.map(queue => 
        <option key={queue.index}>
            {queue.name}
        </option>
    );
    
    return (
        <div id="queue-panel">
            <div>
                <input type="text" id="queueName" className="" name="queueName" onChange={e => state.setQueueInput(e.target.value)} />
                <button id="addQueue" type="button" className="btn" onClick={() => dispatch({type: "addQueue", payload: { name: state.queueInput }})}>
                    Add queue
                </button>
            </div>

            <div>
                Select queue:
                <select onChange={e => state.setQueue(e.target.value)}>
                    <option></option>
                    {queueList}
                </select>
                <button id="removeQueue" type="button" className="btn" onClick={() => dispatch({type: "removeQueue", payload: { name: state.queue }})}>
                    Remove queue
                </button>
            </div>
        </div>
    )
}

export default Producer