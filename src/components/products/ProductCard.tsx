import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    
    addItem(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isOutOfStock = product.stock === 0 || product.status === 'inactive';

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <span className="rounded-full bg-destructive px-4 py-1 text-sm font-medium text-destructive-foreground">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 bg-background/90 backdrop-blur-sm"
              asChild
            >
              <Link to={`/products/${product.id}`}>
                <Eye className="mr-1 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.sku}
          </p>
          <h3 className="mb-2 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {!isOutOfStock && (
            <span className="text-xs text-muted-foreground">
              {product.stock} in stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
