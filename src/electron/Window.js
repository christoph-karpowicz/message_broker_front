'use strict'

const { BrowserWindow } = require('electron')

const defaultProps = {
  width: 1000,
  height: 800,
  webPreferences: {
    nodeIntegration: true
  }
}

class Window extends BrowserWindow {
  
  constructor ({ url, ...windowSettings }) {
    super({ ...defaultProps, ...windowSettings })

    this.loadURL(url)
    this.webContents.openDevTools()

    this.once('ready-to-show', () => {
      this.show()
    })
  }
  
}

module.exports = Window;