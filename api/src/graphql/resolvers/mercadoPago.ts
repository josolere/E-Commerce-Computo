

require("dotenv").config();
const { AccessToken } = process.env;
import db from "../../models";

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(AccessToken);

import {
    iModels,
    iPaymentData,
    iPaymentResult
  } from "../../interfaces";

  import {
    OrderCreateMail,
    StatusChangeMail,
    orderCreatedMail,
    orderShippedMail,
  } from "../../mailer/functions";
  
import product from "./product";


export default {
Mutation: {
 
  processPayment: async (
        _parent: object,
        { input, id }: { input:iPaymentData, id:number },
        { models }: { models: iModels }
      ): Promise<any> => {
        const options = {include: [
          {
            model: db.Product,
            through: "productsxorder",
          //  attributes: ["id","name", "price"],
          },
        ]}
        const OrderToCreate = await models.Order.findByPk(id,options);
       
        if(!OrderToCreate) {
          const res = {status:400, error: {status:400, cause : { code: 0, description: "no se encuentra la orden" }}}
          return res;
        }

        try{
              const data = await mercadopago.payment.save(input)
              const res = {status:0,payment:{id:0,status:"",status_detail:""}}

              res.status = 200
              res.payment.id = data.body.id;
              res.payment.status = data.body.status;
              res.payment.status_detail = data.body.status_detail;

              const confirmAt = Date.now();

              const Order = await OrderToCreate.update(
                { status : "creada", confirmAt }
            );

            console.log('-------------------------------------------------------------------------------------------------------')
            
            const details = OrderToCreate.dataValues.Products;
            const products = [];
            for(let i=0; i<details.length;i++){
              const prod = details[i].dataValues.Productsxorder
              console.log(prod)
              const prodId = prod.ProductId;
              const name = prod.productName;
              const quantity = prod.quantity;
              const price = parseInt(prod.price);

              products.push({name:name, quantity:quantity, price:price})

              // stock
           /*
              console.log(prodId);
              const producto = await models.Product.findByPk(prodId)
              console.log(producto);

              if (producto) {
                const stock = producto.stock - quantity;

              //  console.log(producto.stock, quantity);

                const updatedProduct = await producto.update(
                    { stock },
                    { where: { prodId } }
                  );
              }

                  */
            }

            const street = OrderToCreate.dataValues.street;
            const city = OrderToCreate.dataValues.city;
            const state = OrderToCreate.dataValues.state;
            const address = `${street}<br />${city}<br />${state}`
            
            orderCreatedMail(input.payer.email,id,products,address,"")


            return res;
        }
        catch(err)
        {
          const res = {status:400, error: {status:err.status, cause : { code: err.cause[0].code, description: err.cause[0].description }}}
          return res;
        }
    }
   }
  
}

