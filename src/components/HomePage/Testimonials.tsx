import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jean Dupont',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    text: 'Travailler avec Afro Immobilier Connect a été une expérience incroyable. Ils m\'ont aidé à trouver la propriété parfaite avec facilité et professionnalisme.',
    rating: 5,
    location: 'Douala, Cameroun',
    orderCount: '3+ propriétés achetées'
  },
  {
    name: 'Marie Lemoine',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    text: 'J\'ai trouvé l\'appartement idéal dans mon quartier de rêve grâce à Afro Immobilier Connect. L\'équipe a veillé à ce que tout se passe sans accroc !',
    rating: 5,
    location: 'Yaoundé, Cameroun',
    orderCount: '1+ propriétés louées'
  },
  {
    name: 'David Lefevre',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    text: 'Le service client chez Afro Immobilier Connect était fantastique ! Ils m\'ont guidé tout au long du processus d\'achat et ont répondu à toutes mes questions.',
    rating: 5,
    location: 'Buea, Cameroun',
    orderCount: '2+ propriétés vendues'
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Ce que disent nos clients</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Découvrez les témoignages de nos clients satisfaits qui ont trouvé leur maison idéale grâce à notre aide.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-blue-500/20 mb-4" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <div className="text-sm text-blue-500 font-medium">
                {testimonial.orderCount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
