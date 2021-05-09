/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import './scss/app.scss';
import './ts/index.ts';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const submitButton = document.getElementById('noteSubmitButton');
const clearButton = document.getElementById('noteClearButton');

const subjectInput = (<HTMLInputElement>document.getElementById('noteSubjectInput'));
const detailsInput = (<HTMLInputElement>document.getElementById('noteDetailsInput'));

subjectInput.focus();

const handleKeydown = (e: KeyboardEvent): void => {
  // Possible e.key values: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
  switch (e.key) {
    case 'Escape':
      window.electronApi.hideJotterWindow();
      break;
    case 'Enter':
      if (e.metaKey) { // e.metaKey is true if command key is pressed (cmd+enter detection)
        submitNote();
      }
      break;
  }
};

const clearNote = () => {
  detailsInput.value = '';
  subjectInput.select(); // Leave the subject intact but highlighted for potential reuse in the next note.
};

const submitNote = () => {
  console.log(`subject: ${subjectInput.value}`);
  console.log(`details: ${detailsInput.value}`);

  window.electronApi.saveNote({
    subject: subjectInput.value,
    details: detailsInput.value,
  });

  clearNote();

  window.electronApi.hideJotterWindow();
};

window.addEventListener('keydown', handleKeydown, true);
submitButton.addEventListener('click', submitNote);
clearButton.addEventListener('click', clearNote);
