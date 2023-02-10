// main.js

const { app, BrowserWindow } = require('electron')
const path = require('path');
const {ipcMain} = require('electron')
const fs = require('fs');
const { resolve } = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 1400,
        height: 1000,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, './src/preload.js'),
            enableRemoteModule: true
        },
    })

    win.loadFile(path.join(__dirname, './src/index.html'))
    win.webContents.openDevTools()

}
app.setName('GP Builder');

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


//https://www.electronjs.org/docs/latest/api/web-contents#contentsprinttopdfoptions

var options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
      marginType: 'printableArea'
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  displayHeaderFooter: true,
  footerTemplate:"<span class='url'></span>",
  pageSize: "A4",
}

ipcMain.handle('download_pdf', async (event, arg) => {

  return new Promise(function(resolve, reject) {

    let win = BrowserWindow.getFocusedWindow();
    // let win = RemoteBrowserWindow.getAllWindows()[0];
  
    win.webContents.printToPDF(options).then(data => {
      fs.writeFile("./doc.pdf", data, function (err) {
          if (err) {
              console.log(err);
              reject("PDF could not be generated: ", err)
          } else {
              console.log('PDF Generated Successfully');
          }
      });
    }).catch(error => {
        console.log(error)
        reject("PDF could not be generated: ", error)

    });
    resolve("PDF Generated Successfully")
  });  
});

ipcMain.handle('save_json', async (event, arg) => {
  console.log("ARG: ", arg)
  resolve("Save successful")
  
  fs.writeFile("../form.json", arg, function(err) {
    if (err) {
        console.log(err);
    }
  });
  
});








