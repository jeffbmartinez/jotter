import Fuse from 'fuse.js';

import storage from './storage';
import Note from './note';

const autosuggester = new class {
  fuse: Fuse<Note>;

  // Note: The "new Fuse(...)" call here is using a reference to the storage.db.get("notes") result
  // so called fuse.add(...) actually adds a new note to the storage as well.
  // It's coupled in a non-intuitive way.
  constructor() {
    const notes: [Note] = storage.db.get("notes").value();
    console.log('notes:', notes);
    this.fuse = new Fuse(notes, {
      keys: ['subject'],
    });
  }

  suggestFor(searchString: string) {
    console.log(`searching for: ${searchString}`);
    const results = this.fuse
      .search(searchString, { limit: 5 })
      .map(result => result.item.subject);

    return results;
  }

  // Note: This adds a new item to the storage.db as well. See note at the constructor.
  add(item: Note) {
    this.fuse.add(item);
  }
}();

export default autosuggester;
