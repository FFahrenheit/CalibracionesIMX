const Service = require('node-windows').Service
const path = require('path');

const srv = new Service({
    name: 'CalibracionesIMX',
    description: 'Front end for Calibraciones System',
    script: path.join(__dirname, 'index.js')
});

srv.on('install', () => {
    console.log('Service installed');
    srv.start();
});

srv.on('uninstall', () => {
    console.log('Service uninstalled');
    console.log('The service exists: ', srv.exists);
});

srv.on('error', () => {
    console.log('Error installing service');
});

srv.on('alreadyinstalled', () => {
    console.log('Service is installed');
});

srv.on('alreadyuninstalled', () => {
    console.log('Service is uninstalled');
});

srv.on('stop', () => {
    console.log('Service is stopped');
});

srv.on('start', () => {
    console.log('Service started');
});

try {
    srv.install();
}catch(e){
    console.log('Error');
    console.log(e);
}