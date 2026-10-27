import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Plus, Trash2, Check, Sparkles } from 'lucide-react';

export default function ProductFormModal({ product, onClose }) {
  const { addProduct, updateProduct, allCategories, addCategory, formatPrice } = useStore();
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: allCategories[0] || 'Ready to Wear',
    price: '',
    comparePrice: '',
    stock: 10,
    image: '',
    hoverImage: '',
    description: '',
    isFeatured: false,
    isNew: true,
    // Attribute options toggles
    hasSizes: false,
    sizes: ['S', 'M', 'L'],
    hasColors: false,
    colors: [{ name: 'Black', hex: '#1E2329' }],
    hasFabric: false,
    fabric: '',
    hasCustomNote: false,
    customNote: ''
  });

  const [newCatInput, setNewCatInput] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        category: product.category || allCategories[0] || 'Ready to Wear',
        price: product.price || '',
        comparePrice: product.comparePrice || '',
        stock: product.stock !== undefined ? product.stock : 10,
        image: product.image || '',
        hoverImage: product.hoverImage || '',
        description: product.description || '',
        isFeatured: Boolean(product.isFeatured),
        isNew: Boolean(product.isNew),
        hasSizes: Boolean(product.hasSizes),
        sizes: product.sizes || ['S', 'M', 'L'],
        hasColors: Boolean(product.hasColors),
        colors: product.colors || [{ name: 'Default', hex: '#0F766E' }],
        hasFabric: Boolean(product.hasFabric),
        fabric: product.fabric || '',
        hasCustomNote: Boolean(product.hasCustomNote),
        customNote: product.customNote || ''
      });
    }
  }, [product, allCategories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleSize = (sz) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(sz);
      const newSizes = exists
        ? prev.sizes.filter((s) => s !== sz)
        : [...prev.sizes, sz];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleAddColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: 'Color', hex: '#0F766E' }]
    }));
  };

  const handleColorChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.colors];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, colors: updated };
    });
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleAddNewCategory = (e) => {
    e.preventDefault();
    if (newCatInput.trim()) {
      addCategory(newCatInput.trim());
      setFormData((prev) => ({ ...prev, category: newCatInput.trim() }));
      setNewCatInput('');
      setShowAddCat(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price || 0),
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : null,
      stock: Number(formData.stock || 0)
    };

    if (isEditing) {
      updateProduct(product.id, payload);
    } else {
      addProduct(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] p-6 sm:p-8 my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7E5E0] pb-4">
          <div>
            <h2 className="text-xl font-display font-bold text-[#1E2329]">
              {isEditing ? `Edit Product: ${product.name}` : 'Add New Product'}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Configure product details and customize specific variant options.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              1. General Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Embroidered Lawn Kurta"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="FAB-101"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#1E2329]">
                  Category *
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCat(!showAddCat)}
                  className="text-[11px] font-semibold text-[#0F766E] hover:underline"
                >
                  {showAddCat ? 'Select Existing' : '+ Add New Category'}
                </button>
              </div>

              {showAddCat ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    placeholder="Enter new category name (e.g. Formal Wear)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                  />
                  <button
                    type="button"
                    onClick={handleAddNewCategory}
                    className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0D5C58]"
                  >
                    Save Category
                  </button>
                </div>
              ) : (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E] cursor-pointer"
                >
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Price (PKR), Compare Price & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  Price (Rs. PKR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="3500"
                  required
                  min="0"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  Compare Price (Optional)
                </label>
                <input
                  type="number"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleChange}
                  placeholder="4200"
                  min="0"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  Stock Units *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC ATTRIBUTE TOGGLES (CRITICAL CHANGE) */}
          <div className="space-y-4 pt-4 border-t border-[#E7E5E0]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                2. Customizable Product Attributes
              </h3>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Every product is unique. Enable only the attributes relevant to this specific garment.
              </p>
            </div>

            {/* Attribute Toggle 1: Sizes */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasSizes"
                  checked={formData.hasSizes}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <div>
                  <span className="text-xs font-bold text-[#1E2329] block">
                    This product has Sizes (e.g. S, M, L)
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Leave unchecked for unstitched suits, shawls, one-size, or accessories.
                  </span>
                </div>
              </label>

              {formData.hasSizes && (
                <div className="pt-2 border-t border-[#E7E5E0] space-y-2 animate-in fade-in">
                  <span className="text-[11px] font-semibold text-[#475569] block">
                    Available Sizes for this product:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((sz) => {
                      const isSelected = formData.sizes.includes(sz);
                      return (
                        <button
                          type="button"
                          key={sz}
                          onClick={() => toggleSize(sz)}
                          className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                            isSelected
                              ? 'bg-[#0F766E] text-white font-bold'
                              : 'bg-white border border-[#E7E5E0] text-[#64748B]'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Attribute Toggle 2: Colors */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasColors"
                  checked={formData.hasColors}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <div>
                  <span className="text-xs font-bold text-[#1E2329] block">
                    This product has Color Swatches
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Enable if customers can select between multiple color options.
                  </span>
                </div>
              </label>

              {formData.hasColors && (
                <div className="pt-2 border-t border-[#E7E5E0] space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#475569]">
                      Colors List:
                    </span>
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="text-[11px] text-[#0F766E] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Color
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.colors.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="color"
                          value={c.hex}
                          onChange={(e) => handleColorChange(i, 'hex', e.target.value)}
                          className="w-7 h-7 rounded-lg border border-gray-300 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => handleColorChange(i, 'name', e.target.value)}
                          placeholder="Color name (e.g. Teal Blue, Maroon)"
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E7E5E0]"
                        />
                        {formData.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(i)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Attribute Toggle 3: Fabric Details */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasFabric"
                  checked={formData.hasFabric}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <div>
                  <span className="text-xs font-bold text-[#1E2329] block">
                    This product has Fabric / Material info
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Specify fabric type like Lawn, Cotton, Khaddar, Silk, Chiffon.
                  </span>
                </div>
              </label>

              {formData.hasFabric && (
                <div className="pt-2 border-t border-[#E7E5E0] animate-in fade-in">
                  <input
                    type="text"
                    name="fabric"
                    value={formData.fabric}
                    onChange={handleChange}
                    placeholder="e.g. 100% Pure Lawn with Embroidered Neckline"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              )}
            </div>

            {/* Attribute Toggle 4: Custom Details / Piece Note */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasCustomNote"
                  checked={formData.hasCustomNote}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <div>
                  <span className="text-xs font-bold text-[#1E2329] block">
                    Custom Specifications / Notes
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    E.g. Piece count (2-Piece, 3-Piece), styling notes, etc.
                  </span>
                </div>
              </label>

              {formData.hasCustomNote && (
                <div className="pt-2 border-t border-[#E7E5E0] animate-in fade-in">
                  <input
                    type="text"
                    name="customNote"
                    value={formData.customNote}
                    onChange={handleChange}
                    placeholder="e.g. Includes Embroidered Shirt + Trouser + Voile Dupatta"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Media & Descriptions */}
          <div className="space-y-4 pt-4 border-t border-[#E7E5E0]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              3. Imagery & Description
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Main Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/... or any image link"
                required
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Secondary Hover Image URL (Optional)
              </label>
              <input
                type="url"
                name="hoverImage"
                value={formData.hoverImage}
                onChange={handleChange}
                placeholder="https://... (shows when mouse hovers over card)"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Product Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the cut, embroidery, and styling..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {/* Featured & New arrival toggles */}
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <span className="text-xs font-medium text-[#1E2329]">
                  Show on Homepage Featured
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <span className="text-xs font-medium text-[#1E2329]">
                  Mark as New Arrival
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#1E2329] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D5C58] text-white text-xs font-semibold tracking-wide shadow-sm transition-all"
            >
              {isEditing ? 'Save Changes' : 'Publish Product'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
