import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

interface FormField {
  type: 'text' | 'email' | 'textarea' | 'number';
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface DynamicFormProps {
  form_id: string;
  title?: string;
  fields: FormField[];
  submit_label?: string;
  success_message?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ 
  form_id, 
  title, 
  fields = [], 
  submit_label = "Submit",
  success_message = "Thank you! We received your submission."
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const hostname = window.location.hostname;
      const { error } = await supabase
        .from('universal_submissions')
        .insert({
          app_id: hostname,
          data: {
            form_id,
            ...formData,
            submitted_at: new Date().toISOString()
          }
        });

      if (error) throw error;
      setStatus('success');
      setFormData({});
    } catch (err: any) {
      console.error('Submission Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit form');
    }
  };

  if (status === 'success') {
    return (
      <div className="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <div>
          <h3 className="font-bold">Success!</h3>
          <div className="text-xs">{success_message}</div>
        </div>
        <button onClick={() => setStatus('idle')} className="btn btn-sm btn-ghost">Send another</button>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-lg mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {title && <h2 className="card-title justify-center mb-4">{title}</h2>}
        
        <form onSubmit={handleSubmit} className="form-control gap-4">
          {fields.map((field, idx) => (
            <div key={idx} className="w-full">
              <label htmlFor={field.name} className="label">
                <span className="label-text">{field.label} {field.required && <span className="text-error">*</span>}</span>
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          ))}

          {status === 'error' && (
            <div className="alert alert-error text-sm mt-2">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="card-actions justify-end mt-4">
             <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn btn-primary w-full"
            >
              {status === 'submitting' ? <span className="loading loading-spinner"></span> : submit_label}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
