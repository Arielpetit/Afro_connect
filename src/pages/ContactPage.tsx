import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Contact Information */}
      <div className="bg-blue-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-12 text-center animate__animated animate__fadeIn">
            Contactez-nous
          </h1>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Phone */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <Phone className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2 text-blue-800">Téléphone</h3>
              <p className="text-gray-600">+1(438) 870-2000</p>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <Mail className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2 text-blue-800">Email</h3>
              <p className="text-gray-600">support@afroimmobilierconnect.com</p>
            </div>
            {/* Address */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <MapPin className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2 text-blue-800">Adresse</h3>
              <p className="text-gray-600">Quebec, Canada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-blue-800 mb-1"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 bg-white bg-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-800 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 bg-white bg-opacity-50"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-blue-800 mb-1"
              >
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 bg-white bg-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-blue-800 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 bg-white bg-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors transform hover:scale-105"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
