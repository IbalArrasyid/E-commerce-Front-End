'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Handshake, ClipboardList, Headset, BedDouble } from 'lucide-react';

// --- Data Definition ---
// Memisahkan data dari UI agar mudah dimaintain
const stepsData = [
  {
    id: 1,
    title: "Step 1 :",
    description: "Press the Whatsapp Button +62 858-1454-4429",
    icon: Phone, 
  },
  {
    id: 2,
    title: "Step 2 :",
    description: "Make an appointment to schedule a survey or consultation",
    icon: Handshake,
  },
  {
    id: 3,
    title: "Step 3 :",
    description: "Our sales team will bring fabric samples and take room measurements",
    icon: ClipboardList,
  },
  {
    id: 4,
    title: "Step 4 :",
    description: "We assist in designing to match the room's aesthetics",
    icon: Headset,
  },
  {
    id: 5,
    title: "Step 5 :",
    description: "The installation will be carried out on the agreed date",
    icon: BedDouble,
  },
];

// --- Animation Variants (Framer Motion) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay antar kartu
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 }, // Mulai dari bawah sedikit
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 50, damping: 20 } // Efek smooth spring
  },
};

const OrderingProcess = () => {
  // Membagi data menjadi dua kelompok sesuai layout: Baris 1 (3 item), Baris 2 (2 item)
  const firstRow = stepsData.slice(0, 3);
  const secondRow = stepsData.slice(3, 5);

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-light text-center text-gray-800 mb-12"
        >
          Online Ordering Process <span className="font-light">(Custom Curtains)</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Trigger animasi saat scroll mencapai elemen
          className="flex flex-col gap-8"
        >
          
          {/* Section 1: 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {firstRow.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>

          {/* Section 2: 2 Columns Grid (Centered width logic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/3 mx-auto w-full">
            {secondRow.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// --- Sub-Component: Single Card ---
// Diekstrak agar kode lebih bersih (DRY Principle)
const StepCard = ({ step }) => {
  const IconComponent = step.icon;

  return (
    <motion.article 
      variants={cardVariants}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-4 h-full"
    >
      {/* Icon Wrapper */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 flex items-center justify-center">
          {/* Warna Bronze/Gold disesuaikan dengan screenshot: text-[#C19A6B] */}
          <IconComponent strokeWidth={1.5} className="w-10 h-10 text-[#C19A6B]" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-800 mb-1">
          {step.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed font-light">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
};

export default OrderingProcess;