const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');
const path = require('path');
const Store = require('electron-store');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
    },
  });

  // and load the login.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'login.html'));


  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};



// // Initialize Electron Store
// const store = new Store();

// // // Save user preferences
// store.set('userPreferences', {
//   theme: 'dark',
//   language: 'en'
// });

// // // Retrieve user preferences
// const userPreferences = store.get('userPreferences');

// // // Update a setting 
// store.set('userPreferences.theme', 'light');

// // // Delete a setting
// store.delete('userPreferences.language');

// // // Save profiles
// const profiles = [
//   {
//     name: 'Profile 1',  
//     settings: { /* ... */ },
//   },
//   {
//     name: 'Profile 2',
//     settings: { /* ... */ },
//   },
// ];

// // // Retrieve profiles
// const storedProfiles = store.get('profiles');



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow, electronReload(__dirname));
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

