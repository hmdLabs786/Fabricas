/**
 * Client-Side Image Compressor for Fabricas
 * Automatically resizes & compresses high-resolution camera photos (e.g. 5MB-12MB)
 * down to clean, optimized Web-ready JPEGs (~60KB-120KB).
 * Prevents localStorage QuotaExceededError and browser memory lag.
 */
export async function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      resolve(null);
    };

    reader.onload = (readerEvent) => {
      const dataUrl = readerEvent.target?.result;
      if (!dataUrl) {
        resolve(null);
        return;
      }

      const img = new Image();

      img.onerror = () => {
        // Fallback to original data URL if image decoding fails
        resolve(dataUrl);
      };

      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Scale down proportionally if larger than maximum dimensions
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Fill white background in case of transparent PNG converted to JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);

          // Export as optimized JPEG
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch (err) {
          console.warn('Image compression fallback to data URL:', err);
          resolve(dataUrl);
        }
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}
