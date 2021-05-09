/*
DB Structure
{
  "notes": [
    {
      "subject": "subject 1",
      "details": "details",
      "etc": "..."
    },
    {
      "subject": "subject 2",
      "details": "details",
      "etc": "..."
    },
    {
      "subject": "subject 1",
      "details": "more details",
      "etc": "..."
    }
  ]
}
*/

import fs from 'fs';
import path from 'path';

import StormDB from 'stormdb';

const dbStoreFolder = './data';
const dbStoreFilename = 'db.stormdb';

const Storage = new class {
  readonly db;

  constructor(dbStoreFilename: string) {
    if (!fs.existsSync(dbStoreFolder)) {
      fs.mkdirSync(dbStoreFolder);
    }

    const dbStoreFullPath = path.join(dbStoreFolder, dbStoreFilename);
    const dbEngine = new StormDB.localFileEngine(dbStoreFullPath);
    this.db = new StormDB(dbEngine);
    this.db.default({
      notes: [],
    });
  }
}(dbStoreFilename);

export default Storage;
