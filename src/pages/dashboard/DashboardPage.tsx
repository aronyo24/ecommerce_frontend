import { Link } from 'react-router-dom';
import { Package, ShoppingBag, CreditCard, ArrowRight, User } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { mockOrders } from '@/data/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const recentOrders = mockOrders.slice(0, 3);

  const stats = [
    {
      label: 'Total Orders',
      value: mockOrders.length,
      icon: Package,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Total Spent',
      value: `$${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`,
      icon: CreditCard,
      color: 'bg-accent/10 text-accent',
    },
    {
      label: 'Items Purchased',
      value: mockOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0),
      icon: ShoppingBag,
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your account.
            </p>
          </div>
          <Button variant="accent" asChild>
            <Link to="/products">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-up rounded-xl border border-border bg-card p-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/orders">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Link
                      key={order.id}
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div
                            key={i}
                            className="h-10 w-10 overflow-hidden rounded-lg border-2 border-background bg-secondary/30"
                          >
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        order.status === 'delivered'
                          ? 'bg-success/10 text-success'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {order.status}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Profile Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Type</span>
                <span className="capitalize">{user?.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span>
                  {user?.createdAt && new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {user?.role === 'admin' && (
              <Button variant="outline" className="mt-6 w-full" asChild>
                <Link to="/admin">
                  Go to Admin Panel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
