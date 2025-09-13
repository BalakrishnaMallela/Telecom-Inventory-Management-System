import { motion } from "motion/react";
import { Star, Zap, Crown, TreePine } from "lucide-react";

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
      borderColor: "border-orange-500/60",
      glowColor: "shadow-orange-500/30",
      tiltClass: "-rotate-12",
      textTilt: "-rotate-12",
      isCenter: false,
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
      borderColor: "border-blue-500/60",
      glowColor: "shadow-blue-500/30",
      tiltClass: "rotate-0",
      textTilt: "rotate-0",
      isCenter: true,
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
      tiltClass: "rotate-0",
      textTilt: "rotate-0",
      isCenter: true,
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
      icon: TreePine,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      borderColor: "border-green-500/60",
      glowColor: "shadow-green-500/30",
      tiltClass: "rotate-12",
      textTilt: "rotate-12",
      isCenter: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      
      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-8 lg:gap-12 flex-wrap lg:flex-nowrap">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 100, rotateY: -20 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -15,
                scale: 1.02,
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
                relative w-80 h-[550px] p-8 rounded-3xl backdrop-blur-xl 
                bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-900/50
                border-2 ${plan.borderColor} 
                ${plan.glowColor} shadow-2xl
                transition-all duration-500 group-hover:shadow-3xl
                ${plan.popular ? 'ring-2 ring-yellow-500/40 shadow-yellow-500/30' : ''}
                overflow-hidden
              `}>
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-white/[0.08] to-transparent rounded-3xl" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />

                {/* Content */}
                <div className={`relative z-10 h-full flex flex-col ${plan.textTilt} transform-gpu`}>
                  {/* Icon */}
                  <div className={`
                    w-20 h-20 rounded-full ${plan.iconBg} 
                    flex items-center justify-center mb-8 mx-auto
                    backdrop-blur-sm border border-white/10
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <plan.icon size={32} className={plan.iconColor} strokeWidth={2} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-3xl font-bold text-white text-center mb-3 tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-center text-base mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-10">
                    <div className="text-5xl font-bold text-white mb-2 tracking-tight">
                      {plan.price}
                      <span className="text-xl text-slate-400 font-normal">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-6 mb-12 flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-base">Monthly Credits</span>
                      <span className="text-white font-bold text-xl">{plan.monthlyCredits}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-base">Cost per Credit</span>
                      <span className="text-white font-bold text-xl">{plan.costPerCredit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-base">Rollover Allowed</span>
                      <span className={`font-bold text-xl ${
                        plan.rolloverAllowed === 'YES' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {plan.rolloverAllowed}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-base">Rollover Expiry</span>
                      <span className="text-white font-bold text-xl">{plan.rolloverExpiry}</span>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      w-full py-5 px-8 rounded-full
                      bg-gradient-to-r from-orange-500 to-orange-600
                      hover:from-orange-400 hover:to-orange-500
                      text-white font-bold text-xl
                      transition-all duration-300
                      shadow-xl shadow-orange-500/30
                      hover:shadow-2xl hover:shadow-orange-500/50
                      backdrop-blur-sm border border-orange-400/30
                      mt-auto
                    "
                  >
                    Subscribe
                  </motion.button>
                </div>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-yellow-400/40">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      animate={{
                        x: [0, 120, 0],
                        y: [0, -120, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: `${15 + i * 25}%`,
                        top: `${85 - i * 15}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Corner Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${plan.glowColor} rounded-full blur-3xl opacity-20`} />
                <div className={`absolute -bottom-20 -left-20 w-40 h-40 ${plan.glowColor} rounded-full blur-3xl opacity-20`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Animated Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-blue-400/10 rounded-full"
            animate={{
              y: [0, -150],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-blue-900/5 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-teal-900/5 to-transparent" />
    </div>
  );
}


