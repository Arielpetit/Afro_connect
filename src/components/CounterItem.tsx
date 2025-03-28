import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Handshake, BadgeCheck } from 'lucide-react';

interface CounterItemProps {
  end: number;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const CounterItem: React.FC<CounterItemProps> = ({ end, suffix = '', label, description, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, end]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
        })}
      </div>
      <h6 className="text-4xl font-bold text-deep-purple-accent-400">
        {count}{suffix}
      </h6>
      <p className="mb-2 font-bold text-md">{label}</p>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

export const Statistic = () => {
  const stats = [
    { 
      icon: <Trophy />,
      end: 127,
      label: 'Projets Complétés',
      description: 'Solutions immobilières réussies pour notre communauté'
    },
    { 
      icon: <Users />,
      end: 250,
      suffix: '+',
      label: 'Clients Satisfaits',
      description: 'Confiance accordée par nos clients à travers le Canada'
    },
    { 
      icon: <Handshake />,
      end: 45,
      suffix: '+',
      label: 'Partenaires',
      description: 'Professionnels qualifiés dans notre réseau d\'experts'
    },
    { 
      icon: <BadgeCheck />,
      end: 99,
      suffix: '%',
      label: 'Satisfaction',
      description: 'Taux de réussite dans les transactions immobilières'
    }
  ];

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <motion.div 
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {stats.map((stat, index) => (
          <CounterItem
            key={index}
            end={stat.end}
            suffix={stat.suffix}
            label={stat.label}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </motion.div>
    </div>
  );
};