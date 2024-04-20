const express = require('express');
const router = express.Router();
const fdb = require("../fdb/firebase").fdb;

router.use((req, res, next) => {
    const isAdminCookieExists = req.cookies.admin && req.originalUrl.startsWith('/admin');
    res.locals.isAdmin = isAdminCookieExists;
    res.locals.page = '';
    res.locals.pageName = 'default'
    next();
});

router.get('/', async (req, res) => {
    res.render('index', {pageName: 'index'});
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/admin', (req, res) => {
    res.render('admin');
})

router.get('/attraction/:attr_id', async(req,res)=>{
    var attr_id = req.params.attr_id;
    console.log(attr_id)
    await fdb.collection('attractions').doc(attr_id).get().then((attr_data)=>{
        console.log(attr_data.data())
        if(!attr_data.exists) return res.render('errors/error-404')
        res.render('attraction', {data: {...attr_data.data(), attr_id: attr_data.id}});
    });
});




module.exports = router