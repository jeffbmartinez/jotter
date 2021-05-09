/*
DB Structure
{
  "notes": [
    {
      "subject": "subject 1",
      "details": "details"
    },
    {
      "subject": "subject 2",
      "details": "details"
    },
    {
      "subject": "subject 1",
      "details": "more details"
    }
  ]
}
*/

import fs from 'fs';
import path from 'path';

import StormDB from 'stormdb';

const dbStoreFolder = './data';
const dbStoreFilename = 'db.stormdb';

const storage = new class {
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

export default storage;
