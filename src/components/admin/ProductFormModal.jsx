import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRESET_IMAGES } from '../../data/defaultData';
import { X, Image, Sparkles, Check, Plus, Trash2 } from 'lucide-react';

export default function ProductFormModal({ product, onClose }) {
  const { addProduct, updateProduct, formatPrice } = useStore();
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Outerwear',
    price: 450,
    comparePrice: '',
    stock: 10,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Obsidian', hex: '#0B0B0C' },
      { name: 'Alabaster', hex: '#FAF9F6' }
    ],
    image: PRESET_IMAGES[0].url,
    hoverImage: PRESET_IMAGES[1].url,
    description: '',
    fabricCare: '100% Virgin Fiber. Specialist dry clean only.',
    isFeatured: false,
    isNew: true
  });

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const categories = ['Outerwear', 'Knitwear', 'Tailoring', 'Streetwear', 'Accessories'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        category: product.category || 'Outerwear',
        price: product.price || 0,
        comparePrice: product.comparePrice || '',
        stock: product.stock !== undefined ? product.stock : 10,
        sizes: product.sizes || ['S', 'M', 'L'],
        colors: product.colors || [{ name: 'Noir', hex: '#000000' }],
        image: product.image || PRESET_IMAGES[0].url,
        hoverImage: product.hoverImage || '',
        description: product.description || '',
        fabricCare: product.fabricCare || '',
        isFeatured: Boolean(product.isFeatured),
        isNew: Boolean(product.isNew)
      });
    }
  }, [product]);

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
      return { ...prev, sizes: newSizes.length > 0 ? newSizes : ['M'] };
    });
  };

  const handlePresetSelect = (presetUrl) => {
    setFormData((prev) => ({ ...prev, image: presetUrl }));
  };

  const handleAddColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: 'Tone', hex: '#71717A' }]
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : null,
      stock: Number(formData.stock)
    };

    if (isEditing) {
      updateProduct(product.id, payload);
    } else {
      addProduct(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E4E4E0] dark:border-[#202025] flex items-center justify-between bg-white/50 dark:bg-[#18181B]/50">
          <div>
            <h2 className="text-lg font-editorial font-bold uppercase tracking-tight">
              {isEditing ? `Edit Garment: ${product.name}` : 'Catalog New Architectural Garment'}
            </h2>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
              Changes persist instantly to localStorage and reflect in the live storefront.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#71717A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body + Live Preview */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Fields (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Title & SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Garment Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sartorial Cashmere Trench Coat"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  SKU Identifier
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="NOC-OT-009"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>
            </div>

            {/* Category & Pricing & Stock */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Compare Price ($)
                </label>
                <input
                  type="number"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleChange}
                  min="0"
                  placeholder="Optional"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Stock Units *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>
            </div>

            {/* Sizes Checkboxes */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1.5">
                Available Sizes
              </label>
              <div className="flex gap-2">
                {availableSizes.map((sz) => {
                  const isChecked = formData.sizes.includes(sz);
                  return (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        isChecked
                          ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] font-bold shadow-sm'
                          : 'border border-[#E4E4E0] dark:border-[#27272A] text-[#71717A] hover:border-[#0B0B0C]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Swatches Editor */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
                  Color Palette Swatches
                </label>
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="text-[11px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Color
                </button>
              </div>

              <div className="space-y-2">
                {formData.colors.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={c.hex}
                      onChange={(e) => handleColorChange(idx, 'hex', e.target.value)}
                      className="w-7 h-7 rounded border border-gray-300 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => handleColorChange(idx, 'name', e.target.value)}
                      placeholder="Color name (e.g. Charcoal)"
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A]"
                    />
                    {formData.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Image URLs & Preset Fashion Buttons */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A]">
                Primary High-Resolution Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />

              {/* Quick Preset Buttons */}
              <div>
                <span className="text-[10px] font-mono uppercase text-[#71717A] block mb-1">
                  Quick High-Fashion Preset Photos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handlePresetSelect(preset.url)}
                      className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                        formData.image === preset.url
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-bold'
                          : 'border-[#E4E4E0] dark:border-[#27272A] hover:border-[#0B0B0C]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Image URL */}
              <div className="pt-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Secondary Hover Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="hoverImage"
                  value={formData.hoverImage}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/... (shows on mouse hover)"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>
            </div>

            {/* Description & Fabric Care */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Editorial Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Architectural cuts, drape, and inspiration..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                  Material & Care Instructions
                </label>
                <input
                  type="text"
                  name="fabricCare"
                  value={formData.fabricCare}
                  onChange={handleChange}
                  placeholder="e.g. 100% Mongolian Cashmere. Specialist dry clean only."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>
            </div>

            {/* Toggles (Featured & New) */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0B0B0C] accent-[#D4AF37]"
                />
                <span className="text-xs font-medium">Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0B0B0C] accent-[#D4AF37]"
                />
                <span className="text-xs font-medium">Flag as New Arrival</span>
              </label>
            </div>

          </div>

          {/* Live Storefront Card Preview (4 Cols) */}
          <div className="lg:col-span-4 bg-white/60 dark:bg-[#18181B]/60 p-5 rounded-2xl border border-[#E4E4E0] dark:border-[#27272A] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] block mb-3">
                Live Storefront Card Preview
              </span>

              {/* Preview Card */}
              <div className="rounded-xl overflow-hidden border border-[#E4E4E0] dark:border-[#27272A] bg-[#ECECE8] dark:bg-[#101012]">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-200">
                  <img
                    src={formData.image || PRESET_IMAGES[0].url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = PRESET_IMAGES[0].url;
                    }}
                  />
                  {formData.stock < 5 && formData.stock > 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500 text-white">
                      Only {formData.stock} Left
                    </span>
                  )}
                  {formData.stock <= 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black text-white">
                      Sold Out
                    </span>
                  )}
                  {formData.isFeatured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4AF37] text-black">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-3 text-xs space-y-1">
                  <p className="text-[9px] uppercase font-mono tracking-widest text-[#71717A]">
                    {formData.category}
                  </p>
                  <p className="font-semibold truncate">{formData.name || 'Garment Name'}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold font-mono">{formatPrice(formData.price)}</span>
                    {formData.comparePrice && (
                      <span className="text-[11px] text-[#71717A] line-through font-mono">
                        {formatPrice(formData.comparePrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit & Cancel Actions */}
            <div className="pt-6 space-y-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all shadow-lg active:scale-98"
              >
                {isEditing ? 'Save Changes' : 'Publish to Catalog'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs text-[#71717A] hover:text-black dark:hover:text-white transition-colors"
              >
                Discard
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
