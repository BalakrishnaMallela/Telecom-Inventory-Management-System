import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Router, Database, BarChart3, Shield, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    id: 1,
    question: "What is telecom inventory management?",
    answer: "Telecom inventory management is a comprehensive system for tracking, monitoring, and managing telecommunications equipment and assets. It provides real-time visibility into your infrastructure, including routers, switches, cables, towers, and other network components. This helps optimize resource allocation, reduce costs, and ensure network reliability.",
    icon: Router
  },
  {
    id: 2,
    question: "How do I track equipment lifecycle and maintenance schedules?",
    answer: "Our system automatically tracks equipment from procurement to decommissioning. You can set up automated alerts for maintenance schedules, warranty expirations, and end-of-life notifications. The platform maintains detailed history logs, service records, and performance metrics for each asset, enabling proactive maintenance and optimal equipment utilization.",
    icon: Wrench
  },
  {
    id: 3,
    question: "What types of telecom equipment can be managed in the system?",
    answer: "The platform supports all types of telecom infrastructure including network hardware (routers, switches, modems), transmission equipment (fiber optic cables, microwave links), power systems (batteries, generators, UPS), tower infrastructure, mobile base stations, and small cell equipment. Custom equipment categories can also be configured.",
    icon: Database
  },
  {
    id: 4,
    question: "How does real-time asset tracking and location management work?",
    answer: "Our system uses GPS coordinates, site mapping, and QR code scanning to provide precise location tracking. Assets can be organized by geographical regions, sites, buildings, or custom hierarchies. Real-time updates ensure you always know where equipment is located, its current status, and who is responsible for it.",
    icon: Shield
  },
  {
    id: 5,
    question: "Can I generate compliance reports and analytics on equipment performance?",
    answer: "Yes, the platform includes comprehensive reporting tools for regulatory compliance, performance analytics, and cost optimization. Generate automated reports for audits, track KPIs like uptime and utilization rates, analyze equipment ROI, and export data in multiple formats. Custom dashboards provide real-time insights into your telecom infrastructure health.",
    icon: BarChart3
  }
];

export function FqaSection() {
  const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
           
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
          >
            Telecom Inventory Management
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need to know about managing your telecommunications infrastructure
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openItems.has(faq.id);
            
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.04]">
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Question Header */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/[0.02] transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors duration-200">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                    </motion.div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-20">
                          <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4"></div>
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Need more help?</p>
              <p className="text-xs text-gray-400">Contact our support team for assistance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}