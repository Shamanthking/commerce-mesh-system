const express = require("express");
const axios = require("axios");
const orders = require("./orders");
const app = express();

app.use(express.json());

app.get("/orders",(req,res)=>res.json(orders));

app.post("/orders",async(req,res)=>{
 const {productId,quantity}=req.body;
 try{
  const response=await axios.get(`http://localhost:4001/products/${productId}`);
  const product=response.data;

  if(product.stock<quantity){
   return res.status(400).json({message:"Not enough stock available"});
  }

  const totalPrice=product.price*quantity;

  await axios.put(`http://localhost:4001/products/${productId}/stock`,{quantity});

  const order={id:orders.length+1,productId,quantity,totalPrice};
  orders.push(order);

  res.status(201).json(order);

 }catch(err){
  res.status(404).json({message:"Product not found"});
 }
});

app.listen(4003,()=>console.log("Purchase Service running on 4003"));