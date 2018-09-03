const express = require("express")
const fs = require("fs")
const app = express()

app.get('/', function (req, resp) {
    resp.render('index', {
        title: 'RSC Generator for Mikrotik'
    });
});

app.post('/', function (req, resp) {
    //resp.end(JSON.stringify(req.body));
    let IPaddress = req.body.IPaddress
    let netMask = req.body.NetMask
    let gateway = req.body.Gateway
    let netAddress = req.body.NetworkAddress
    let prov = req.body.prov
    let nazwa = req.body.Name
    let netAddLast = req.body.netAddLast

    require.extensions['.txt'] = function (module, filename) {
        module.exports = fs.readFileSync(filename, 'utf8');
    };

    let mikrotik = require("../mikrotik.txt");

    let changed_file = mikrotik.replace(/\.replace\['IPaddress'\]./g, IPaddress).replace(/\.replace\['NetMask'\]./g, netMask).replace(/\.replace\['Gateway'\]./g, gateway).replace(/\.replace\['NetworkAddress'\]./g, netAddress).replace(/\.replace\['prov'\]./g, prov).replace(/\.replace\['Name'\]./g, nazwa).replace(/\.replace\['PBX'\]./g, netAddLast);

    resp.end(changed_file);
})

module.exports = app;