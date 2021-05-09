import {
  contextBridge,
  ipcRenderer,
} from 'electron';

import Note from './ts/note';
import storage from './ts/storage';

import autosuggester from './ts/autosuggester';

declare global {
  interface Window {
    electronApi: {
      getSuggestions: (searchString: string) => [string],
      saveNote: (note: Note) => void,
      hideJotterWindow: () => void,
    };
  }
}

contextBridge.exposeInMainWorld('electronApi', {
  getSuggestions: (searchString: string) => {
    return autosuggester.suggestFor(searchString);
  },

  saveNote: (note: Note) => {
    storage.db
      .get("notes")
      .push({
        subject: note.subject,
        details: note.details,
      });
    storage.db.save();
  },

  hideJotterWindow: () => {
    ipcRenderer.invoke('hide-jotter-window');
  }
});
