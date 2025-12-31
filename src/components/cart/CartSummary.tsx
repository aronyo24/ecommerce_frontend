import { Link } from 'react-router-dom';
import { ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

export function CartSummary() {
  const { subtotal, itemCount } = useCart();
  
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

      {/* Free Shipping Progress */}
      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <div className="mb-4 rounded-lg bg-secondary/50 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-primary" />
            <span>
              Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> for free shipping
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="space-y-3 border-b border-border pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shipping === 0 ? 'text-success' : ''}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between py-4">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-bold">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <Button variant="accent" size="lg" className="w-full" asChild disabled={itemCount === 0}>
        <Link to="/checkout">
          Proceed to Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      {/* Trust Badges */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span>🔒 Secure Checkout</span>
        <span>💳 Stripe & bKash</span>
      </div>
    </div>
  );
}
