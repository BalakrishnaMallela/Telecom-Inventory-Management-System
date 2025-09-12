import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Crown, Star, Dumbbell } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Core",
      price: "$33.99",
      period: "month",
      description: "Perfect for getting started",
      monthlyCredits: "15",
      costPerCredit: "$1.00",
      rolloverAllowed: "NO",
      rolloverExpiry: "N/A",
      icon: Star,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/20",
      borderColor: "border-orange-500/50",
      glowColor: "shadow-orange-500/20",
      tiltClass: "-rotate-6",
    },
    {
      name: "Elite",
      price: "$44.99", 
      period: "month",
      description: "Best value for regular training",
      monthlyCredits: "40",
      costPerCredit: "$0.62",
      rolloverAllowed: "YES",
      rolloverExpiry: "30 Days",
      icon: Zap,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
      borderColor: "border-blue-500/50",
      glowColor: "shadow-blue-500/20",
      tiltClass: "-rotate-3",
    },
    {
      name: "Elite+",
      price: "$59.99",
      period: "month", 
      description: "For serious athletes",
      monthlyCredits: "150",
      costPerCredit: "$0.33",
      rolloverAllowed: "YES",
      rolloverExpiry: "60 Days",
      icon: Crown,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/20",
      borderColor: "border-yellow-500/60",
      glowColor: "shadow-yellow-500/30",
      tiltClass: "rotate-2",
      popular: true,
    },
    {
      name: "Max",
      price: "$109.99",
      period: "month",
      description: "Ultimate training freedom", 
      monthlyCredits: "400",
      costPerCredit: "$0.25",
      rolloverAllowed: "YES",
      rolloverExpiry: "90 Days",
      icon: Dumbbell,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      borderColor: "border-green-500/50",
      glowColor: "shadow-green-500/20",
      tiltClass: "rotate-6",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 py-12 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]" />
      
      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className={`group relative ${plan.tiltClass} transform-gpu`}
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Card Container */}
              <div className={`
                relative p-8 rounded-2xl backdrop-blur-xl 
                bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-900/60
                border ${plan.borderColor} 
                ${plan.glowColor} shadow-2xl
                transition-all duration-500 group-hover:shadow-2xl
                ${plan.popular ? 'ring-2 ring-yellow-500/30 shadow-yellow-500/20 shadow-2xl' : ''}
                overflow-hidden
              `}>
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent rounded-2xl" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-full ${plan.iconBg} 
                    flex items-center justify-center mb-6 mx-auto
                    backdrop-blur-sm border border-white/10
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <plan.icon size={28} className={plan.iconColor} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white text-center mb-2 font-inter">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-center text-sm mb-6 font-inter">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-white font-inter mb-1">
                      {plan.price}
                      <span className="text-lg text-slate-400 font-normal">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm font-inter">Monthly Credits</span>
                      <span className="text-white font-semibold font-inter">{plan.monthlyCredits}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm font-inter">Cost per Credit</span>
                      <span className="text-white font-semibold font-inter">{plan.costPerCredit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm font-inter">Rollover Allowed</span>
                      <span className={`font-semibold font-inter ${
                        plan.rolloverAllowed === 'YES' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {plan.rolloverAllowed}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm font-inter">Rollover Expiry</span>
                      <span className="text-white font-semibold font-inter">{plan.rolloverExpiry}</span>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      w-full py-4 px-6 rounded-full
                      bg-gradient-to-r from-orange-500 to-orange-600
                      hover:from-orange-400 hover:to-orange-500
                      text-white font-semibold text-lg
                      transition-all duration-300
                      shadow-lg shadow-orange-500/25
                      hover:shadow-xl hover:shadow-orange-500/40
                      backdrop-blur-sm border border-orange-400/30
                      font-inter
                    "
                  >
                    Subscribe
                  </motion.button>
                </div>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-yellow-400/30 font-inter">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${80 - i * 20}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}


