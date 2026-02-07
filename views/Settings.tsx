import React from 'react';
import { BrandSettings } from '../types';
import { Button } from '../components/ui/Button';

interface SettingsProps {
  settings: BrandSettings;
  onSave: (s: BrandSettings) => void;
}

export const SettingsView: React.FC<SettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = React.useState(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
         <h2 className="text-3xl font-heading font-bold text-midnightNavy mb-2">Brand Settings</h2>
         <p className="text-gray-500">Define your brand voice and preferences for the AI.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Tone of Voice</label>
          <select 
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0"
          >
             <option>Adventurous & Exciting</option>
             <option>Luxury & Sophisticated</option>
             <option>Relaxed & Chill</option>
             <option>Informative & Educational</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
          <input 
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="e.g. Solo female travelers, 25-35"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Destination Focus</label>
          <input 
            name="primaryDestination"
            value={formData.primaryDestination}
            onChange={handleChange}
            placeholder="e.g. Southeast Asia"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-travelBlue focus:ring-0"
          />
        </div>

        <div className="pt-4">
          <Button onClick={() => onSave(formData)}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};