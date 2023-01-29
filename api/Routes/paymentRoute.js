const express = require('express');
const { processPayment, processToPayment, sendStripeApiKey } = require('../controllers/paymentController');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/payment/process').post( isAuthenticatedUser, processPayment);
router.route('/create-checkout-session').post( processToPayment);
router.route('/stripeapikey').get( isAuthenticatedUser, sendStripeApiKey);
module.exports = router;