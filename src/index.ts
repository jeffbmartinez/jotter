import { app, BrowserWindow, globalShortcut } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Options for shortcut keys: https://www.electronjs.org/docs/api/accelerator
const globalShortcutKey = 'CommandOrControl+Control+Shift+N';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let jotterWindow: BrowserWindow = null;
const createJotterWindow = (): void => {
  // Only want one window open at a time
  // so cancel operation if window is already open
  if (jotterWindow) {
    console.log("Showing previously-existing Jotter window");
    jotterWindow.show();
    return;
  }

  console.log("Creating new Jotter window");

  // Create the browser window.
  jotterWindow = new BrowserWindow({
    height: 150,
    width: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  // Make sure the window shows regardless of which workspace
  // is active (does nothing on windows OS)
  jotterWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  });

  // See available "on top" options: https://www.electronjs.org/docs/api/browser-window#winsetalwaysontopflag-level-relativelevel
  jotterWindow.setAlwaysOnTop(true, 'pop-up-menu');

  // and load the index.html of the app.
  jotterWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // jotterWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const registrationResult = globalShortcut.register(globalShortcutKey, () => {
    console.log(`\n${globalShortcutKey} was pressed`);
    createJotterWindow();
  });

  if (!registrationResult) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  const successfulRegistration = globalShortcut.isRegistered(globalShortcutKey);
  console.log(successfulRegistration ? "Ready to go" : "Registration problem occurred");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log("window-all-closed event fired");
  jotterWindow = null;

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log('activate event has fired');
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createJotterWindow();
  }
});

app.on('will-quit', () => {
  // Unregister the global shortcut.
  globalShortcut.unregister(globalShortcutKey);

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
