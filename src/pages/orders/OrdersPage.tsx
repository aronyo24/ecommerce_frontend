import { Link } from 'react-router-dom';
import { Package, ArrowRight, Eye } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/mockData';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  processing: 'bg-primary/10 text-primary border-primary/20',
  shipped: 'bg-accent/10 text-accent border-accent/20',
  delivered: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

const paymentStatusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  success: 'bg-success/10 text-success border-success/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function OrdersPage() {
  const orders = mockOrders;

  if (orders.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">No Orders Yet</h1>
          <p className="mb-8 text-muted-foreground">
            Start shopping to see your orders here.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link to="/products">
              Browse Products
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
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="animate-fade-up rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="font-semibold">{order.id}</span>
                    <Badge variant="outline" className={statusColors[order.status]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={paymentStatusColors[order.paymentStatus]}>
                      Payment: {order.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Items Preview */}
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="h-12 w-12 overflow-hidden rounded-lg border-2 border-background bg-secondary/30"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-background bg-secondary text-sm font-medium">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                {/* Total & Actions */}
                <div className="flex items-center gap-4 md:text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/orders/${order.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
