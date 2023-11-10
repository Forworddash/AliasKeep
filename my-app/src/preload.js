// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { faker } from '@faker-js/faker';
const toastr = require('toastr');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    require: (module) => require(module),
});

window.nodeRequire = require;   