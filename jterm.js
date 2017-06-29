const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

const INIT_WIDTH = 550;
const INIT_HEIGHT = 375;
const INIT_POSITIONS = {
  x: [0,625,625,0,1250,1250],
  y: [0,400,0,400,0,400],
  count: 6,
}
let windows = [];

function pullfrom (array, idx) {
  array[idx] = null;
  return array.reduce(function(a,b) {
    if (b !== null) a.push(b);
    return a;
  }, []);
}

function createWindow () {
  var idx = windows.push(
    new BrowserWindow({
      width: INIT_WIDTH,
      height: INIT_HEIGHT,
      x: INIT_POSITIONS.x[windows.length%INIT_POSITIONS.count],
      y: INIT_POSITIONS.y[windows.length%INIT_POSITIONS.count],
      transparent: true,
      frame: false,
      toolbar: false,
  }))-1;
  windows[idx].loadURL(url.format({
    pathname: path.join(__dirname, 'jterm.htm'),
    protocol: 'file:',
    slashes: true
  }));
  // windows[idx].webContents.openDevTools();

  windows[idx].on('closed', function () {
    pullfrom(windows, idx);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
})

app.on('activate', function () {
    createWindow();
});
