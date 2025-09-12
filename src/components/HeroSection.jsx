import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rss, Server, RefreshCw, PieChart, Cable, Router, Wrench, BarChart3, Network, GitBranch, ArrowDownToLine } from 'lucide-react';

const layersData = [
    {
        id: 0,
        title: 'Data Ingestion & Network Sync',
        description: 'Automated polling and real-time synchronization with all network elements, ensuring the inventory is always up-to-date with the live network state.',
        icon: Rss,
        color: 'border-sky-500',
        textColor: 'text-sky-400',
        content: (
            <div className="flex items-center justify-around w-full h-full p-4">
                <ArrowDownToLine className="w-12 h-12 text-sky-300 opacity-70" />
                <GitBranch className="w-14 h-14 text-sky-400" />
                <Rss className="w-12 h-12 text-sky-300 opacity-70" />
            </div>
        )
    },
    {
        id: 1,
        title: 'Physical & Logical Inventory',
        description: 'A unified model of all physical assets (towers, servers, fibers) and their logical connections, creating a single source of truth.',
        icon: Server,
        color: 'border-teal-500',
        textColor: 'text-teal-400',
        content: (
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center w-full h-full p-4">
                <Server className="w-12 h-12 text-teal-300" />
                <div className="w-full h-px bg-slate-600" />
                <Cable className="w-12 h-12 text-teal-400" />
                <div />
                <Router className="w-12 h-12 text-teal-300" />
                <div />
            </div>
        )
    },
    {
        id: 2,
        title: 'Lifecycle & Workflow Automation',
        description: 'Manage the entire asset lifecycle, from deployment and automated maintenance workflows to planned retirement and replacement.',
        icon: RefreshCw,
        color: 'border-amber-500',
        textColor: 'text-amber-400',
        content: (
            <div className="flex items-center justify-around w-full h-full p-4">
                <motion.div 
                    className="w-14 h-14 border-4 border-dashed border-amber-500 rounded-full" 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <Wrench className="w-12 h-12 text-amber-400" />
                <RefreshCw className="w-10 h-10 text-amber-300 opacity-70" />
            </div>
        )
    },
    {
        id: 3,
        title: 'Reporting & API Gateway',
        description: 'Gain powerful insights through customizable dashboards and integrate seamlessly with external systems via a secure API gateway.',
        icon: PieChart,
        color: 'border-indigo-500',
        textColor: 'text-indigo-400',
        content: (
             <div className="flex items-center justify-around w-full h-full p-4">
                <PieChart className="w-12 h-12 text-indigo-300" />
                <Network className="w-14 h-14 text-indigo-400" />
                <BarChart3 className="w-12 h-12 text-indigo-300" />
            </div>
        )
    }
];

export function HeroSection() {
    const [activeLayer, setActiveLayer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLayer((prev) => (prev + 1) % layersData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const activeLayerData = layersData[activeLayer];

    return (
      
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-[#0D1117]">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-30" />
             <h1 className="mt-2 text-4xl font-bold text-slate-100 md:text-5xls">How It Works</h1>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-12 mx-auto md:grid-cols-2 md:gap-20">
                {/* Left Side: Text Descriptions */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLayer}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={`font-semibold tracking-wider uppercase ${activeLayerData.textColor}`}>
                                Layer {activeLayer + 1}
                            </span>
                            <h2 className="mt-2 text-4xl font-bold text-slate-100 md:text-5xl">
                                {activeLayerData.title}
                            </h2>
                            <p className="mt-4 text-lg text-slate-400">
                                {activeLayerData.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: 3D Stack */}
                <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: '1500px' }}>
                    <motion.div 
                        className="relative w-full h-full"
                        style={{ transformStyle: 'preserve-3d' }}
                        initial={{ rotateX: 60, scale: 0.9 }}
                        animate={{ rotateX: 55, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    >
                        {layersData.map((layer, index) => {
                            const isActive = activeLayer === index;

                            return (
                                <motion.div
                                    key={layer.id}
                                    className={`absolute w-[450px] h-[300px] left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl shadow-2xl shadow-indigo-900/20 ${isActive ? layer.color : 'border-slate-700'}`}
                                    animate={{
                                        transform: isActive
                                            ? `translateZ(${index * 40 + 60}px) scale(1.05)`
                                            : `translateZ(${index * 40}px) scale(1)`,
                                        opacity: isActive ? 1 : 0.4,
                                        boxShadow: isActive ? `0 0 80px -10px ${layer.color.replace('border', 'bg').replace('-500', '-900/50')}` : '0 25px 50px -12px rgba(0,0,0,0.5)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                >
                                    {layer.content}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}