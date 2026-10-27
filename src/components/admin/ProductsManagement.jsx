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
  ShoppingBag,
  Sparkles,
  Images
} from 'lucide-react';

export default function ProductsManagement() {
  const {
    products,
    deleteProduct,
    toggleFeatured,
    formatPrice,
    openQuickView
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = (products || []).filter((p) => {
    if (!p) return false;
    const term = searchTerm.toLowerCase();
    const name = (p.name || '').toLowerCase();
    const sku = (p.sku || '').toLowerCase();
    const fabric = (p.fabric || '').toLowerCase();
    return name.includes(term) || sku.includes(term) || fabric.includes(term);
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
            Atelier Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2329] mt-0.5">
            Garment Inventory
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Total of {products.length} active collection pieces
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="shimmer-hover px-6 py-3 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#0F766E]/20 hover:scale-103 active:scale-97"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search garments by name, SKU, or fabric..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E] shadow-2xs"
        />
      </div>

      {/* Inventory Table */}
      <div className="rounded-3xl border border-[#E7E5E0] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#E7E5E0] text-[#64748B] uppercase font-mono">
              <tr>
                <th className="py-3.5 px-5">Garment Details</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Price (PKR)</th>
                <th className="py-3.5 px-4">Attributes</th>
                <th className="py-3.5 px-4 text-center">Images</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E0]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-[#64748B]">
                    <Package className="w-10 h-10 text-[#94A3B8] mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-[#1E2329]">No garments in catalog</p>
                    <p className="text-xs text-[#64748B] mt-0.5 mb-4">Click "Add New Product" to upload your collection images and details.</p>
                    <button
                      onClick={handleAddNew}
                      className="px-5 py-2 rounded-full bg-[#0F766E] text-white text-xs font-semibold"
                    >
                      + Add First Product
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const imageCount = (p.images && p.images.length) || (p.image ? 1 : 0);
                  const displayImg = (p.images && p.images[0]) || p.image;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5">
                          {displayImg ? (
                            <img
                              src={displayImg}
                              alt={p.name}
                              className="w-12 h-15 object-cover rounded-xl bg-[#F8F7F4] flex-shrink-0 cursor-pointer shadow-2xs"
                              onClick={() => openQuickView(p)}
                            />
                          ) : (
                            <div className="w-12 h-15 rounded-xl bg-[#F8F7F4] flex items-center justify-center text-[#94A3B8] flex-shrink-0">
                              <ShoppingBag className="w-5 h-5 opacity-40" />
                            </div>
                          )}
                          <div>
                            <p
                              onClick={() => openQuickView(p)}
                              className="font-semibold text-[#1E2329] hover:text-[#0F766E] transition-colors cursor-pointer text-sm"
                            >
                              {p.name}
                            </p>
                            <span className="text-[10px] text-[#64748B] font-mono">
                              ID: {String(p.id || '').slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                        {p.sku || '—'}
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
                      <td className="py-3.5 px-4 text-[11px] text-[#64748B]">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {p.hasSizes && p.sizes?.length > 0 ? (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E7E5E0] text-[10px] font-mono">
                              Sizes: {p.sizes.join(', ')}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#94A3B8] italic">One Size / Unstitched</span>
                          )}
                          {p.hasColors && (
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E7E5E0] text-[10px] font-mono">
                              {p.colors?.length} Colors
                            </span>
                          )}
                          {p.hasFabric && p.fabric && (
                            <span className="px-2 py-0.5 rounded-md bg-[#0F766E]/10 text-[#0F766E] text-[10px] truncate max-w-[140px]">
                              {p.fabric}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Photo Angles Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E5E0] text-[10px] font-mono font-semibold text-[#475569]">
                          <Images className="w-3 h-3 text-[#0F766E]" />
                          {imageCount} photo{imageCount !== 1 ? 's' : ''}
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(p.id)}
                          className="p-1 hover:scale-110 transition-transform"
                          title={p.isFeatured ? 'Featured on storefront homepage' : 'Click to feature on homepage'}
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
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-2 rounded-xl hover:bg-black/5 text-[#64748B] hover:text-[#0F766E] transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-2 rounded-xl hover:bg-rose-50 text-[#64748B] hover:text-rose-600 transition-colors"
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
