import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  stripe_price_id?: string;
  highlight?: boolean;
  cta_text?: string;
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  plans: Plan[];
}

const PricingTable: React.FC<PricingTableProps> = ({ title, subtitle, plans = [] }) => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    if (plan.stripe_price_id) {
      navigate(`/checkout?priceId=${plan.stripe_price_id}`);
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {title && <h2 className="text-4xl font-bold">{title}</h2>}
          {subtitle && <p className="mt-4 text-xl opacity-75">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`card bg-base-100 shadow-xl ${plan.highlight ? 'border-2 border-primary' : ''}`}>
              <div className="card-body">
                <h3 className="card-title justify-center text-lg uppercase tracking-wide opacity-70">{plan.name}</h3>
                <div className="text-center my-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="text-sm opacity-50">/{plan.period}</span>}
                </div>
                <ul className="space-y-4 my-6 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center">
                      <Check className="w-5 h-5 text-success mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="card-actions justify-center mt-4">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`btn w-full ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {plan.cta_text || 'Select Plan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
