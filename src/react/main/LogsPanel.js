import React from 'react';
import { useGlobalState } from '../State';

const LogsPanel = () => {
    const state = useGlobalState().state
  
    return (
        <div id="logs-panel">Log: {state.log != "" ? state.log : "-"}</div>
    )
}

export default LogsPanel