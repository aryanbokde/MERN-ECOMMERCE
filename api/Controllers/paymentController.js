const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) =>{
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: 'inr',
        metadata:{
            company:"Ecommerce",
        },    
    });
    res.status(200).json({success:true, client_secret:myPayment.client_secret});
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) =>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
});

exports.processToPayment = catchAsyncErrors(async (req, res, next) =>{
    
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency:'inr',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: "Product Description..!",
                    metadata:{
                        id:item.product
                    }
                },
                unit_amount:item.price * 100,
            },
            quantity: item.quantity,
        }
    });    
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],    
          
        shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 0, currency: 'inr'},
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {unit: 'business_day', value: 5},
                  maximum: {unit: 'business_day', value: 7},
                },
              },
            },
        ],
        line_items,        
        // phone_number_collection: {
        //     enabled: true,
        // },
        // billing_address_collection: "",
        mode:'payment',
        // shipping_address_collection: {allowed_countries: ['IN']},
        // custom_text: { 
        // shipping_address: {
        //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
        // },
        // submit: {message: 'We\'ll email you instructions on how to get started.'},
        // },
        success_url:`${process.env.FRONTEND_URL}/checkout-success`,
        cancel_url:`${process.env.FRONTEND_URL}/cart`,
   
    });
    // console.log(session);
    res.send({ url:session.url });
});