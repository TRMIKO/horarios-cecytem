'use strict'

const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1000,
        heigth: 900,
        center: true,
        maximizable: false,
        show: false,
        resizable: false
    })
    
    win.once('ready-to-show', () => {
        win.show()
    })
    
    win.on('closed', () => {
        win = null
        app.quit()
    })
    
    win.loadURL(`file:${__dirname}/html/index.html`)
})
