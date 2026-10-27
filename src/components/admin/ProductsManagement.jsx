import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductFormModal from './ProductFormModal';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Package,
  ShoppingBag
} from 'lucide-react';

export default function ProductsManagement() {
  const {
    products,
    deleteProduct,
    restockProduct,
    toggleFeatured,
    formatPrice,
    allCategories,
    openQuickView
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('all');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      (p.sku && p.sku.toLowerCase().includes(term)) ||
      (p.category && p.category.toLowerCase().includes(term));

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
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
            Store Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2329] mt-0.5">
            Inventory Management
          </h1>
        </div>

        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items by title, SKU, or category..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-3">
          <label htmlFor="inventory-category" className="sr-only">Filter by category</label>
          <select
            id="inventory-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div className="md:col-span-3">
          <label htmlFor="inventory-stock" className="sr-only">Filter by stock</label>
          <select
            id="inventory-stock"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none cursor-pointer"
          >
            <option value="all">All Stock Status</option>
            <option value="low">Low Stock (&lt; 5)</option>
            <option value="out">Sold Out (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-[#E7E5E0] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#E7E5E0] text-[#64748B] uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Attributes</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E0]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-[#64748B]">
                    <Package className="w-10 h-10 text-[#94A3B8] mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-[#1E2329]">No products found</p>
                    <p className="text-xs text-[#64748B] mt-0.5 mb-4">Click "Add New Product" to populate your catalog.</p>
                    <button
                      onClick={handleAddNew}
                      className="px-4 py-2 rounded-full bg-[#0F766E] text-white text-xs font-semibold"
                    >
                      + Add Product Now
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isSoldOut = p.stock <= 0;
                  const isLow = p.stock > 0 && p.stock < 5;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-11 h-14 object-cover rounded-xl bg-[#F8F7F4] flex-shrink-0 cursor-pointer"
                              onClick={() => openQuickView(p)}
                            />
                          ) : (
                            <div className="w-11 h-14 rounded-xl bg-[#F8F7F4] flex items-center justify-center text-[#94A3B8] flex-shrink-0">
                              <ShoppingBag className="w-5 h-5 opacity-40" />
                            </div>
                          )}
                          <div>
                            <p
                              onClick={() => openQuickView(p)}
                              className="font-semibold text-[#1E2329] hover:text-[#0F766E] transition-colors cursor-pointer"
                            >
                              {p.name}
                            </p>
                            <span className="text-[10px] text-[#64748B] font-mono">
                              ID: {p.id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                        {p.sku || '—'}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-[#0F766E]/10 text-[#0F766E]">
                          {p.category || 'Clothing'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono font-bold text-[#1E2329]">{formatPrice(p.price)}</span>
                          {p.comparePrice && (
                            <span className="text-[10px] font-mono text-[#94A3B8] line-through">
                              {formatPrice(p.comparePrice)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Attributes summary */}
                      <td className="py-3.5 px-4 text-[11px] text-[#64748B] space-y-0.5">
                        <div className="flex flex-wrap gap-1">
                          {p.hasSizes ? (
                            <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono">
                              Sizes: {p.sizes?.join(', ')}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#94A3B8] italic">No Sizes</span>
                          )}
                          {p.hasColors && (
                            <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono">
                              {p.colors?.length} Colors
                            </span>
                          )}
                          {p.hasFabric && p.fabric && (
                            <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] truncate max-w-[120px]">
                              {p.fabric}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Level */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isSoldOut
                                ? 'bg-rose-100 text-rose-800'
                                : isLow
                                ? 'bg-amber-100 text-amber-800 animate-pulse'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isSoldOut ? 'Sold Out' : `${p.stock} units`}
                          </span>

                          {p.stock < 10 && (
                            <button
                              onClick={() => restockProduct(p.id, 10)}
                              className="px-2 py-0.5 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#0F766E] hover:text-white text-[10px] font-mono font-bold transition-colors"
                              title="Add 10 units"
                            >
                              +10
                            </button>
                          )}
                        </div>
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
                                ? 'fill-amber-400 stroke-amber-400'
                                : 'text-[#D1D5DB]'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-1.5 rounded-lg hover:bg-black/5 text-[#64748B] hover:text-[#0F766E] transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-[#64748B] hover:text-rose-600 transition-colors"
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
