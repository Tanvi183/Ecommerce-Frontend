"use client";
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Clock, 
  FileText, 
  Users, 
  X, 
  Video,
  ArrowLeft,
  Edit2,
  Plus
} from 'lucide-react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '@/lib/adminApi';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface Schedule {
  id: string;
  title: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function AllSchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
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
      toast.error("Failed to load schedules");
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
    if(!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await deleteSchedule(id);
      toast.success("Schedule deleted");
      fetchSchedules();
    } catch (error) {
      toast.error("Failed to delete schedule");
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      type: 'meeting',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setFormData({
      title: schedule.title,
      type: schedule.type,
      date: schedule.date.split('T')[0],
      startTime: schedule.startTime,
      endTime: schedule.endTime
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSchedule(editingId, formData);
        toast.success("Schedule updated");
      } else {
        await createSchedule(formData);
        toast.success("Schedule created");
      }
      setIsModalOpen(false);
      fetchSchedules();
    } catch (error) {
      toast.error(editingId ? "Failed to update schedule" : "Failed to create schedule");
    }
  };

  // Group schedules into Past, Today, and Future
  const todayStr = new Date().toISOString().split('T')[0];
  
  const pastSchedules = schedules.filter(s => s.date.split('T')[0] < todayStr);
  const todaySchedules = schedules.filter(s => s.date.split('T')[0] === todayStr);
  const futureSchedules = schedules.filter(s => s.date.split('T')[0] > todayStr);

  const ScheduleList = ({ items, title }: { items: Schedule[], title: string }) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-[16px] font-bold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2">{title} ({items.length})</h3>
        <div className="space-y-4">
          {items.map((schedule) => (
            <div key={schedule.id} className="flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className={`mt-1 p-2 rounded-lg ${getIconWrapperClass(schedule.type)}`}>
                {getIcon(schedule.type)}
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-gray-500 font-medium flex items-center gap-1 mb-1">
                  <Clock size={12} /> 
                  <span className="font-bold mr-2 text-gray-700 dark:text-gray-300">
                    {new Date(schedule.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {schedule.startTime} - {schedule.endTime}
                </p>
                <p className="text-[15px] font-bold text-gray-800 dark:text-gray-100">{schedule.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openEditModal(schedule)}
                  className="text-gray-300 hover:text-[#186675] dark:text-gray-500 transition-colors p-2"
                  title="Edit Schedule"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(schedule.id)}
                  className="text-gray-300 hover:text-red-500 dark:text-gray-500 transition-colors p-2"
                  title="Delete Schedule"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <ArrowLeft size={18} className="text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Schedules</h1>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#186675] hover:bg-[#13525e] text-white px-4 py-2 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Schedule
        </button>
      </div>

      <div className="max-w-4xl">
        <ScheduleList items={todaySchedules} title="Today's Schedule" />
        <ScheduleList items={futureSchedules} title="Upcoming Schedules" />
        <ScheduleList items={pastSchedules} title="Past Schedules" />

        {schedules.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No schedules found in the database.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[16px] font-bold text-gray-800 dark:text-white">
                {editingId ? 'Edit Schedule' : 'Add Schedule'}
              </h3>
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
                  className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675] text-gray-800 dark:text-gray-200"
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
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675] text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675] text-gray-800 dark:text-gray-200"
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
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675] text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    className="w-full text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-[#186675] text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#186675] hover:bg-[#13525e] text-white py-2 rounded-lg text-[13px] font-bold transition-colors">
                  {editingId ? 'Save Changes' : 'Create Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
