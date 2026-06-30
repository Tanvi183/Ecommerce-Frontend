"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/adminApi";
import { 
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Bar, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from "recharts";
import { 
  Briefcase, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Plus,
  X,
  Calendar as CalendarIcon,
  CheckSquare,
  DollarSign,
  Activity,
  FileText,
  Users,
  Search
} from "lucide-react";

// Mock Data matching the image exactly
const performanceData = [
  { name: "Jan", revenue: 10, target: 20 },
  { name: "Feb", revenue: 12, target: 25 },
  { name: "Mar", revenue: 15, target: 30 },
  { name: "Apr", revenue: 18, target: 35 },
  { name: "May", revenue: 25, target: 40 },
  { name: "Jun", revenue: 28, target: 45 },
  { name: "Jul", revenue: 32, target: 50 },
  { name: "Aug", revenue: 35, target: 55 },
  { name: "Sep", revenue: 38, target: 60 },
  { name: "Oct", revenue: 42, target: 65 },
  { name: "Nov", revenue: 45, target: 70 },
  { name: "Dec", revenue: 48, target: 75 },
];

const radialData = [
  { name: "Completed", value: 965, fill: "#186675" }, // Primary Teal
  { name: "In Progress", value: 75, fill: "#e11b22" }, // Brand Red
  { name: "Yet to Start", value: 102, fill: "#277b8c" }, // Lighter Teal
  { name: "Cancelled", value: 96, fill: "#f43f5e" }, // Standard Red
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    fetchStats();
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h1 className="text-[17px] font-bold text-gray-800">Projects</h1>
        <div className="text-[13px] text-gray-500 font-medium flex items-center gap-2">
          <span>Décor Culture</span> <ChevronRight size={12} />
          <span>Dashboard</span> <ChevronRight size={12} />
          <span className="text-gray-400">Projects</span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center border-t-2 border-transparent hover:border-[#186675] transition-colors">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Total Orders</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-[#f0f7f8] text-[#186675] flex items-center justify-center">
              <Briefcase size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats ? stats.totalOrders : '...'}</h3>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">
            <span className="text-[#e11b22]">v 9.19%</span> Since last month
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center border-t-2 border-transparent hover:border-[#277b8c] transition-colors">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Total Products</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-[#f3f9fa] text-[#277b8c] flex items-center justify-center">
              <CheckSquare size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats ? stats.totalProducts : '...'}</h3>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">
            <span className="text-[#2db742]">^ 26.87%</span> Since last month
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center border-t-2 border-transparent hover:border-[#e11b22] transition-colors">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Total Revenue</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-[#fce8e9] text-[#e11b22] flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">${stats ? stats.totalRevenue.toFixed(2) : '...'}</h3>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">
            <span className="text-[#2db742]">^ 3.51%</span> Since last month
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center border-t-2 border-transparent hover:border-[#2db742] transition-colors">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Customers</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-[#eaf8ec] text-[#2db742] flex items-center justify-center">
              <Users size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats ? stats.totalCustomers : '...'}</h3>
          </div>
          <p className="text-[12px] text-gray-400 font-medium">
            <span className="text-[#e11b22]">v 1.05%</span> Since last month
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center border-t-2 border-transparent hover:border-[#186675] transition-colors">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Low Stock Alerts</p>
          <div className="flex items-center gap-2 mb-4 text-[#186675]">
            <Activity size={20} />
            <h3 className="text-2xl font-bold text-gray-800">{stats ? stats.lowStockCount : '...'}</h3>
          </div>
          <button className="w-full bg-[#186675] hover:bg-[#13525e] text-white py-2 rounded text-[13px] font-bold transition-colors">
            Start Tracker
          </button>
        </div>
      </div>

      {/* Middle Charts & Calendar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Project Status Breakdown (Radial) */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-3 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[14px] font-bold text-gray-800">Project Status Breakdown</h2>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" cy="50%" 
                  innerRadius="30%" outerRadius="100%" 
                  barSize={10} 
                  data={radialData}
                  startAngle={90} endAngle={-270}
                >
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend to match image */}
            <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 mt-6 text-[12px] font-medium text-gray-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#186675]"></span> Completed</span>
                <span className="text-gray-400 font-bold">965</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#277b8c]"></span> Yet to Start</span>
                <span className="text-gray-400 font-bold">102</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#e11b22]"></span> In Progress</span>
                <span className="text-gray-400 font-bold">75</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f43f5e]"></span> Cancelled</span>
                <span className="text-gray-400 font-bold">96</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Performance Overview (Composed) */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-6 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[14px] font-bold text-gray-800">Projects Performance Overview</h2>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            {/* Top 4 Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8 border-b border-gray-100 pb-6 border-dashed">
              <div className="text-center border-r border-gray-100 last:border-0">
                <h3 className="text-xl font-bold text-gray-800">7,845</h3>
                <p className="text-[12px] text-gray-400 font-medium">Number of Projects</p>
              </div>
              <div className="text-center border-r border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">289</h3>
                <p className="text-[12px] text-gray-400 font-medium">Active Projects</p>
              </div>
              <div className="text-center border-r border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">$982.50k</h3>
                <p className="text-[12px] text-gray-400 font-medium">Revenue</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">-12,559h</h3>
                <p className="text-[12px] text-gray-400 font-medium">Working Hours</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  {/* Two bars simulating the grouped bars in image */}
                  <Bar dataKey="revenue" fill="#186675" barSize={12} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="target" fill="#b3d7dd" barSize={12} radius={[2, 2, 0, 0]} />
                  <Line type="monotone" dataKey="target" stroke="#e11b22" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Calendar & Schedule */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-400 hover:text-gray-800"><ChevronLeft size={16} /></button>
              <div className="flex gap-2">
                <select className="text-[13px] font-bold text-gray-700 bg-transparent border-none outline-none">
                  <option>June</option>
                </select>
                <select className="text-[13px] font-bold text-gray-700 bg-transparent border-none outline-none">
                  <option>2026</option>
                </select>
              </div>
              <button className="text-gray-400 hover:text-gray-800"><ChevronRight size={16} /></button>
            </div>
            
            <div className="grid grid-cols-7 text-center text-[12px] font-medium text-gray-400 mb-2">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 text-center text-[13px] font-medium text-gray-700 gap-y-3">
              <div className="text-gray-300">31</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
              <div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div>
              <div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div>
              <div>21</div><div>22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div>
              <div>28</div>
              <div className="w-7 h-7 bg-[#186675] text-white rounded-full flex items-center justify-center mx-auto shadow-md">29</div>
              <div>30</div><div>1</div><div>2</div><div>3</div><div>4</div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[14px] font-bold text-gray-800">Today's Schedule:</h2>
              <button className="text-[#186675] text-[12px] font-bold hover:underline">View All</button>
            </div>
            
            <div className="space-y-5 flex-1">
              {/* Event 1 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#186675] bg-[#f0f7f8] p-1.5 rounded"><Briefcase size={16} /></div>
                <div className="flex-1">
                  <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mb-0.5">
                    <Clock size={10} /> 08:00 AM - 09:30 AM
                  </p>
                  <p className="text-[13px] font-bold text-gray-800">Project Kickoff Meeting</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500"><X size={14} /></button>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#277b8c] bg-[#f3f9fa] p-1.5 rounded"><FileText size={16} /></div>
                <div className="flex-1">
                  <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mb-0.5">
                    <Clock size={10} /> 10:00 AM - 11:15 AM
                  </p>
                  <p className="text-[13px] font-bold text-gray-800">UI/UX Review Session</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500"><X size={14} /></button>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#e11b22] bg-[#fce8e9] p-1.5 rounded"><Users size={16} /></div>
                <div className="flex-1">
                  <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mb-0.5">
                    <Clock size={10} /> 04:00 PM - 05:30 PM
                  </p>
                  <p className="text-[13px] font-bold text-gray-800">Team Collaboration Session</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500"><X size={14} /></button>
              </div>
            </div>

            <button className="w-full mt-4 bg-[#186675] hover:bg-[#13525e] text-white py-2 rounded text-[13px] font-bold transition-colors flex items-center justify-center gap-1">
              <Plus size={16} /> Add New
            </button>
          </div>
        </div>
      </div>
      
      {/* Tables Row placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-white rounded-lg shadow-sm min-h-[300px] p-5 flex flex-col border-t-2 border-transparent hover:border-[#186675] transition-colors">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <h2 className="text-[14px] font-bold text-gray-800">Ongoing Projects</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search project..." className="pl-8 pr-3 py-1.5 text-[12px] border border-gray-200 rounded outline-none w-[150px] focus:border-[#186675]" />
              </div>
              <select className="border border-gray-200 rounded px-2 py-1.5 text-[12px] text-gray-600 outline-none focus:border-[#186675]">
                <option>5</option>
              </select>
            </div>
          </div>
          <p className="text-[12px] text-gray-400 text-center mt-auto mb-auto">Table data will appear here...</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm min-h-[300px] p-5 flex flex-col border-t-2 border-transparent hover:border-[#186675] transition-colors">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <h2 className="text-[14px] font-bold text-gray-800">Tasks</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search task..." className="pl-8 pr-3 py-1.5 text-[12px] border border-gray-200 rounded outline-none w-[150px] focus:border-[#186675]" />
              </div>
              <select className="border border-gray-200 rounded px-2 py-1.5 text-[12px] text-gray-600 outline-none focus:border-[#186675]">
                <option>5</option>
              </select>
            </div>
          </div>
          <p className="text-[12px] text-gray-400 text-center mt-auto mb-auto">Table data will appear here...</p>
        </div>
      </div>

    </div>
  );
}
