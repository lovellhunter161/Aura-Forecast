import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Aura Forecast
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Khám phá những thông điệp từ vũ trụ, thấu hiểu bản thân và định hướng tương lai qua các lăng kính huyền học.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link 
                to={`/reading/${category.id}`}
                className="block h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-3">{category.name}</h3>
                <p className="text-white/50 leading-relaxed">{category.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
