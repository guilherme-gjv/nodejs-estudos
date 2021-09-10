const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('admin/index')
});

router.get('/posts', (req, res)=>{
    res.send("Posts");
})

router.get('/categorias', (req, res)=>{
    res.send("Categorias");
})



module.exports = router;