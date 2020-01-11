import React from 'react';
import Node from './Node';
import { useGlobalState } from '../../State';

const Queue = () => {
    const [rstate, dispatch] = useGlobalState().reducer
    const state = useGlobalState().state
  
    const nodes = rstate.nodes.map((node, i, self) =>
        <div key={node.index} className="node-container">
            {
                i !== 0 && <div className="node-connector"><div className="node-connector-line"></div></div>
            }
            <Node data={{
                id: i,
                msg: node.message
            }} />
            {
                i !== (self.length - 1) && <div className="node-connector"><div className="node-connector-line"></div></div>
            }
        </div>
    )
    
    return (
        <div id="queue">
            <div className="queue-container">
                {nodes}
            </div>
        </div>
    )
}

export default Queue