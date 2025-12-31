import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, CreditCard, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { mockProducts } from '@/data/mockData';

const features = [
  {
    icon: ShoppingBag,
    title: 'Curated Products',
    description: 'Hand-picked premium products from trusted brands worldwide.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay safely with Stripe or bKash. Your data is always protected.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $50. Quick and reliable delivery.',
  },
  {
    icon: Shield,
    title: 'Money-Back Guarantee',
    description: '30-day hassle-free returns. Shop with confidence.',
  },
];

export default function Index() {
  const featuredProducts = mockProducts.filter(p => p.status === 'active').slice(0, 4);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Welcome to ShopFlow ✨
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Discover Premium Products,{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Shop the latest tech, accessories, and lifestyle products with secure checkout powered by Stripe and bKash.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="accent" size="xl" asChild>
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/products">Browse Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-up flex items-start gap-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold md:text-3xl">Featured Products</h2>
              <p className="text-muted-foreground">Discover our most popular items</p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground md:p-16">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 translate-y-[-50%] rounded-full bg-accent/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Start Shopping?</h2>
              <p className="mb-8 text-primary-foreground/80">
                Join thousands of happy customers. Create an account today and get 10% off your first order.
              </p>
              <Button variant="secondary" size="xl" asChild>
                <Link to="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
