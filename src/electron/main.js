const { ipcMain, Notification } = require('electron')
const app = require('electron').app;
const Window = require('./Window')
const API = require('./api/API')

const path = require('path')
const url = require('url')

const querystring = require('querystring');
const axios = require('axios');

let mainWindow;

function main() {
    console.log("Main process started.")
    
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    })
    const broker = new API("localhost", 8080, "http:")
    
    mainWindow = new Window({
        url: startUrl
    })
    mainWindow.maximize()
    
    let myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
    })
    
    myNotification.onclick = () => {
        console.log('Notification clicked')
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    // IPC listeners.
    ipcMain.on('consume', async (e) => {
        const consumeResponse = await broker.consume().catch(err => console.log(err))
        e.sender.send('consumeReply', consumeResponse)
    })

    ipcMain.on('length', async (e) => {
        const lengthResponse = await broker.getLength().catch(err => console.log(err))
        e.sender.send('lengthReply', lengthResponse)
    })

    ipcMain.on('peek', async (e, index) => {
        const peekResponse = await broker.peek(index).catch(err => console.log(err))
        e.sender.send('peekReply', peekResponse)
    })

    ipcMain.on('peekAll', async (e) => {
        const lengthResponse = await broker.getLength().catch(err => console.log(err))
        const queueLength = lengthResponse.msg
        // console.log(queueLength)
        // let peekArray = []
        // for (let i = 0; i < queueLength; i++) {
        //     peekArray.push(
        //         axios.get('http://localhost:8080', {
        //             params: querystring.stringify({
        //                 type: "peek",
        //                 index: i,
        //                 queue: 0,
        //             })
        //           })
        //     )
        // }
        // Promise.all(peekArray).then(res => {
        //     console.log(res.data)
        //     // e.sender.send('peekAllReply', queue.reverse())
        // })
        // .catch(err => console.log(err))

        const peekArray = broker.peekAll(queueLength)
        Promise.all(peekArray).then(queue => {
            console.log(queue)
            e.sender.send('peekAllReply', queue.reverse())
        })
        .catch(err => console.log(err))
    })

    ipcMain.on('produce', async (e, message) => {
        const produceResponse = await broker.produce(message).catch(err => console.log(err))
        e.sender.send('produceReply', produceResponse)
    })
    
}

app.on('ready', main)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        main()
    }
})