import React from 'react';

interface StripeCheckoutButtonProps {
  price_id: string;
  label?: string;
  mode?: 'payment' | 'subscription';
}

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ 
  price_id, 
  label = "Checkout",
  mode = 'payment'
}) => {
  
  const handleCheckout = () => {
    // Mock checkout
    alert(`Mock Stripe Checkout initiated for ${price_id} (${mode})`);
  };

  return (
    <button
      onClick={handleCheckout}
      className="btn btn-primary btn-lg shadow-lg"
    >
      {label}
    </button>
  );
};

export default StripeCheckoutButton;
