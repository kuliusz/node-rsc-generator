const express = require("express")
const app = express()

app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM vpn', function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('cinema/list', {
                    title: 'Cinema List',
                    data: ''
                })
            } else {
                // render to views/cinema/list.ejs template file
                res.render('cinema/list', {
                    title: 'Cinema List',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/add', function (req, res, next) {
    // render to views/cinema/add.ejs
    res.render('cinema/add', {
        title: 'Add New Cinema',
        IPadresCoreOne: '',
        IPadresCoreTwo: '',
        Nazwa1: '',
        Nazwa2: '',
        VPNpass1: '',
        VPNpass2: '',
        Network: '',
        IP_adresVLAN10admin: '',
        NetMaskVLAN10admin: '',
        VLAN10poolStart: '',
        VLAN10poolEnd: ''
    })
})

// ADD NEW USER POST ACTION
app.post('/add', function (req, res, next) {
    req.assert('IPadresCoreOne', 'Adres IP 1').notEmpty()
    req.assert('IPadresCoreTwo', 'Adres IP 2').notEmpty()
    req.assert('Nazwa1', 'Nazwa 1').notEmpty()
    req.assert('Nazwa2', 'Nazwa 2').notEmpty()
    req.assert('VPNpass1', 'Haslo 1').notEmpty()
    req.assert('VPNpass2', 'Haslo 2').notEmpty()
    req.assert('Network', 'Siec').notEmpty()
    req.assert('IP_adresVLAN10admin', 'adres ip vlan10').notEmpty()
    req.assert('NetMaskVLAN10admin', 'VLAN10 maska').notEmpty()
    req.assert('VLAN10poolStart', 'POOL VLAN10 START').notEmpty()
    req.assert('VLAN10poolEnd', 'POOL VLAN10 END').notEmpty()

    const errors = req.validationErrors()

    if (!errors) {
        const cinema = {
            IPadresCoreOne: req.sanitize('IPadresCoreOne').escape().trim(),
            IPadresCoreTwo: req.sanitize('IPadresCoreTwo').escape().trim(),
            Nazwa1: req.sanitize('Nazwa1').escape().trim(),
            Nazwa2: req.sanitize('Nazwa2').escape().trim(),
            VPNpass1: req.sanitize('VPNpass1').escape().trim(),
            VPNpass2: req.sanitize('VPNpass2').escape().trim(),
            Network: req.sanitize('Network').escape().trim(),
            IP_adresVLAN10admin: req.sanitize('IP_adresVLAN10admin').escape().trim(),
            NetMaskVLAN10admin: req.sanitize('NetMaskVLAN10admin').escape().trim(),
            VLAN10poolStart: req.sanitize('VLAN10poolStart').escape().trim(),
            VLAN10poolEnd: req.sanitize('VLAN10poolEnd').escape().trim()
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO vpn SET ?', cinema, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('cinema/add', {
                        title: 'Add New Cinema',
                        IPadresCoreOne: '',
                        IPadresCoreTwo: '',
                        Nazwa1: '',
                        Nazwa2: '',
                        VPNpass1: '',
                        VPNpass2: '',
                        Network: '',
                        IP_adresVLAN10admin: '',
                        NetMaskVLAN10admin: '',
                        VLAN10poolStart: '',
                        VLAN10poolEnd: ''
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    // render to views/user/add.ejs
                    res.render('cinema/add', {
                        title: 'Add New Cinema',
                        IPadresCoreOne: '',
                        IPadresCoreTwo: '',
                        Nazwa1: '',
                        Nazwa2: '',
                        VPNpass1: '',
                        VPNpass2: '',
                        Network: '',
                        IP_adresVLAN10admin: '',
                        NetMaskVLAN10admin: '',
                        VLAN10poolStart: '',
                        VLAN10poolEnd: ''
                    })
                }
            })
        })
    } else {
        var error_msg = ''
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        res.render('cinema/add', {
            title: 'Add New Cinema',
            IPadresCoreOne: '',
            IPadresCoreTwo: '',
            Nazwa1: '',
            Nazwa2: '',
            VPNpass1: '',
            VPNpass2: '',
            Network: '',
            IP_adresVLAN10admin: '',
            NetMaskVLAN10admin: '',
            VLAN10poolStart: '',
            VLAN10poolEnd: ''
        })
    }
})

module.exports = app