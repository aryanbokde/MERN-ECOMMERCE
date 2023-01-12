const express = require("express");
const { 
    newOrder, 
    getSingleOrder, 
    myOrders, 
    getAllOrdersAdmin, 
    updateOrder, 
    deleteOrder 
} = require("../Controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// User Orders router for User
router.route("/order/new").post( isAuthenticatedUser, newOrder );
router.route("/order/:id").get( isAuthenticatedUser, getSingleOrder );
router.route("/orders/me").get( isAuthenticatedUser, myOrders );

// User Orders router for Admin
router.route("/admin/orders").get( isAuthenticatedUser, authorizeRoles('admin'), getAllOrdersAdmin );
router.route("/admin/order/:id").put( isAuthenticatedUser, authorizeRoles('admin'), updateOrder ).delete( isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);


module.exports = router;