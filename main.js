// main.js

const { app, BrowserWindow } = require('electron')
const path = require('path');
const {ipcMain} = require('electron')
const fs = require('fs');
const { resolve } = require('path');
const {dialog} = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 1400,
        height: 1000,
        //titleBarStyle: 'hidden',
        trafficLightPosition: { x: 10, y: 8 },

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

var pdf_options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
      marginType: 'printableArea',
      top: 0,
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  displayHeaderFooter: true,
  headerTemplate:'<span></span>',
  pageSize: "A4",
}

ipcMain.handle('download_pdf', async (event) => {
  const dialog_options = {
    defaultPath: "form",
    title: 'Save PDF',
  }

  // getFocusedWindow() has to be called before opening the dialog, as the dialog interferes with the "focus" on the browser window
  let win = BrowserWindow.getFocusedWindow();
  console.log("WIN: ", win)

  await dialog.showSaveDialog(null, dialog_options).then((result) => {
    return new Promise(function(resolve, reject) {
      win.webContents.printToPDF(pdf_options).then(data => {
        fs.writeFile(result['filePath']+".pdf", data, function (err) {
            if (err) { reject("PDF could not be saved: ", err) }
        });
      }).catch(error => { reject("PDF could not be generated: ", error) });
      resolve("PDF Generated Successfully")
    }); 
  });
});

var print_options = {
  silent: false,
  printBackground: true,
  color: false,
  margin: {
      marginType: 'printableArea',
      top: 0,
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  displayHeaderFooter: true,
  headerTemplate:'<span></span>',
  pageSize: "A4",
}

ipcMain.handle('print', async (event) => {
  let win = BrowserWindow.getFocusedWindow();
  return new Promise(function(resolve, reject) {
    win.webContents.print(print_options, (success, errorType) => {
      if (!success) reject("Print failure: ", errorType)
    })
    resolve("Printed Successfully")
  }); 
});


ipcMain.handle('save_json', async (event, arg) => {

  const dialog_options = {
    defaultPath: "form",
    title: 'Save JSON',
  }

  await dialog.showSaveDialog(null, dialog_options).then((result) => {
    return new Promise(function(resolve, reject) {

      fs.writeFile(result['filePath']+".json", arg, function(err) {
        if (err) {
          reject("JSON could not be saved: ", err)
        }
      });
      resolve("JSON Saved Successfully")
    });
  })
});








