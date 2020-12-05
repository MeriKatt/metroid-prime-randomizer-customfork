import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

import * as Utilities from './utilities';
import menuTemplate from './menu';
import { defineControllers } from './controllers';
import { writeSettingsFiles } from './controllers/settingsController';
import { writeSeedHistoryToFile } from './controllers/seedHistoryController';

let win: Electron.BrowserWindow;
const serve = Utilities.isServe();

function createWindow() {
  // Check if we are on a non-serve build
  if (!serve) {
    // Create our menu entries so that we can use Mac shortcuts
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  }

  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    icon : path.join(__dirname, 'icon.png'),
    title: 'Metroid Prime Randomizer',
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (serve) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    // Write settings file, seed history file if changes have been made.
    writeSettingsFiles();
    // writeSeedHistoryToFile();

    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

// Initialize main process controllers
defineControllers();