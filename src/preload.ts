import {
  contextBridge,
  ipcRenderer,
} from 'electron';

import Note from './ts/note';
import Storage from './ts/storage';

declare global {
  interface Window {
    electronApi: {
      saveNote: (note: Note) => void,
      hideJotterWindow: () => void,
    };
  }
}

contextBridge.exposeInMainWorld('electronApi', {
  saveNote: (note: Note) => {
    Storage.db
      .get("notes")
      .push({
        subject: note.subject,
        details: note.details,
      });
    Storage.db.save();
  },

  hideJotterWindow: () => {
    ipcRenderer.invoke('hide-jotter-window');
  }
});
