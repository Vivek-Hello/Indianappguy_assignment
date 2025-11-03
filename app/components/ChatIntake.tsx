"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, 
  FaFlag, 
  FaDumbbell, 
  FaTransgender, 
  FaRulerVertical, 
  FaWeight, 
  FaUtensils, 
  FaMapMarkerAlt,
  FaChevronRight,
  FaStar,
  FaMagic
} from "react-icons/fa";
import type { Variants } from "framer-motion";

// FIELD CONFIG
type Field = {
  label: string;
  name: string;
  type: string;
  icon?: React.ReactNode;
};

const defaultFields: Field[] = [
  { label: "Name", name: "name", type: "text", icon: <FaUser /> },
  { label: "Age", name: "age", type: "number", icon: <FaFlag /> },
  { label: "Gender", name: "gender", type: "text", icon: <FaTransgender /> },
  { label: "Height (cm)", name: "height", type: "number", icon: <FaRulerVertical /> },
  { label: "Weight (kg)", name: "weight", type: "number", icon: <FaWeight /> },
  { label: "Goal", name: "goal", type: "text", icon: <FaDumbbell /> },
  { label: "Fitness Level", name: "level", type: "text" },
  { label: "Workout Location", name: "location", type: "text", icon: <FaMapMarkerAlt /> },
  { label: "Diet Type", name: "diet", type: "text", icon: <FaUtensils /> },
];

interface ChatIntakeProps {
  onComplete?: (data: Record<string, string>) => void;
}

// Use a Framer Motion cubic bezier for ease to avoid type errors!
const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE // use cubic bezier
    }
  }
};

const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
};

const loadingVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const ChatIntake: React.FC<ChatIntakeProps> = ({ onComplete }) => {
  const [userInfo, setUserInfo] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(userInfo);
    setTimeout(() => {
      if (onComplete) onComplete(userInfo);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 py-8">
      <motion.form
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="
          w-full max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg
          rounded-3xl shadow-2xl border border-blue-200 dark:border-gray-700
          flex flex-col gap-8 p-6 sm:p-8 md:p-10 lg:p-12
          transition-all duration-300
          hover:shadow-3xl
        "
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <motion.div 
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 dark:text-blue-400 flex justify-center items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 0] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FaDumbbell className="text-blue-500" />
            </motion.div>
            Let's Get Started!
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <FaMagic className="text-yellow-500 text-xl" />
            </motion.div>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Fill in your details below to generate your personalized fitness plan.
          </motion.p>
        </motion.div>

        {/* Grid Fields */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {defaultFields.map((field, index) => (
            <motion.label
              key={field.name}
              variants={itemVariants}
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
              className="
                flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700
                p-3 sm:p-4 rounded-2xl border border-blue-200 dark:border-gray-600 shadow-sm
                focus-within:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
                transition-all duration-300 group
              "
            >
              <motion.span 
                className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl group-hover:scale-110 transition-transform duration-200"
                whileHover={{ rotate: 5 }}
              >
                {field.icon || <FaUser />}
              </motion.span>
              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 truncate">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  value={userInfo[field.name] || ""}
                  onChange={handleChange}
                  className="
                    w-full rounded-lg border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700
                    text-sm sm:text-base
                    transition-all duration-200
                    px-3 py-2 outline-none
                  "
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            </motion.label>
          ))}
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          className="flex justify-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            type="submit"
            disabled={loading}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="
              relative overflow-hidden
              py-3 px-8 rounded-full text-lg font-semibold
              shadow-lg 
              bg-gradient-to-r from-blue-500 to-blue-700 text-white
              disabled:opacity-70
              flex items-center gap-3
              min-w-[200px] justify-center
              border-none outline-none
            "
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  ></motion.span>
                  Generating...
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center gap-2"
                >
                  Generate My Plan
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaChevronRight className="text-sm" />
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Button Shine Effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          💡 Your data stays private and is only used to generate your fitness plan.
        </motion.p>
      </motion.form>
    </div>
  );
};

export default ChatIntake;
