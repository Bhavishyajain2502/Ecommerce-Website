const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51JMnCISE89oPO9BfxMlu8fNZi09fuWFGo1H9Rc5NOJA9qJfrElCtgNckVHhMOEslbt4v8gukFc7MlL9SNpsP3lXJ004XJU7Qpf");
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome into Ecommerce");
});

app.post("/checkout", async(req, res) => {
    let error;
    let status;
    try{
        const {product, token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create(
            {
                amount: product.price,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: 'All Products Description',
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {idempotencyKey: key})
            status = "success";
    } catch(error){
        console.log(error);
        status = "Error";
    }
    res.json({status});
})

app.listen(8080, () => {
    console.log("App is running on Port 8080");
});