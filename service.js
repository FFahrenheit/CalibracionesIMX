const Service = require('node-windows').Service

const srv = new Service({
    name: 'CalibracionesIMX',
    description: 'Front end for Calibraciones System',
    script: "C:\\Users\\I.Lopez\\projects\\CalibracionesIMX\\index.js"
});

srv.on('install', () => {
    console.log('Service installed');
    srv.start();
});

srv.on('error', () => {
    console.log('ERROR!!!');
});

srv.on('uninstall', () => {
    console.log('Service uninstalled');
    console.log('The service exists: ', srv.exists);
});

try{
    srv.install();
}catch(e){
    console.log('Fail!?');
    console.log(e);
}