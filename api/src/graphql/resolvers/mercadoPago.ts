
require("dotenv").config();
const { AccessToken } = process.env;

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(AccessToken);

import {
    iModels,
    iPaymentData,
    iPaymentResult
  } from "../../interfaces";

export default {
Mutation: {
 
  processPayment: async (
        _parent: object,
        { input, id }: { input:iPaymentData, id:number },
        { models }: { models: iModels }
      ): Promise<any> => {

        const OrderToCreate = await models.Order.findByPk(id);
       
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

            const Order = await OrderToCreate.update(
              { status : "Creada" }
              //,{ where: { id } }
            );
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

