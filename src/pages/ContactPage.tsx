import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
              <p className="text-gray-600">+237 659143005</p>
              <p className="text-gray-600">+237 673425598</p>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <Mail className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2 text-blue-800">Email</h3>
              <p className="text-gray-600">Tchikayaline@gmail.com</p>
            </div>
            {/* Address */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <MapPin className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2 text-blue-800">Adresse</h3>
              <p className="text-gray-600">Nkolbisson, Yaoundé, Cameroun</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 container mx-auto px-4" >
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">
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
                <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">
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
              <label htmlFor="subject" className="block text-sm font-medium text-blue-800 mb-1">
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
              <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-1">
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

      {/* Map */}
      <div className="h-96 bg-blue-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11631.144751807782!2d11.44949199692273!3d3.871683484408375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bce8ae224a523%3A0x1cd708b6847b515b!2sNkolbisson%2C%20Yaound%C3%A9%2C%20Cameroun!5e1!3m2!1sfr!2sde!4v1733226919839!5m2!1sfr!2sde"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
