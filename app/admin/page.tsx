import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const [productsCount, ordersCount, usersCount, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({ select: { total: true } }),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: "إجمالي المنتجات",
      value: productsCount,
      icon: Package,
      color: "text-blue-500",
    },
    {
      label: "إجمالي الطلبات",
      value: ordersCount,
      icon: ShoppingCart,
      color: "text-green-500",
    },
    {
      label: "إجمالي المستخدمين",
      value: usersCount,
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "إجمالي الإيرادات",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-yellow-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        لوحة التحكم
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className={`h-5 w-5 ${color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}