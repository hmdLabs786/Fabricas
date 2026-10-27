import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Plus,
  Trash2,
  Upload,
  ArrowLeft,
  ArrowRight,
  Star,
  Image as ImageIcon,
  Check,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

export default function ProductFormModal({ product, onClose }) {
  const { addProduct, updateProduct, showToast } = useStore();
  const isEditing = Boolean(product);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    comparePrice: '',
    description: '',
    isFeatured: false,
    isNew: true,
    inStock: true,
    // Attribute options toggles
    hasSizes: false,
    sizes: ['S', 'M', 'L'],
    hasColors: false,
    colors: [{ name: 'Default', hex: '#0F766E' }],
    hasFabric: false,
    fabric: '',
    hasCustomNote: false,
    customNote: ''
  });

  // Multiple Images State
  const [images, setImages] = useState([]);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || '',
        comparePrice: product.comparePrice || '',
        description: product.description || '',
        isFeatured: Boolean(product.isFeatured),
        isNew: Boolean(product.isNew),
        inStock: product.inStock !== false,
        hasSizes: Boolean(product.hasSizes),
        sizes: product.sizes || ['S', 'M', 'L'],
        hasColors: Boolean(product.hasColors),
        colors: product.colors || [{ name: 'Teal', hex: '#0F766E' }],
        hasFabric: Boolean(product.hasFabric),
        fabric: product.fabric || '',
        hasCustomNote: Boolean(product.hasCustomNote),
        customNote: product.customNote || ''
      });

      // Load existing images array or fallback to primary/hover images
      const initialImages = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image, product.hoverImage].filter(Boolean);
      setImages(initialImages);
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
      return { ...prev, sizes: newSizes };
    });
  };

  const handleAddColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: 'New Color', hex: '#0F766E' }]
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

  // MULTIPLE IMAGE UPLOAD HANDLERS
  const processFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (!validFiles.length) {
      showToast('Please select valid image files', 'error');
      return;
    }

    let loadedCount = 0;
    const newImages = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        loadedCount++;
        if (loadedCount === validFiles.length) {
          setImages(prev => [...prev, ...newImages]);
          showToast(`Uploaded ${loadedCount} image${loadedCount > 1 ? 's' : ''}`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e) => {
    processFiles(e.target.files);
    e.target.value = ''; // reset so same files can be re-selected if desired
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // IMAGE REARRANGE CONTROLS
  const moveImage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setImages(updated);
  };

  const setAsCover = (index) => {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    setImages([selected, ...updated]);
    showToast('Cover image updated', 'info');
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    setImages(prev => [...prev, urlInput.trim()]);
    setUrlInput('');
    setShowUrlFallback(false);
    showToast('Image link added', 'success');
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Please enter a product name', 'error');
      return;
    }

    if (!formData.price) {
      showToast('Please enter a valid price', 'error');
      return;
    }

    if (images.length === 0) {
      showToast('Please upload at least one product image', 'error');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : null,
      images: images,
      image: images[0] || '',
      hoverImage: images[1] || images[0] || '',
      inStock: true
    };

    if (isEditing) {
      updateProduct(product.id, payload);
    } else {
      addProduct(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 md:p-8 flex items-start justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] my-auto overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header — Always in View */}
        <div className="flex items-center justify-between border-b border-[#E7E5E0] px-6 py-4 bg-white/95 backdrop-blur-md shrink-0 z-10">
          <div>
            <h2 className="text-xl font-display font-bold text-[#1E2329]">
              {isEditing ? `Edit: ${formData.name || 'Garment'}` : 'Add New Product'}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Upload multiple images, rearrange angles, and configure details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-7">
          
          {/* SECTION 1: GENERAL INFORMATION (Always visible at top) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                1. General Information
              </h3>
            </div>

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
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  SKU Code (Optional)
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="FAB-101"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Price (Rs. PKR) & Compare Price (No stock units) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                  Original / Compare Price (Optional)
                </label>
                <input
                  type="number"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleChange}
                  placeholder="4200 (shows strike-through)"
                  min="0"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: MULTI-IMAGE UPLOAD & REARRANGEMENT */}
          <div className="space-y-4 pt-5 border-t border-[#E7E5E0]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C87D55]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C87D55]">
                  2. Product Images ({images.length} Uploaded)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUrlFallback(!showUrlFallback)}
                className="text-[11px] text-[#0F766E] hover:underline flex items-center gap-1 font-medium"
              >
                <LinkIcon className="w-3 h-3" />
                {showUrlFallback ? 'Hide URL option' : '+ Paste image link'}
              </button>
            </div>

            {/* URL Fallback Bar */}
            {showUrlFallback && (
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] flex gap-2 animate-in fade-in">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste direct image URL (https://...)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  className="px-4 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0D5C58]"
                >
                  Add
                </button>
              </div>
            )}

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#0F766E] bg-[#0F766E]/5 scale-[0.99]'
                  : 'border-[#E7E5E0] hover:border-[#0F766E]/60 bg-[#FAF8F5]/60 hover:bg-[#FAF8F5]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>

              <p className="text-xs font-semibold text-[#1E2329]">
                Click to upload multiple images or drag & drop files here
              </p>
              <p className="text-[11px] text-[#64748B] mt-1">
                Supports JPG, PNG, WEBP, and high-resolution clothing photos
              </p>

              <button
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E7E5E0] shadow-xs text-xs font-semibold text-[#1E2329] hover:border-[#0F766E] hover:text-[#0F766E]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Select Images from Computer</span>
              </button>
            </div>

            {/* Uploaded Images Gallery & Rearrangement Controls */}
            {images.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span>Image Order: The first photo is your <strong>Main Cover</strong>; the second is the <strong>Hover Preview</strong>.</span>
                  <button
                    type="button"
                    onClick={() => setImages([])}
                    className="text-rose-500 hover:text-rose-700 text-[11px] font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl border border-[#E7E5E0] overflow-hidden bg-white shadow-xs"
                    >
                      {/* Image Thumbnail */}
                      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
                        <img
                          src={imgSrc}
                          alt={`Uploaded preview ${idx + 1}`}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Cover / Position Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
                        {idx === 0 ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#0F766E] text-white shadow-xs flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-white" />
                            Cover
                          </span>
                        ) : idx === 1 ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#C87D55] text-white shadow-xs">
                            Hover
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#1E2329]/80 text-white backdrop-blur-xs">
                            #{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Overlay Controls for Rearrangement */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        {/* Top: Set as cover & Delete */}
                        <div className="flex items-center justify-between">
                          {idx !== 0 ? (
                            <button
                              type="button"
                              onClick={() => setAsCover(idx)}
                              className="p-1 rounded-lg bg-white/90 hover:bg-[#0F766E] hover:text-white text-[#1E2329] text-[10px] font-semibold flex items-center gap-1 px-1.5 transition-colors"
                              title="Make Cover Image"
                            >
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span>Set Cover</span>
                            </button>
                          ) : <div />}

                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="p-1.5 rounded-lg bg-white/90 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                            title="Remove Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Bottom: Reorder arrows */}
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveImage(idx, -1)}
                            className={`p-1.5 rounded-lg bg-white/90 text-[#1E2329] transition-all ${
                              idx === 0
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-[#0F766E] hover:text-white hover:scale-110 active:scale-95'
                            }`}
                            title="Move Left"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            disabled={idx === images.length - 1}
                            onClick={() => moveImage(idx, 1)}
                            className={`p-1.5 rounded-lg bg-white/90 text-[#1E2329] transition-all ${
                              idx === images.length - 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-[#0F766E] hover:text-white hover:scale-110 active:scale-95'
                            }`}
                            title="Move Right"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: CUSTOMIZABLE ATTRIBUTE TOGGLES */}
          <div className="space-y-4 pt-5 border-t border-[#E7E5E0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  3. Garment Attributes
                </h3>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Enable only what is relevant to this garment.
              </p>
            </div>

            {/* Toggle 1: Sizes */}
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
                    Product has Sizes (e.g. S, M, L, XL)
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Leave unchecked for unstitched fabric, stoles, shawls, or free-size items.
                  </span>
                </div>
              </label>

              {formData.hasSizes && (
                <div className="pt-2 border-t border-[#E7E5E0] space-y-2 animate-in fade-in">
                  <span className="text-[11px] font-semibold text-[#475569] block">
                    Select Available Sizes:
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

            {/* Toggle 2: Color Swatches */}
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
                    Product has Color Variations
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Enable if customers can choose between multiple color options.
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
                          className="w-8 h-8 rounded-lg border border-gray-300 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => handleColorChange(i, 'name', e.target.value)}
                          placeholder="Color name (e.g. Teal Blue, Terracotta, Olive)"
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E7E5E0]"
                        />
                        {formData.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(i)}
                            className="text-rose-500 hover:text-rose-700 p-1.5"
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

            {/* Toggle 3: Fabric Composition */}
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
                    Product has Fabric / Material Info
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Specify fabric type like Lawn, Cotton, Khaddar, Silk, Chiffon, Linen.
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
                    placeholder="e.g. 100% Pure Lawn with Hand Embroidered Organza Borders"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              )}
            </div>

            {/* Toggle 4: Piece Note / Styling advice */}
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
                    Custom Specifications / Package Notes
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    E.g. Piece count (2-Piece / 3-Piece), unstitched meterage, fit advice.
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
                    placeholder="e.g. Includes Embroidered Shirt + Trouser + Voile Dupatta (3-Piece)"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: DESCRIPTION & PRESENTATION */}
          <div className="space-y-4 pt-5 border-t border-[#E7E5E0]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E2329]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E2329]">
                4. Description & Curation
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Editorial Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the fabric feel, cut, stitching details, and styling recommendation..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="flex items-center gap-6 pt-1 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#0F766E] accent-[#0F766E]"
                />
                <span className="text-xs font-medium text-[#1E2329]">
                  Feature on Homepage Collection (First 4 Pieces)
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

        </form>

        {/* Sticky Action Footer — Always Visible */}
        <div className="border-t border-[#E7E5E0] px-6 py-4 bg-[#FAF8F5] flex items-center justify-end gap-3 shrink-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#1E2329] transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="shimmer-hover px-7 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D5C58] text-white text-xs font-semibold tracking-wider shadow-md shadow-[#0F766E]/20 transition-all hover:scale-102 active:scale-98"
          >
            {isEditing ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>

      </div>
    </div>
  );
}
