const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('kageUpdater', {
  info: () => ipcRenderer.invoke('kage:info'),
  apply: () => ipcRenderer.invoke('kage:apply'),
  open: url => ipcRenderer.invoke('kage:open', url),
  onUpdate: cb => ipcRenderer.on('kage:update', (e, d) => cb(d))
});
