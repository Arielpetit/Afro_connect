import { useState } from "react";

interface AvailabilityPickerProps {
  formData: {
    availability: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    availability: string[];
  }>>;
}

const AvailabilityPicker: React.FC<AvailabilityPickerProps> = ({ formData, setFormData }) => {
  const [availability, setAvailability] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");
  const [is24_7, setIs24_7] = useState(false);

  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const handle24_7Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIs24_7(checked);

    if (checked) {
      const newAvailability = daysOfWeek.map((day) => `${day}: 24h/24`);
      setAvailability(newAvailability);
      setFormData((prev) => ({ ...prev, availability: newAvailability }));
    } else {
      setAvailability([]);
      setFormData((prev) => ({ ...prev, availability: [] }));
    }
  };
  const addAvailability = () => {
    if (!selectedDay || !fromTime || !toTime) return;

    const newEntry = `${selectedDay}: ${fromTime} - ${toTime}`;
    const newAvailability = [...availability, newEntry];
    setAvailability(newAvailability);
    setFormData(prev => ({ ...prev, availability: newAvailability }));
    setSelectedDay("");
    setFromTime("");
    setToTime("");
  };

  const removeAvailability = (index: number) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
    setFormData(prev => ({ ...prev, availability: updatedAvailability }));
  };

  return (
    <div>
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={is24_7}
          onChange={handle24_7Change}
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm">Disponible 24h/24, 7j/7j</span>
      </label>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Day Selection */}
        <select
          value={selectedDay}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDay(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromTime(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* To Time */}
          <input
            type="time"
            value={toTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToTime(e.target.value)}
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