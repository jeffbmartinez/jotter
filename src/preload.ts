import {
  contextBridge,
  ipcRenderer,
} from 'electron';

declare global {
  interface Window {
    electronApi: {
      hideJotterWindow: () => void,
    };
  }
}

contextBridge.exposeInMainWorld('electronApi', {
  hideJotterWindow: () => {
    ipcRenderer.invoke('hide-jotter-window');
  }
});
