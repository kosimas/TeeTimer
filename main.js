const { app, BrowserWindow, globalShortcut } = require('electron')
//const TeeTimer = require('./static.timer');
// Behalten Sie eine globale Referenz auf das Fensterobjekt. 
// Wenn Sie dies nicht tun, wird das Fenster automatisch geschlossen, 
// sobald das Objekt dem JavaScript-Garbagekollektor übergeben wird.

/**@type {BrowserWindow} */
let win

function createWindow () {
  // Erstellen des Browser-Fensters.
  win = new BrowserWindow({
    width: 500,
    height: 200,
    maxWidth: 500,
    maxHeight: 200,
    minWidth: 500,
    maxWidth: 200,
    show: false,
    resizable: false,
    //autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // und lade die index.html der App.
  win.loadFile('index.html')
  win.removeMenu();
  win.once('ready-to-show', () => {
      win.show();
  })

  // Öffnen der DevTools.
  win.webContents.openDevTools()

  // Ausgegeben, wenn das Fenster geschlossen wird.
  win.on('closed', () => {
    // Dereferenzieren des Fensterobjekts, normalerweise würden Sie Fenster
    // in einem Array speichern, falls Ihre App mehrere Fenster unterstützt. 
    // Das ist der Zeitpunkt, an dem Sie das zugehörige Element löschen sollten.
    win = null
  })
}

// Diese Methode wird aufgerufen, wenn Electron mit der
// Initialisierung fertig ist und Browserfenster erschaffen kann.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.on('ready', createWindow)
// app.on('ready', () => {
//   const shrt2 = globalShortcut.register('CommandOrControl+Alt+2', () => {
//     console.log(win.webContents);
//   });

//   if(!shrt2)
//     console.log('register failed');
  
//   console.log(globalShortcut.isRegistered('CommandOrControl+2'))
// });

// Verlassen, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich, für Apps und ihre Menu Bar
  // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
  // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
  if (win === null) {
    createWindow()
  }
})

// In dieser Datei können Sie den Rest des App-spezifischen 
// Hauptprozess-Codes einbinden. Sie können den Code auch 