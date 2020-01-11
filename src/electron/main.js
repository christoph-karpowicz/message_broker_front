const { ipcMain, Notification } = require('electron')
const app = require('electron').app;
const Window = require('./Window')
const API = require('./api/API')

const path = require('path')
const url = require('url')

let mainWindow;

function main() {
    console.log("Main process started.");
    
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    const broker = new API("localhost", 8080, "http:")
    
    mainWindow = new Window({
        url: startUrl
    });
    mainWindow.maximize();
    
    let myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
    });
    
    myNotification.onclick = () => {
        console.log('Notification clicked');
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    // IPC listeners.
    ipcMain.on('addQueue', async (e, data) => {
        const addQueueResponse = await broker.addQueue(data).catch(err => console.log(err));
        e.sender.send('addQueueReply', addQueueResponse);
    });

    ipcMain.on('consume', async (e, data) => {
        const consumeResponse = await broker.consume(data).catch(err => console.log(err));
        e.sender.send('consumeReply', consumeResponse);
    });

    ipcMain.on('length', async (e, data) => {
        const lengthResponse = await broker.getLength(data).catch(err => console.log(err));
        e.sender.send('lengthReply', lengthResponse);
    });

    ipcMain.on('get', async (e, data) => {
        const getResponse = await broker.get(data).catch(err => console.log(err));
        e.sender.send('getReply', getResponse);
    });

    ipcMain.on('getAll', async (e, data) => {
        const getAllResponse = await broker.getAll(data).catch(err => console.log(err));
        // console.log(getAllResponse)
        e.sender.send('getAllReply', getAllResponse);
    });

    ipcMain.on('getQueueList', async (e) => {
        const getQueueListResponse = await broker.getQueueList().catch(err => console.log(err));
        console.log(getQueueListResponse)
        e.sender.send('getQueueListReply', getQueueListResponse);
    });

    ipcMain.on('produce', async (e, data) => {
        const produceResponse = await broker.produce(data).catch(err => console.log(err));
        e.sender.send('produceReply', produceResponse);
    });
    
    ipcMain.on('removeQueue', async (e, data) => {
        const removeQueueResponse = await broker.removeQueue(data).catch(err => console.log(err));
        e.sender.send('removeQueueReply', removeQueueResponse);
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