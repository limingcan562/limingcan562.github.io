const os  = require('os');
module.exports = {
    // 开发时的端口
    devPort: '1111',

    getIpAddress() {
        var ifaces=os.networkInterfaces()
        for (var dev in ifaces) {
            let iface = ifaces[dev]
            for (let i = 0; i < iface.length; i++) {
                let {family, address, internal} = iface[i]
                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                    return address
                }
            }
        }
    },
}
