import React, { useState } from 'react';
import { BrandSettings, SocialPlatform } from '../types';
import { generateSocialPost } from '../services/geminiService';
import { Button } from '../components/ui/Button';
import { Copy, Check, RefreshCw, Share2 } from 'lucide-react';

interface ContentGeneratorProps {
  settings: BrandSettings;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({ settings }) => {
  const [platform, setPlatform] = useState<SocialPlatform>(SocialPlatform.INSTAGRAM);
  const [destination, setDestination] = useState(settings.primaryDestination);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState(settings.tone);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!destination || !topic) return;
    setIsLoading(true);
    setCopied(false);
    
    const content = await generateSocialPost(
      platform,
      destination,
      topic,
      tone,
      settings.targetAudience
    );
    
    setGeneratedContent(content);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-heading font-bold text-midnightNavy mb-2">Content Generator</h2>
          <p className="text-gray-500">Craft the perfect travel post in seconds.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.values(SocialPlatform).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    platform === p 
                      ? 'bg-midnightNavy text-white ring-2 ring-offset-2 ring-midnightNavy' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Santorini, Greece"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0 transition-colors"
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What's the post about?</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. A hidden gem café with the best sunset view..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0 transition-colors min-h-[100px]"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone of Voice</label>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0 transition-colors appearance-none"
            >
              <option>Adventurous & Exciting</option>
              <option>Luxury & Sophisticated</option>
              <option>Relaxed & Chill</option>
              <option>Informative & Educational</option>
              <option>Inspirational & Dreamy</option>
            </select>
          </div>

          <Button 
            onClick={handleGenerate} 
            isLoading={isLoading} 
            className="w-full mt-4"
            disabled={!destination || !topic}
          >
            Generate Post
          </Button>
        </div>
      </div>

      {/* Output Section */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-heading font-bold text-midnightNavy">Preview</h3>
            <div className="flex gap-2">
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !generatedContent}
                className="p-2 text-gray-400 hover:text-travelBlue transition-colors rounded-lg hover:bg-blue-50"
                title="Regenerate"
              >
                <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gray-50 rounded-xl p-6 mb-6 font-sans text-gray-700 whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[500px] border border-gray-100">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                 <div className="w-12 h-12 border-4 border-travelBlue border-t-transparent rounded-full animate-spin"></div>
                 <p className="animate-pulse">Consulting the travel muses...</p>
              </div>
            ) : generatedContent ? (
              generatedContent
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                <span className="font-serif italic text-2xl text-gray-300">Your story starts here</span>
                <p className="text-sm">Fill in the details to generate magic.</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleCopy}
              disabled={!generatedContent}
            >
              {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </Button>
            <Button variant="secondary" className="flex-1" disabled={!generatedContent}>
              <Share2 size={18} className="mr-2" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};