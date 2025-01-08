import ImageProcessor from "@/components/ImageProcessor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Compression & WebP Converter
          </h1>
          <p className="text-lg text-gray-600">
            Compress your images and convert them to WebP format in seconds
          </p>
        </div>
        
        <ImageProcessor />
      </div>
    </div>
  );
};

export default Index;