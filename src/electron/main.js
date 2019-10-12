const { ipcMain, Notification } = require('electron');
const app = require('electron').app;
const Window = require('./Window');

const path = require('path');
const url = require('url');

let mainWindow;

function main() {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow = new Window({
        url: startUrl
    });
    
    let myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
    })
    
    myNotification.onclick = () => {
        console.log('Notification clicked')
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    ipcMain.on('produce', () => {
        console.log("TEST");
    });
    
}

app.on('ready', main);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        main()
    }
});