// components/Admin/EventForm.tsx
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../Types/event';
import { motion } from 'framer-motion';

export const EventForm = () => {
  const [eventData, setEventData] = useState<Event>({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    speaker: '',
    speakerBio: '',
    registrationLink: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addDoc(collection(db, 'events'), {
        ...eventData,
        createdAt: new Date()
      });
      setSuccess(true);
      setEventData({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '',
        speaker: '',
        speakerBio: '',
        registrationLink: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Webinar/Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={eventData.time}
              onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
            />
          </div>
        </div>

        {/* Add similar fields for duration, speaker, speakerBio, and registrationLink */}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {submitting ? 'Submitting...' : 'Add Event'}
        </button>

        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Event added successfully!
          </div>
        )}
      </form>
    </motion.div>
  );
};