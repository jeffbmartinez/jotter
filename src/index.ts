import * as path from 'path';

import {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  Tray,
} from 'electron';

import penIcon from './images/pen.png';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

let tray: any = null;

// Options for shortcut keys: https://www.electronjs.org/docs/api/accelerator
const globalShortcutKey = 'CommandOrControl+Control+Shift+N';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let jotterWindow: BrowserWindow = null;
const createJotterWindow = (): void => {
  if (jotterWindow) {
    console.log("Error: Already have an active Jotter window. Probably a bug somewhere ... Aborting to prevent further issues");
    return;
  }

  console.log("Creating new Jotter window");

  // Create the browser window.
  jotterWindow = new BrowserWindow({
    height: 150,
    width: 600,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  // Make sure the window shows regardless of which workspace
  // is active (does nothing on windows OS)
  jotterWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  });

  // and load the index.html of the app.
  jotterWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // jotterWindow.webContents.openDevTools();
};

const toggleJotterWindow = (): void => {
  if (!jotterWindow) {
    // This happens for at least one use case at the moment.
    // When the jotter window is closed via CMD+W
    console.log("Error: The jotter window should already exist. You have a bug ... Creating a new one to prevent more errors");
    createJotterWindow();
  }

  if (jotterWindow.isVisible()) {
    jotterWindow.hide();
  } else {
    jotterWindow.show();
  }
};

const registerGlobalKeyboardShortcut = (): void => {
  const registrationResult = globalShortcut.register(globalShortcutKey, () => {
    console.log(`\n${globalShortcutKey} was pressed`);
    toggleJotterWindow();
  });

  if (!registrationResult) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  const successfulRegistration = globalShortcut.isRegistered(globalShortcutKey);
  console.log(successfulRegistration ? "Global shortcut is enabled" : "Global shortcut registration failed");
};

const registerTrayIcon = (): void => {
  tray = new Tray(path.join(__dirname, penIcon));

  tray.setToolTip('Jotter (CMD+CTRL+Shift+N)');
  tray.setIgnoreDoubleClickEvents(true);

  tray.on('click', () => {
    toggleJotterWindow();
  });

  tray.on('right-click', () => {
    // Building a Menu without a window to associate it with fails.
    if (!jotterWindow) {
      console.log('ERROR: jotterWindow must exist for Menu.popup to work');
      return;
    }

    const menu = Menu.buildFromTemplate([
      // Eventually add a settings menu, to customize global shortcut
      // and storage location, etc.
      // {
      //   label: 'Settings',
      //   click: () => { console.log('Settings menu item was clicked'); },
      // },
      // { type: 'separator' },
      { role: 'quit' },
    ]);

    menu.popup();
  });
};

const disableApplicationMenu = (): void => {
  const emptyMenu = new Menu();
  Menu.setApplicationMenu(emptyMenu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app.whenReady().then(() => { // I'm keeping this here for debugging. This promise version gives more error information
// on certain occasions, like when I was feeding `new Tray(...)` a bad icon file path.
app.on('ready', () => {
  disableApplicationMenu();
  createJotterWindow();
  registerGlobalKeyboardShortcut();
  registerTrayIcon();
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
    jotterWindow.show();
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
