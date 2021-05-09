import Fuse from 'fuse.js';

import storage from './storage';
import Note from './note';

const autosuggester = new class {
  fuse: Fuse<Note>;

  constructor() {
    const notes: [Note] = storage.db.get("notes").value();
    console.log('notes:', notes);
    this.fuse = new Fuse(notes, {
      keys: ['subject'],
    });
  }

  suggestFor(searchString: string) {
    console.log(`searching for: ${searchString}`);
    const results = this.fuse.search(searchString).map(a => a.item).map(b => b.subject);
    return results;
  }
}();

export default autosuggester;
