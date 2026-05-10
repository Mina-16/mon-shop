export default function AdminPage() {
  return (
    <main className="container mx-auto px-4 py-20">

      <h1 className="mb-10 text-5xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border p-8">
          <h2 className="text-2xl font-bold">
            Products
          </h2>

          <p className="mt-2 text-muted-foreground">
            Manage products
          </p>
        </div>

        <div className="rounded-3xl border p-8">
          <h2 className="text-2xl font-bold">
            Orders
          </h2>

          <p className="mt-2 text-muted-foreground">
            Manage orders
          </p>
        </div>

        <div className="rounded-3xl border p-8">
          <h2 className="text-2xl font-bold">
            Users
          </h2>

          <p className="mt-2 text-muted-foreground">
            Manage users
          </p>
        </div>

      </div>
    </main>
  );
}