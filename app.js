const { app, BrowserWindow } = require('electron')


const electron = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1024,
        heigth: 900,
        center: true,
        maximizable: false,
        show: false,
        resizable: false,
        title:'CECyTEM'
    })
    
    win.once('ready-to-show', () => {
        win.show()
    })
    
    win.on('closed', () => {
        win = null
        app.quit()
    })
    
    win.loadURL(`file:${__dirname}/html/signin.html`)
})

ipc.on('print-to-pdf', function(event) {
    const pdfPath = path.join(os.tmpdir(), 'profesor.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);
    
    win.webContents.printToPDF({}, function(error, data) {
        if (error) return console.log(error.message);
        
        fs.writeFile(pdfPath, data, function(err) {
            if(err) return console.log(err.message);
            shell.openExternal('file://' + pdfPath);
            event.sender.send('wrote-pdf', pdfPath);
        })
    })
});