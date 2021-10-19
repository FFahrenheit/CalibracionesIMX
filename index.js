const { exec } = require("child_process");

let path = "C:\\Users\\I.Lopez\\projects\\CalibracionesIMX";
let command = "npm start --prefix " + path;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});