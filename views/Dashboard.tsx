import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  onChangeView: (view: AppView) => void;
}

const data = [
  { name: 'Mon', posts: 4 },
  { name: 'Tue', posts: 3 },
  { name: 'Wed', posts: 7 },
  { name: 'Thu', posts: 5 },
  { name: 'Fri', posts: 8 },
  { name: 'Sat', posts: 12 },
  { name: 'Sun', posts: 9 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ElementType; color: string }> = ({ 
  title, value, trend, icon: Icon, color 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <span className="flex items-center text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
        <TrendingUp size={14} className="mr-1" />
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-heading font-bold text-midnightNavy">{value}</p>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-midnightNavy mb-2">Welcome back, Traveler!</h2>
          <p className="text-gray-500">Here's what's happening with your content today.</p>
        </div>
        <button 
          onClick={() => onChangeView(AppView.GENERATOR)}
          className="bg-travelBlue text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Create New Post <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Posts Generated" 
          value="1,248" 
          trend="+12%" 
          icon={TrendingUp}
          color="bg-travelBlue"
        />
        <StatCard 
          title="Scheduled Content" 
          value="34" 
          trend="+5%" 
          icon={CalendarIcon}
          color="bg-sunsetCoral"
        />
        <StatCard 
          title="Total Engagement" 
          value="84.2k" 
          trend="+28%" 
          icon={Users}
          color="bg-oceanTeal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-heading font-bold text-midnightNavy mb-6">Weekly Content Output</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="posts" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#FF6F61' : '#1A73E8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-heading font-bold text-midnightNavy mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-sandBeige flex items-center justify-center flex-shrink-0 text-orange-800 font-serif font-bold italic">
                  Ts
                </div>
                <div>
                  <p className="text-sm text-midnightNavy font-medium">Generated "Bali Sunset" Caption</p>
                  <p className="text-xs text-gray-400 mt-1">Instagram • 2 hours ago</p>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-travelBlue text-sm font-medium hover:underline mt-4">
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};