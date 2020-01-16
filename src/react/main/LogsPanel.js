import React, { cloneElement } from 'react';
import { useGlobalState } from '../State';
import { useEffect, useState } from 'react';

const LogsPanel = () => {
    const state = useGlobalState().state;
    
    return (
        <div id="logs-panel">{state.log != "" ? state.log : ""}</div>
    )
}

export default LogsPanel