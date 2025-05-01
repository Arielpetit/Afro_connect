import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Handshake, BadgeCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CounterItemProps {
  end: number;
  suffix?: string;
  translationKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

const CounterItem: React.FC<CounterItemProps> = ({ end, suffix = '', translationKey, descriptionKey, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();

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
      <p className="mb-2 font-bold text-md">{t(`counter.${translationKey}`)}</p>
      <p className="text-gray-700">{t(`counter.${descriptionKey}`)}</p>
    </motion.div>
  );
};

export const Statistic = () => {
  const { t } = useTranslation();
  
  const stats = [
    { 
      icon: <Trophy />,
      end: 127,
      translationKey: 'completedProjects',
      descriptionKey: 'completedProjectsDesc'
    },
    { 
      icon: <Users />,
      end: 250,
      suffix: '+',
      translationKey: 'satisfiedClients',
      descriptionKey: 'satisfiedClientsDesc'
    },
    { 
      icon: <Handshake />,
      end: 45,
      suffix: '+',
      translationKey: 'partners',
      descriptionKey: 'partnersDesc'
    },
    { 
      icon: <BadgeCheck />,
      end: 99,
      suffix: '%',
      translationKey: 'satisfaction',
      descriptionKey: 'satisfactionDesc'
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
            translationKey={stat.translationKey}
            descriptionKey={stat.descriptionKey}
            icon={stat.icon}
          />
        ))}
      </motion.div>
    </div>
  );
};