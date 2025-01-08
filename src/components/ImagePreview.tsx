import React from 'react';

interface ImagePreviewProps {
  original: string;
  processed?: string;
  originalSize: number;
  processedSize?: number;
}

const ImagePreview = ({ original, processed, originalSize, processedSize }: ImagePreviewProps) => {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateReduction = () => {
    if (!processedSize) return 0;
    return ((originalSize - processedSize) / originalSize * 100).toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Original</h3>
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
          <img src={original} alt="Original" className="w-full h-full object-contain" />
        </div>
        <p className="text-sm text-gray-600">Size: {formatSize(originalSize)}</p>
      </div>
      
      {processed && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Processed</h3>
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img src={processed} alt="Processed" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm text-gray-600">
            Size: {formatSize(processedSize || 0)}
            <span className="ml-2 text-green-600">
              ({calculateReduction()}% reduction)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;