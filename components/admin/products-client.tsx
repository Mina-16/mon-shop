"use client";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import ImageUpload from "@/components/upload-button";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = { id: string; name: string };
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  featured: boolean;
  categoryId: string;
  category: Category;
};

export function ProductsClient({
  products: initialProducts,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
    featured: false,
  });

  function openCreate() {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", stock: "", categoryId: "", imageUrl: "", featured: false });
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      categoryId: product.categoryId,
      imageUrl: product.imageUrl,
      featured: product.featured,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const body = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        categoryId: form.categoryId,
        imageUrl: form.imageUrl,
        featured: form.featured,
      };

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const updated = await res.json();
        setProducts(products.map(p => p.id === updated.id ? { ...updated, category: categories.find(c => c.id === updated.categoryId)! } : p));
        toast.success("تم تحديث المنتج");
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const created = await res.json();
        setProducts([{ ...created, category: categories.find(c => c.id === created.categoryId)! }, ...products]);
        toast.success("تم إنشاء المنتج");
      }

      setShowForm(false);
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter(p => p.id !== id));
      toast.success("تم حذف المنتج");
    } catch {
      toast.error("حدث خطأ");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المنتجات</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة منتج
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold">
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input placeholder="اسم المنتج" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <textarea
                placeholder="الوصف"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[80px]"
              />
              <Input type="number" placeholder="السعر" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              <Input type="number" placeholder="المخزون" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
<div className="space-y-2">
  <label className="text-sm text-muted-foreground">صورة المنتج</label>
  <ImageUpload onChange={(url) => setForm({ ...form, imageUrl: url })} />
  {form.imageUrl && (
    <img
      src={form.imageUrl}
      alt="preview"
      className="w-24 h-24 object-cover rounded-lg border"
    />
  )}
</div>

              <select
                value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">اختر الفئة</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                منتج مميز
              </label>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-right p-3">المنتج</th>
              <th className="text-right p-3">الفئة</th>
              <th className="text-right p-3">السعر</th>
              <th className="text-right p-3">المخزون</th>
              <th className="text-right p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8 text-muted-foreground">
                  لا توجد منتجات
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="border-t hover:bg-muted/50">
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3 text-muted-foreground">{product.category?.name}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(product)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}