"use client";
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Clock, 
  FileText, 
  Users, 
  X, 
  Plus,
  Video
} from 'lucide-react';
import { getSchedules, createSchedule, deleteSchedule } from '@/lib/adminApi';
import { toast } from 'react-toastify';

interface Schedule {
  id: string;
  title: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function ScheduleWidget() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00'
  });

  const fetchSchedules = async () => {
    try {
      const res = await getSchedules();
      setSchedules(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'review': return <FileText size={16} />;
      case 'collaboration': return <Users size={16} />;
      case 'video': return <Video size={16} />;
      default: return <Briefcase size={16} />;
    }
  };

  const getIconWrapperClass = (type: string) => {
    switch(type) {
      case 'review': return "text-[#277b8c] bg-[#f3f9fa]";
      case 'collaboration': return "text-[#d14b4b] bg-[#fef1f1]";
      case 'video': return "text-[#5e4bd1] bg-[#f3f1fe]";
      default: return "text-[#186675] bg-[#f0f7f8]";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSchedule(id);
      toast.success("Schedule deleted");
      fetchSchedules();
    } catch (error) {
      toast.error("Failed to delete schedule");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSchedule(formData);
      toast.success("Schedule added");
      setIsModalOpen(false);
      fetchSchedules();
      setFormData({
        title: '',
        type: 'meeting',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00'
      });
    } catch (error) {
      toast.error("Failed to add schedule");
    }
  };

  // Sort logic: today on top, but we will ONLY show today's schedules in this widget
  const todayStr = new Date().toISOString().split('T')[0];
  
  const todaySchedules = schedules.filter(s => s.date.split('T')[0] === todayStr).sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 flex-1 flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[14px] font-bold text-gray-800 dark:text-gray-100">Today's Schedule:</h2>
        <a href="/admin/schedules" className="text-[#186675] text-[12px] font-bold hover:underline">View All</a>
      </div>
      
      <div className="space-y-5 flex-1 overflow-y-auto max-h-[300px] pr-2">
        {todaySchedules.length === 0 ? (
          <p className="text-[12px] text-gray-400 text-center">No schedule found for today.</p>
        ) : (
          todaySchedules.map((schedule) => {
            return (
              <div key={schedule.id} className="flex items-start gap-4">
                <div className={`mt-1 p-1.5 rounded ${getIconWrapperClass(schedule.type)}`}>
                  {getIcon(schedule.type)}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mb-0.5">
                    <Clock size={10} /> 
                    <span className="text-[#186675] font-bold mr-1">Today</span> 
                    {schedule.startTime} - {schedule.endTime}
                  </p>
                  <p className="text-[13px] font-bold text-gray-800 dark:text-gray-100">{schedule.title}</p>
                </div>
                <button 
                  onClick={() => handleDelete(schedule.id)}
                  className="text-gray-300 hover:text-red-500 dark:text-gray-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )
          })
        )}
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-4 bg-[#186675] dark:bg-gray-950 hover:bg-[#13525e] dark:bg-gray-800 text-white py-2 rounded text-[13px] font-bold transition-colors flex items-center justify-center gap-1"
      >
        <Plus size={16} /> Add New
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[16px] font-bold text-gray-800 dark:text-white">Add Schedule</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675]"
                  placeholder="e.g. Project Kickoff Meeting"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675]"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="review">Review</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="video">Video Call</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675]"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#186675] hover:bg-[#13525e] text-white py-2 rounded-lg text-[13px] font-bold transition-colors">
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
