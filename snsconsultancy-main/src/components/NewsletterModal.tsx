import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const initialState = { name: '', email: '', number: '' };

export default function NewsletterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const { data, error } = await supabase
      .from('newsletter_subs')
      .insert([
        { name: form.name, email: form.email, number: form.number }
      ]);

    setLoading(false);
    if (error) setError('Could not submit. Please try again.');
    else {
      setSuccess(true);
      setForm(initialState);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <h4 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h4>
          <form onSubmit={submitForm}>
            <input
              name="name"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="block w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              name="number"
              required
              placeholder="Phone Number"
              value={form.number}
              onChange={handleChange}
              className="block w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="block w-full mb-2 px-3 py-2 border rounded"
            />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-500 mb-2">Thank you for subscribing!</div>}
            <div className="flex gap-2 mt-2">
              <Button disabled={loading} type="submit">
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
              <Button variant="secondary" type="button" onClick={onClose}>
                Close
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
