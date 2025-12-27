import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';
import { slotManager } from '../utils/slotManager';
import {
    Calendar,
    Clock,
    User,
    Video,
    Plus,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Search,
    Type
} from 'lucide-react';

const AdminSessions = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [selectedUser, setSelectedUser] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(30);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // UI/Flow State
    const [availableDates, setAvailableDates] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch users and initialized slot manager
    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            try {
                // Fetch users
                const { data, error } = await supabase
                    .from('user_dashboard')
                    .select('user_id, email, firstName, lastName');

                if (error) throw error;

                const formattedUsers = (data || []).map(u => ({
                    id: u.user_id,
                    email: u.email,
                    name: u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : u.email.split('@')[0]
                }));
                setUsers(formattedUsers);
                setFilteredUsers(formattedUsers);

                // Wait for slot manager
                await slotManager.initialized;

                // Fetch available dates for sessions
                const dates = await slotManager.getAvailableDates('session');
                setAvailableDates(dates);
            } catch (err) {
                console.error('Initialization error:', err);
                setError(`Failed to initialize session manager: ${err.message || 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };
        initialize();
    }, []);

    // Filter users based on search
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredUsers(users);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredUsers(users.filter(u =>
                u.email.toLowerCase().includes(lower) ||
                u.name.toLowerCase().includes(lower)
            ));
        }
    }, [searchTerm, users]);

    // Fetch slots when date changes
    useEffect(() => {
        if (!selectedDate) {
            setAvailableSlots([]);
            return;
        }

        const fetchSlots = async () => {
            setLoadingSlots(true);
            try {
                const slots = await slotManager.getAvailableSlotsForDate(selectedDate, 'session');
                setAvailableSlots(slots);
                // Clear selected time if it's no longer available
                if (selectedTime && !slots.includes(selectedTime)) {
                    setSelectedTime('');
                }
            } catch (err) {
                console.error('Error fetching slots:', err);
                setError('Could not load time slots.');
            } finally {
                setLoadingSlots(false);
            }
        };
        fetchSlots();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !title || !selectedDate || !selectedTime) {
            setError('Please complete all fields.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const user = users.find(u => u.id === selectedUser);
        const patientEmail = user.email;

        try {
            // 1. Double check availability
            const isFree = await slotManager.isTimeSlotCompletelyFree(selectedDate, selectedTime);
            if (!isFree) {
                throw new Error(`This slot is no longer available.`);
            }

            // 2. Create the session in Supabase
            const { data: sessionData, error: sessionError } = await supabase
                .from('sessions')
                .insert({
                    user_id: selectedUser,
                    title,
                    duration,
                    date: selectedDate,
                    time: selectedTime
                })
                .select()
                .single();

            if (sessionError) throw sessionError;

            // 3. Create Google Calendar event / Meet link
            const startDateTime = new Date(`${selectedDate}T${selectedTime}`).toISOString();
            const endDateTime = new Date(new Date(`${selectedDate}T${selectedTime}`).getTime() + duration * 60000).toISOString();

            const response = await fetch('/create-meeting', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientEmail, startDateTime, endDateTime }),
            });

            if (response.ok) {
                const { meetLink } = await response.json();

                // 4. Update with meet link
                await supabase
                    .from('sessions')
                    .update({ meet_link: meetLink })
                    .eq('id', sessionData.id);

                setSuccess(`Session scheduled successfully! Meet link: ${meetLink}`);
            } else {
                setSuccess('Session scheduled, but Meet link generation failed.');
            }

            // Reset Form (partially)
            setTitle('');
            setSelectedDate('');
            setSelectedTime('');

            // Refresh available dates/slots
            const updatedDates = await slotManager.getAvailableDates('session');
            setAvailableDates(updatedDates);

        } catch (err) {
            setError(err.message || 'Failed to schedule session.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Premium Header */}
            <div className="mb-8 p-8 rounded-3xl text-white bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-12 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -m-12 w-48 h-48 bg-purple-400 opacity-20 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Manage Sessions</h1>
                        <p className="text-blue-100 text-lg opacity-90 max-w-md">
                            Schedule new video sessions and link them with patient records.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <Video className="w-6 h-6" />
                        </div>
                        <div className="pr-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">System Ready</p>
                            <p className="font-semibold text-white">Google Meet Integration</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <User className="w-5 h-5 mr-2 text-blue-600" />
                            1. Select Patient
                        </h2>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <button
                                        key={user.id}
                                        onClick={() => setSelectedUser(user.id)}
                                        className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center ${selectedUser === user.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-transparent hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${selectedUser === user.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="truncate">
                                            <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        {selectedUser === user.id && (
                                            <CheckCircle2 className="w-5 h-5 ml-auto text-blue-600" />
                                        )}
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4 italic">No patients found</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Type className="w-5 h-5 mr-2 text-purple-600" />
                            2. Session Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Session Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Weekly Follow-up"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[15, 30, 45, 60].map(m => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setDuration(m)}
                                            className={`py-2 px-3 rounded-lg text-sm font-bold border-2 transition-all ${duration === m
                                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                                : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-purple-200'
                                                }`}
                                        >
                                            {m}m
                                        </button>
                                    ))}
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                                            className="w-full h-full py-2 px-3 text-sm bg-gray-50 border-2 border-gray-100 rounded-lg outline-none focus:border-purple-300"
                                            placeholder="Custom"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Date & Time Selection */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                                3. Select Date
                            </h2>
                            <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full uppercase tracking-wider">
                                {availableDates.length} Days Available
                            </span>
                        </div>

                        <div className="relative">
                            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x select-none">
                                {availableDates.map((date) => {
                                    const dateObj = new Date(date);
                                    const isSelected = selectedDate === date;

                                    return (
                                        <button
                                            key={date}
                                            type="button"
                                            onClick={() => setSelectedDate(date)}
                                            className={`flex-shrink-0 w-24 h-32 rounded-2xl border-2 transition-all duration-300 snap-start flex flex-col items-center justify-center space-y-1 ${isSelected
                                                ? 'border-blue-600 bg-blue-600 text-white shadow-xl scale-105'
                                                : 'border-gray-100 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                                                }`}
                                        >
                                            <span className={`text-xs font-bold uppercase tracking-widest ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-3xl font-black">
                                                {dateObj.getDate()}
                                            </span>
                                            <span className={`text-xs font-bold ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                        </button>
                                    );
                                })}
                                {availableDates.length === 0 && !loading && (
                                    <div className="w-full py-8 text-center text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                        No available session dates found in Slot Manager.
                                    </div>
                                )}
                            </div>
                            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-orange-500" />
                            4. Select Time
                        </h2>

                        {loadingSlots ? (
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="animate-pulse bg-gray-100 h-14 rounded-2xl"></div>
                                ))}
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {availableSlots.map((time) => {
                                    const isSelected = selectedTime === time;
                                    return (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-4 px-2 rounded-2xl text-sm font-bold border-2 transition-all duration-200 text-center ${isSelected
                                                ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md ring-2 ring-orange-100 scale-105'
                                                : 'border-gray-50 bg-gray-50 text-gray-600 hover:border-orange-200 hover:bg-orange-50'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : selectedDate ? (
                            <div className="p-12 text-center rounded-3xl border-2 border-dashed border-red-200 bg-red-50">
                                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                <p className="text-red-900 font-bold text-lg">No slots available</p>
                                <p className="text-red-600 mt-1">All sessions for this date are fully booked.</p>
                            </div>
                        ) : (
                            <div className="p-12 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 font-bold">Waiting for date Selection</p>
                                <p className="text-gray-400 text-sm mt-1">Available time slots will appear here after you pick a date.</p>
                            </div>
                        )}
                    </div>

                    {/* Feedback & Submit */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center space-x-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="font-semibold text-sm">{error}</p>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800"
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                    <p className="font-bold">{success.split('!')[0]}!</p>
                                </div>
                                {success.includes('Meet link:') && (
                                    <div className="ml-8 mt-2">
                                        <a href={success.split('link: ')[1]} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors">
                                            Open Meeting Link <ChevronRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={handleSubmit}
                        disabled={loading || !selectedUser || !title || !selectedDate || !selectedTime}
                        className={`w-full py-5 rounded-3xl font-black text-xl shadow-2xl transition-all flex items-center justify-center space-x-3 ${loading || !selectedUser || !title || !selectedDate || !selectedTime
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02] active:scale-95 hover:shadow-blue-500/25'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Scheduling...</span>
                            </div>
                        ) : (
                            <>
                                <Plus className="w-6 h-6" />
                                <span>Schedule Session Now</span>
                            </>
                        )}
                    </button>

                    <p className="text-center text-gray-400 text-xs font-medium">
                        Patient will receive an email confirmation with the Google Meet link automatically.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSessions;