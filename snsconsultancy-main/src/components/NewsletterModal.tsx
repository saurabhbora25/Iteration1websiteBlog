import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
        <CardHeader>
          <CardTitle>Subscribe to our Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitForm} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                name="number"
                required
                value={form.number}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">Thank you for subscribing!</div>}
            <div className="flex gap-2 pt-2">
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
