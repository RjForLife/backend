import mongoose from "mongoose";


// const itemSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   qty: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

const schema = new mongoose.Schema({
    shipping_Info :{
        hNo:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        country:{
            type:String,
           
        },
        pincode:{
            type:Number,
            
        },
        phoneNo:{
            type:Number,
           
        }
    },
    orderItems:{
      title:{
         qty:{
        type:Number,
        required:true,
           },
      price:{
        type:Number,
        required:true,
          }
      },
     
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },

    payment_Method:{
        type:String,
        enum:["COD","Online"],
        default:"COD"
    },
    payment_Info:{
        type:mongoose.Schema.ObjectId,
        ref:"Payment",
    },
    paid_At:{
        type:Date,
    },
    items_Price:{
        type:Number,
        default:0,
    },
    shipping_Charges:{
        type:Number,
        default:0,
    },
    tax:{
        type:Number,
        default:0,
    },
    total_Amount:{
        type:Number,
        default:0,
    },
    order_Status:{
        type:String,
        enum:["Preparing","Shipped","Delivered"]
        ,default:"Preparing"
    },
    delivered_At:{
        type:Date
    },
    order_Created_At:{
        type:Date,
        default:Date.now,
    }
    

})

export const OrderDB = mongoose.model("Order",schema)
