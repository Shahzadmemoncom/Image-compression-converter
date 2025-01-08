import imageCompression from 'browser-image-compression';

export async function compressImage(file: File, options: { quality: number, convertToWebP: boolean }) {
  const compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: options.convertToWebP ? 'image/webp' : 'auto',
    quality: options.quality,
  };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}

export function createObjectURL(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeObjectURL(url: string): void {
  URL.revokeObjectURL(url);
}