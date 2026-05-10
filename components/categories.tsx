const categories = [
  "Audio",
  "Gaming",
  "Wearables",
  "Accessories",
];

export default function Categories() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Categories
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category}
              className="group cursor-pointer rounded-3xl border bg-card p-8 transition hover:-translate-y-2 hover:border-primary hover:shadow-xl"
            >
              <div className="mb-5 h-14 w-14 rounded-2xl bg-primary/10 transition group-hover:bg-primary/20" />

              <h3 className="text-xl font-semibold">
                {category}
              </h3>

              <p className="mt-2 text-muted-foreground">
                Explore premium {category.toLowerCase()} products
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}