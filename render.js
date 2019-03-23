const ipc = require('electron').ipcRenderer
const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', function (event) {
    ipc.send('open-directory-dialog')
})
ipc.on('selectedItem', function (event, path) {
    document.getElementById('selectedItem').innerHTML = `You selected: ${path}`
})
