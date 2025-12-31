import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link to="/products">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
            Clear Cart
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Button variant="ghost" asChild>
                <Link to="/products">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
