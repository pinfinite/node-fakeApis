const express = require('express');
const bodyParser = require('body-parser');
const prodList  = require('./prodList');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/products/:qty',(req,res)=>{
    const resArr = [];
    const sizeLimit = 15;
    
    const maxLength = req.params.qty <= prodList.length ? req.params.qty:prodList.length;
    let start = 0;
    //if qty is less than sizelimit dont modify start
    //if qty is more than max length than qty becomes max length
    if(req.params.qty > prodList.length){
        start = req.params.qty - prodList.length;
    }
    else if(req.params.qty < sizeLimit){
       start = 0;
    } 
    else{
        start = req.params.qty - sizeLimit;
    }
    //otherwise return qty-maxlimit
    for(i=start;i<maxLength;i++){
       resArr.push(prodList[i]);
    }
    setTimeout(()=>{
        res.send({
            productsData:resArr,
            count:prodList.length
        });
    },4000)
    
})

app.listen(port,()=>{
  console.log("server listening onm port",port);
});

