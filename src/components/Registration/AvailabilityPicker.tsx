import { useState } from "react";

const AvailabilityPicker = ({ formData, setFormData }) => {
  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const addAvailability = () => {
    if (!selectedDay || !fromTime || !toTime) return;

    const newEntry = `${selectedDay}: ${fromTime} - ${toTime}`;
    setAvailability([...availability, newEntry]);
    setFormData({ ...formData, availability: [...availability, newEntry] });
    setSelectedDay("");
    setFromTime("");
    setToTime("");
  };

  const removeAvailability = (index) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
    setFormData({ ...formData, availability: updatedAvailability });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Day Selection */}
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full md:w-auto border rounded-lg px-4 py-2"
        >
          <option value="">Choisir un jour</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        {/* Time Inputs Container */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* From Time */}
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* To Time */}
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={addAvailability}
          className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Ajouter
        </button>
      </div>

      {/* List of added availabilities */}
      <ul className="mt-4 space-y-2">
        {availability.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md text-sm md:text-base"
          >
            <span className="truncate mr-2">{entry}</span>
            <button
              onClick={() => removeAvailability(index)}
              className="text-red-500 hover:text-red-700 whitespace-nowrap px-2 py-1"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabilityPicker;