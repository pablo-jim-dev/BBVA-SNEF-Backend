import { Service } from "node-windows";

const svc = new Service({
    name: 'SNEF-2024',
    description: 'BBVA SNEF SERVER',
    script: 'C:\\users\\usuario\\SNEF-SERVER-2024\\src\\index.js'
});

svc.on('install', () => {
    svc.start();
});

svc.install();