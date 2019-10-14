const { ipcMain, Notification } = require('electron');
const app = require('electron').app;
const Window = require('./Window');
const API = require('./api/API');

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
    const broker = new API("localhost", 8080, "http:");
    
    let myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
    })
    
    myNotification.onclick = () => {
        console.log('Notification clicked')
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    ipcMain.on('produce', async (e, data) => {
        const postMessage = await broker.produce(data);
        e.sender.send('produceReply', postMessage);
        const length = await broker.getLength()
        e.sender.send('lengthReply', length);
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