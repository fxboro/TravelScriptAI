import React, { useState, useRef } from 'react';
import { generateImageCaption } from '../services/geminiService';
import { Button } from '../components/ui/Button';
import { UploadCloud, Image as ImageIcon, X, Sparkles } from 'lucide-react';

export const ImageCaptioner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      setImage(base64Data);
      setMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateCaption = async () => {
    if (!image) return;
    setLoading(true);
    const result = await generateImageCaption(image, mimeType, "Inspirational & Travel-focused");
    setCaption(result);
    setLoading(false);
  };

  const clearImage = () => {
    setImage(null);
    setCaption('');
    setMimeType('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-midnightNavy mb-2">AI Image Captioner</h2>
        <p className="text-gray-500">Upload a photo and let our vision AI write the story.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-4">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-travelBlue hover:bg-blue-50 transition-all h-96 group"
            >
              <div className="w-16 h-16 bg-blue-100 text-travelBlue rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Click to upload</h3>
              <p className="text-sm text-gray-500 mt-2">SVG, PNG, JPG or GIF (max. 5MB)</p>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden shadow-lg h-96 bg-black">
              <img 
                src={`data:${mimeType};base64,${image}`} 
                alt="Uploaded preview" 
                className="w-full h-full object-contain"
              />
              <button 
                onClick={clearImage}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <Button 
            onClick={handleGenerateCaption} 
            disabled={!image} 
            isLoading={loading}
            className="w-full"
          >
            <Sparkles size={18} className="mr-2" />
            Generate Caption
          </Button>
        </div>

        {/* Result Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-96 md:h-auto">
          <h3 className="text-lg font-heading font-bold text-midnightNavy mb-4 flex items-center gap-2">
            <ImageIcon size={20} className="text-sunsetCoral" />
            Generated Caption
          </h3>
          
          <div className="flex-1 bg-sandBeige/30 rounded-lg p-6 overflow-y-auto">
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ) : caption ? (
              <p className="text-midnightNavy font-medium leading-relaxed whitespace-pre-wrap">{caption}</p>
            ) : (
              <p className="text-gray-400 italic">Upload an image to see the magic happen...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};