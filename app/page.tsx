"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaUtensils, FaHeadphones, FaGithub, FaRocket } from "react-icons/fa";

export default function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex flex-col justify-between overflow-x-hidden">
      
      {/* Hero Section */}
      <motion.section 
        className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 min-h-[70vh]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-6xl sm:text-7xl mb-4"
          >
            💪
          </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 dark:text-white mb-4 sm:mb-6 leading-tight"
        >
          Transform Your{" "}
          <motion.span
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 100%"
            }}
          >
            Fitness Journey
          </motion.span>{" "}
          with AI
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-blue-800 dark:text-blue-200 max-w-2xl mb-6 sm:mb-8 leading-relaxed px-2"
        >
          Get your personalized workout and diet plan powered by{" "}
          <strong className="text-blue-700 dark:text-blue-300">Google Gemini</strong> — 
          customized just for your goals.
        </motion.p>

        <motion.div
          variants={itemVariants}
        >
          <motion.a 
            href="/chat"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="
              inline-flex items-center gap-3
              bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
              text-white font-bold text-lg sm:text-xl
              px-8 sm:px-10 py-4 sm:py-3
              rounded-full shadow-2xl
              transition-all duration-300
              relative overflow-hidden
            "
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaRocket className="text-xl" />
            </motion.span>
            Get My Plan
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-blue-600 dark:border-blue-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-16 sm:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-center text-blue-900 dark:text-white mb-12 sm:mb-16"
        >
          Why Choose AI Fitness?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <FaBolt />,
              title: "Instant AI Plan",
              description: "Get your complete fitness roadmap instantly — no trainer required!",
              color: "blue",
              delay: 0
            },
            {
              icon: <FaUtensils />,
              title: "Custom Diet Tips",
              description: "Smart meal plans tailored to your goal — from weight loss to muscle gain.",
              color: "green",
              delay: 0.2
            },
            {
              icon: <FaHeadphones />,
              title: "Audio Plans",
              description: "Listen to your plan anytime, anywhere — your coach on the go!",
              color: "purple",
              delay: 0.4
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              custom={index}
              className="
                group relative
                bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                shadow-xl rounded-3xl p-6 sm:p-8
                border border-white/20
                cursor-pointer
                overflow-hidden
              "
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              
              <div className="relative z-10">
                <motion.div 
                  className={`
                    text-5xl sm:text-6xl mb-4 sm:mb-6 mx-auto w-fit p-4 rounded-2xl
                    ${feature.color === 'blue' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : ''}
                    ${feature.color === 'green' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : ''}
                    ${feature.color === 'purple' ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''}
                  `}
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className={`
                  font-bold text-xl sm:text-2xl mb-3 text-center
                  ${feature.color === 'blue' ? 'text-blue-800 dark:text-blue-300' : ''}
                  ${feature.color === 'green' ? 'text-green-800 dark:text-green-300' : ''}
                  ${feature.color === 'purple' ? 'text-purple-800 dark:text-purple-300' : ''}
                `}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="p-6 text-center bg-blue-50/80 dark:bg-gray-900/40 backdrop-blur-sm text-blue-900 dark:text-blue-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.p 
            className="text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Made by <span className="font-semibold">Vivek R.</span> | Powered by{" "}
            <span className="font-semibold">Gemini AI</span> |{" "}
            <motion.a
              href="https://github.com/your-repo"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="inline" /> GitHub
            </motion.a>
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}