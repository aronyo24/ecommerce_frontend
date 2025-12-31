import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Package, Truck, Shield, Check } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '@/data/mockData';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
          <Package className="mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">Product Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const isOutOfStock = product.stock === 0 || product.status === 'inactive';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/30">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <span className="rounded-full bg-destructive px-6 py-2 text-lg font-medium text-destructive-foreground">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-in-right">
            <div className="mb-2">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {product.sku}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{product.name}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
              {!isOutOfStock && (
                <span className="ml-3 text-sm text-muted-foreground">
                  {product.stock} in stock
                </span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {!isOutOfStock && (
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center rounded-lg border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="accent"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            )}

            {/* Features */}
            <div className="space-y-4 rounded-xl border border-border bg-secondary/30 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-muted-foreground">Hassle-free money back guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Check className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">Stripe & bKash supported</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
