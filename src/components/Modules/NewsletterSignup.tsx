import React, { useState } from 'react';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  provider?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  title = "Subscribe to our newsletter", 
  description = "Get the latest updates directly in your inbox.",
  provider = "internal"
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribing ${email} via ${provider}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="alert alert-success">
        <span>Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 w-full shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
        <form onSubmit={handleSubmit} className="join mt-4 w-full">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered join-item w-full"
          />
          <button
            type="submit"
            className="btn btn-primary join-item"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
