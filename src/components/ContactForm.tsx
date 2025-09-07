import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Label } from './ui/label';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  property?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    interest: 'buy',
    message: '',
    property: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Hier würde normalerweise ein API-Call stehen
      // Für jetzt simulieren wir eine erfolgreiche Übermittlung
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div 
        className="rounded-lg p-6 text-center"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white'
        }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Vielen Dank!</h3>
        <p className="opacity-90">Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-2">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ihr Name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            E-Mail *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ihre@email.de"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="mb-2">
            Telefon *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+66 XX XXX XXXX"
          />
        </div>
        <div>
          <Label htmlFor="interest" className="mb-2">
            Interesse *
          </Label>
          <Select
            id="interest"
            name="interest"
            required
            value={formData.interest}
            onChange={handleChange}
          >
            <option value="buy">Kaufen</option>
            <option value="rent">Vermieten</option>
            <option value="sell">Verkaufen</option>
            <option value="consultation">Beratung</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="property" className="mb-2">
          Interessante Immobilie
        </Label>
        <Input
          id="property"
          name="property"
          type="text"
          value={formData.property}
          onChange={handleChange}
          placeholder="z.B. Villa in Jomtien"
        />
      </div>

      <div>
        <Label htmlFor="message" className="mb-2">
          Nachricht
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Beschreiben Sie Ihre Wünsche..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        style={{
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)'
        }}
      >
        {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
      </Button>
    </form>
  );
}