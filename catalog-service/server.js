const express = require("express");
const products = require("./products");
const app = express();

app.use(express.json());

app.get("/products",(req,res)=>res.json(products));

app.get("/products/:id",(req,res)=>{
 const p = products.find(x=>x.id==req.params.id);
 if(!p) return res.status(404).json({message:"Product not found"});
 res.json(p);
});

app.post("/products",(req,res)=>{
 const p={id:products.length+1,...req.body};
 products.push(p);
 res.status(201).json(p);
});

app.put("/products/:id/stock",(req,res)=>{
 const p=products.find(x=>x.id==req.params.id);
 if(!p) return res.status(404).json({message:"Product not found"});
 const {quantity}=req.body;
 if(p.stock<quantity) return res.status(400).json({message:"Not enough stock"});
 p.stock-=quantity;
 res.json({message:"Stock updated",product:p});
});

app.listen(4001,()=>console.log("Catalog Service running on 4001"));