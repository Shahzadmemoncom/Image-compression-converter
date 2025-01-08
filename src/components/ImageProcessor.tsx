import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import DropZone from './DropZone';
import ImagePreview from './ImagePreview';
import { compressImage, createObjectURL, revokeObjectURL } from '@/lib/imageUtils';

const ImageProcessor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [processedPreview, setProcessedPreview] = useState<string>('');
  const [quality, setQuality] = useState<number>(80);
  const [convertToWebP, setConvertToWebP] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    const preview = createObjectURL(file);
    setOriginalPreview(preview);
    await processImage(file);
  };

  const processImage = async (file: File) => {
    try {
      setIsProcessing(true);
      const compressed = await compressImage(file, { quality: quality / 100, convertToWebP });
      
      if (processedPreview) {
        revokeObjectURL(processedPreview);
      }
      
      const newPreview = createObjectURL(compressed);
      setProcessedFile(compressed);
      setProcessedPreview(newPreview);
      
      toast({
        title: "Success!",
        description: "Image processed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedFile) return;
    
    const extension = convertToWebP ? 'webp' : processedFile.name.split('.').pop();
    const filename = `compressed_${processedFile.name.split('.')[0]}.${extension}`;
    
    const url = createObjectURL(processedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <DropZone onFileSelect={handleFileSelect} />
        
        {originalFile && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Quality: {quality}%</label>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={convertToWebP}
                  onCheckedChange={setConvertToWebP}
                  id="webp-mode"
                />
                <label htmlFor="webp-mode" className="text-sm font-medium">
                  Convert to WebP
                </label>
              </div>
              
              <Button
                onClick={() => processImage(originalFile)}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Image"}
              </Button>
            </div>

            <ImagePreview
              original={originalPreview}
              processed={processedPreview}
              originalSize={originalFile.size}
              processedSize={processedFile?.size}
            />

            {processedFile && (
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Processed Image
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageProcessor;