import { useState } from "react";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
}

const PaymentForm = ({ amount, onSuccess }: PaymentFormProps) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setError("");
      onSuccess();
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-secondary rounded-lg p-6 shadow-md" aria-label="Payment form">
      <div>
        <label className="block font-medium mb-1 text-foreground">Credit Card Number</label>
        <input type="text" className="input input-bordered w-full px-4 py-2 rounded-lg bg-background text-foreground" required maxLength={19} pattern="[0-9 ]+" aria-label="Credit Card Number" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1 text-foreground">Expiry</label>
          <input type="text" className="input input-bordered w-full px-4 py-2 rounded-lg bg-background text-foreground" required maxLength={5} placeholder="MM/YY" aria-label="Expiry" />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1 text-foreground">CVC</label>
          <input type="text" className="input input-bordered w-full px-4 py-2 rounded-lg bg-background text-foreground" required maxLength={4} aria-label="CVC" />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1 text-foreground">Other Payment Methods</label>
        <select className="input input-bordered w-full px-4 py-2 rounded-lg bg-background text-foreground" aria-label="Other Payment Methods">
          <option>Credit/Debit Card</option>
          <option>UPI</option>
          <option>Net Banking</option>
          <option>PayPal</option>
        </select>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="btn-primary w-full" disabled={processing} aria-busy={processing} aria-label="Pay">
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default PaymentForm; 