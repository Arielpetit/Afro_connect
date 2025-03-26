import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Jean Dupont',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    text: 'Travailler avec Afro Immobilier Connect a été une expérience incroyable. Ils m\'ont aidé à trouver la propriété parfaite avec facilité et professionnalisme.',
    rating: 5,
    location: 'Ottawa, Canada',
    orderCount: '3+ propriétés achetées'
  },
  {
    name: 'Marie Lemoine',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    text: 'J\'ai trouvé l\'appartement idéal dans mon quartier de rêve grâce à Afro Immobilier Connect. L\'équipe a veillé à ce que tout se passe sans accroc !',
    rating: 5,
    location: 'Toronto, Canada',
    orderCount: '1+ propriétés louées'
  },
  {
    name: 'David Lefevre',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    text: 'Le service client chez Afro Immobilier Connect était fantastique ! Ils m\'ont guidé tout au long du processus d\'achat et ont répondu à toutes mes questions.',
    rating: 5,
    location: 'Vancouver, Canada',
    orderCount: '2+ propriétés vendues'
  }
];

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 md:text-lg max-w-xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center gap-4 mb-8">
            <button 
              onClick={prevTestimonial}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full 
                shadow-lg hover:bg-white transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full 
                shadow-lg hover:bg-white transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white rounded-xl p-6 shadow-lg md:shadow-xl relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Testimonial Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="relative flex-shrink-0"
                >
                  <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-lg"></div>
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full object-cover 
                      border-4 border-white shadow-md"
                  />
                </motion.div>

                {/* Testimonial Content */}
                <div className="text-center md:text-left">
                  <Quote className="w-8 h-8 text-blue-500/20 mb-4 mx-auto md:mx-0" />
                  <p className="text-gray-700 mb-6 relative px-4 md:px-0">
                    {testimonials[currentTestimonial].text}
                  </p>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonials[currentTestimonial].location}
                      </p>
                      <div className="flex justify-center md:justify-start gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonials[currentTestimonial].rating 
                              ? 'fill-blue-500 text-blue-500' 
                              : 'fill-gray-200 text-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {testimonials[currentTestimonial].orderCount}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-200 w-3 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}