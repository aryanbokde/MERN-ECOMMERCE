import React from 'react'; 
import './CheckoutSteps.css';
import { Typography, Stepper, StepLabel, Step } from '@mui/material';
import  LocalShipping  from "@mui/icons-material/LocalShipping";
import LibraryAddCheck from "@mui/icons-material/LibraryAddCheck";
import AccountBalance from "@mui/icons-material/AccountBalance";


const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShipping/>,
        },
        {
            label:<Typography>Order Confirm</Typography>,
            icon:<LibraryAddCheck/>,
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalance/>,
        },
    ];
    const stepStyles = {
        boxSizing:"border-box",
    };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index)=>(
            <Step key={index} active={activeStep === index ? true : false } completed={activeStep >= index ? true : false }>
                <StepLabel icon={item.icon} style={{color:activeStep >= index ? "tomoto" : "rgba(0, 0, 0, 0.649)",}}>{item.label}</StepLabel>
            </Step>
        ))}
      </Stepper>
    </>
  )
}

export default CheckoutSteps
