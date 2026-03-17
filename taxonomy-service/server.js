const express = require("express");
const categories = require("./categories");
const app = express();

app.use(express.json());

app.get("/categories",(req,res)=>res.json(categories));

app.post("/categories",(req,res)=>{
 const c={id:categories.length+1,...req.body};
 categories.push(c);
 res.status(201).json(c);
});

app.listen(4002,()=>console.log("Taxonomy Service running on 4002"));