const express = require('express');
const router = express.Router();
const fdb = require("../fdb/firebase").fdb;



router.get('/attraction/:attr_id', async(req,res)=>{
    var attr_id = req.params.attr_id;
    console.log(attr_id)
    await fdb.collection('attractions').doc(attr_id).get().then((attr_data)=>{
        console.log(attr_data.data())
        if(!attr_data.exists) return res.render('errors/error')
        res.render('attraction', {data: {...attr_data.data(), attr_id: attr_data.id}});
    });
});


module.exports = router