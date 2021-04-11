import {
  contextBridge,
  ipcRenderer,
} from 'electron';

declare global {
  interface Window {
    electronApi: {
      ipcRendererInvokeKeydownEscape: () => void,
    };
  }
}

contextBridge.exposeInMainWorld('electronApi', {
  ipcRendererInvokeKeydownEscape: () => {
    ipcRenderer.invoke('keydown-escape');
  }
});
