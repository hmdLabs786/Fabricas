import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductFormModal from './ProductFormModal';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Star,
  Package,
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function ProductsManagement() {
  const {
    products,
    deleteProduct,
    restockProduct,
    toggleFeatured,
    formatPrice,
    openQuickView
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'low', 'out'
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = ['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Streetwear', 'Accessories'];

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      p.sku.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term);

    let matchesStock = true;
    if (stockFilter === 'low') matchesStock = p.stock > 0 && p.stock < 5;
    if (stockFilter === 'out') matchesStock = p.stock <= 0;

    return matchesCat && matchesSearch && matchesStock;
  });

  const handleEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleDelete = (prod) => {
    if (window.confirm(`Are you sure you want to permanently delete "${prod.name}"?`)) {
      deleteProduct(prod.id);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
            Atelier Inventory & Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6] mt-1">
            Products Management
          </h1>
        </div>

        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search garments by title, SKU, or style..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-3">
          <label htmlFor="products-category" className="sr-only">Filter by category</label>
          <select
            id="products-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div className="md:col-span-3">
          <label htmlFor="products-stock" className="sr-only">Filter by stock level</label>
          <select
            id="products-stock"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] focus:outline-none cursor-pointer"
          >
            <option value="all">Stock: All Inventory</option>
            <option value="low">Stock: Low Stock (&lt; 5)</option>
            <option value="out">Stock: Sold Out (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-[#E4E4E0] dark:border-[#202025] bg-white dark:bg-[#121214] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] dark:bg-[#18181B] border-b border-[#E4E4E0] dark:border-[#202025] text-[#71717A] dark:text-[#A1A1AA] uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4">Garment</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Sizes</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E0]/60 dark:divide-[#202025]/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#71717A]">
                    No garments found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isSoldOut = p.stock <= 0;
                  const isLow = p.stock > 0 && p.stock < 5;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Garment Image & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-14 object-cover rounded-lg bg-[#ECECE8] flex-shrink-0 cursor-pointer"
                            onClick={() => openQuickView(p)}
                          />
                          <div>
                            <p
                              onClick={() => openQuickView(p)}
                              className="font-semibold text-[#0B0B0C] dark:text-[#FAF9F6] hover:text-[#D4AF37] transition-colors cursor-pointer"
                            >
                              {p.name}
                            </p>
                            <p className="text-[10px] text-[#71717A] font-mono mt-0.5">
                              {p.colors?.map((c) => c.name).join(' / ')}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#71717A]">
                        {p.sku}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-black/5 dark:bg-white/5">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono font-bold">{formatPrice(p.price)}</span>
                          {p.comparePrice && (
                            <span className="text-[10px] font-mono text-[#71717A] line-through">
                              {formatPrice(p.comparePrice)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Level with Color-Coding */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              isSoldOut
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                : isLow
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            }`}
                          >
                            {isSoldOut ? 'Sold Out (0)' : `${p.stock} units`}
                          </span>

                          {p.stock < 10 && (
                            <button
                              onClick={() => restockProduct(p.id, 10)}
                              className="px-1.5 py-0.5 rounded border border-[#E4E4E0] dark:border-[#27272A] hover:bg-[#D4AF37] hover:text-black text-[9px] font-mono font-bold transition-colors"
                              title="Quick Restock +10"
                            >
                              +10
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Sizes */}
                      <td className="py-3.5 px-4 font-mono text-[10px] text-[#71717A]">
                        {p.sizes?.join(', ')}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(p.id)}
                          className="p-1 hover:scale-110 transition-transform"
                          title={p.isFeatured ? 'Featured on storefront' : 'Not featured'}
                        >
                          <Star
                            className={`w-4 h-4 mx-auto ${
                              p.isFeatured
                                ? 'fill-[#D4AF37] stroke-[#D4AF37]'
                                : 'text-[#8E8E93] opacity-40'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#71717A] hover:text-[#0B0B0C] dark:hover:text-white transition-colors"
                            title="Edit Product Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[#71717A] hover:text-rose-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal (Add / Edit) */}
      {isFormModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}
