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
    // Note: autosuggestor's constructor pulls in a reference to storage.db.get("notes") and uses
    // it to populate its index. For that reason, autosuggester.add(note) takes care of adding it
    // to the storage.db as well. But storage.db.save() still needs to be called to persist the new
    // data.
    autosuggester.add(note);
    storage.db.save();
  },

  hideJotterWindow: () => {
    ipcRenderer.invoke('hide-jotter-window');
  }
});
