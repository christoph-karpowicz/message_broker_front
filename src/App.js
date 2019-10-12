import React from 'react';
const { ipcRenderer } = window.require('electron');

function handle() {
  ipcRenderer.send('produce');
}

function App() {
  return (
    <div className="App">
      <section>
        <button id="produce" type="button" className="btn" onClick={handle}>
            Produce
        </button>
      </section>
    </div>
  );
}

export default App;