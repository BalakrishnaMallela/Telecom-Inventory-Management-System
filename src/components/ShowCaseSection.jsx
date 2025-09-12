import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  Router, 
  Database, 
  BarChart3, 
  Shield, 
  Wrench, 
  Zap,
  Globe,
  Smartphone,
  Wifi,
  Server,
  Eye,
  TrendingUp,
  MapPin,
  Bell
} from 'lucide-react';

// 3D Scene Component using pure Three.js
function ThreeJSScene() {
  const mountRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 0.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create Telecom Tower
    const createTower = (x, y, z) => {
      const group = new THREE.Group();
      
      // Tower base
      const baseGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1, 8);
      const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2563eb, 
        metalness: 0.8, 
        roughness: 0.2 
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      group.add(base);
      
      // Tower pole
      const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
      const poleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x64748b, 
        metalness: 0.9, 
        roughness: 0.1 
      });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.y = 1;
      group.add(pole);
      
      // Antennas
      [0.7, 1.3, 1.9].forEach((yPos) => {
        const antennaGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.05);
        const antennaMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x06b6d4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.2
        });
        const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna.position.y = yPos;
        group.add(antenna);
      });
      
      // Signal waves
      [0, 1, 2].forEach((i) => {
        const waveGeometry = new THREE.RingGeometry(0.8 + i * 0.3, 1 + i * 0.3, 16);
        const waveMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x06b6d4, 
          transparent: true, 
          opacity: 0.3 - i * 0.1,
          side: THREE.DoubleSide
        });
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.position.y = 1.5;
        wave.rotation.y = (i * Math.PI) / 3;
        group.add(wave);
      });
      
      group.position.set(x, y, z);
      return group;
    };

    // Create Router
    const createRouter = (x, y, z) => {
      const group = new THREE.Group();
      
      // Router body
      const bodyGeometry = new THREE.BoxGeometry(1, 0.3, 0.8);
      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e293b, 
        metalness: 0.6, 
        roughness: 0.4 
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      group.add(body);
      
      // LED indicators
      [-0.3, -0.1, 0.1, 0.3].forEach((xPos, i) => {
        const ledGeometry = new THREE.SphereGeometry(0.02);
        const ledMaterial = new THREE.MeshBasicMaterial({ 
          color: i % 2 === 0 ? 0x10b981 : 0x06b6d4,
          emissive: i % 2 === 0 ? 0x10b981 : 0x06b6d4,
          emissiveIntensity: 0.8
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(xPos, 0.16, 0.35);
        group.add(led);
      });
      
      // Ports
      [-0.3, -0.1, 0.1, 0.3].forEach((xPos) => {
        const portGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.02);
        const portMaterial = new THREE.MeshStandardMaterial({ color: 0x374151 });
        const port = new THREE.Mesh(portGeometry, portMaterial);
        port.position.set(xPos, -0.05, -0.41);
        group.add(port);
      });
      
      group.position.set(x, y, z);
      return group;
    };

    // Create Satellite
    const createSatellite = (x, y, z) => {
      const group = new THREE.Group();
      
      // Satellite body
      const bodyGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.4);
      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4f46e5, 
        metalness: 0.9, 
        roughness: 0.1 
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      group.add(body);
      
      // Solar panels
      const panelGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.02);
      const panelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e40af, 
        metalness: 0.3, 
        roughness: 0.7 
      });
      
      const panel1 = new THREE.Mesh(panelGeometry, panelMaterial);
      panel1.position.x = -0.8;
      group.add(panel1);
      
      const panel2 = new THREE.Mesh(panelGeometry, panelMaterial);
      panel2.position.x = 0.8;
      group.add(panel2);
      
      // Communication dish
      const dishGeometry = new THREE.ConeGeometry(0.2, 0.1, 16);
      const dishMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x06b6d4, 
        metalness: 0.8, 
        roughness: 0.2 
      });
      const dish = new THREE.Mesh(dishGeometry, dishMaterial);
      dish.position.y = 0.3;
      dish.rotation.x = Math.PI / 4;
      group.add(dish);
      
      group.position.set(x, y, z);
      return group;
    };

    // Add objects to scene
    const tower = createTower(-3, 0, 0);
    const router = createRouter(0, 0, 0);
    const satellite = createSatellite(3, 1, 0);
    
    scene.add(tower);
    scene.add(router);
    scene.add(satellite);

    // Camera position
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate objects
      tower.rotation.y = time * 0.2;
      tower.position.y = Math.sin(time) * 0.1;
      
      router.rotation.y = Math.PI / 4 + time * 0.1;
      
      satellite.rotation.x = Math.PI / 6 + time * 0.15;
      satellite.rotation.z = time * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Handle resize
    const handleResize = () => {
      if (currentMount && renderer) {
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

const features = [
  {
    id: 1,
    title: "Real-Time Asset Tracking",
    description: "Monitor all telecom equipment in real-time with GPS precision and instant status updates.",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500",
    stats: "99.9% Accuracy"
  },
  {
    id: 2,
    title: "Intelligent Inventory Management",
    description: "AI-powered inventory optimization with predictive maintenance and automated alerts.",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    stats: "40% Cost Reduction"
  },
  {
    id: 3,
    title: "Performance Analytics",
    description: "Advanced analytics dashboard with KPI tracking and performance optimization insights.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    stats: "Real-Time Insights"
  },
  {
    id: 4,
    title: "Network Infrastructure Monitoring",
    description: "Comprehensive monitoring of towers, routers, cables, and all network components.",
    icon: Globe,
    color: "from-orange-500 to-red-500",
    stats: "24/7 Monitoring"
  },
  {
    id: 5,
    title: "Compliance & Security",
    description: "Ensure regulatory compliance with automated reporting and security monitoring.",
    icon: Shield,
    color: "from-indigo-500 to-blue-500",
    stats: "100% Compliant"
  },
  {
    id: 6,
    title: "Automated Maintenance",
    description: "Predictive maintenance scheduling with automated workflows and technician dispatch.",
    icon: Wrench,
    color: "from-teal-500 to-cyan-500",
    stats: "50% Less Downtime"
  }
];

export default function Showcase() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.8, 0]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Hero Section with 3D Scene */}
      <motion.section 
        style={{ y, opacity }}
        className="relative h-screen flex items-center justify-center"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeJSScene />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">Next-Gen Telecom Management</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Telecom Inventory
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your telecommunications infrastructure with intelligent asset tracking, 
              real-time monitoring, and AI-powered analytics
            </p>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { label: "Equipment Tracked", value: "50,000+", icon: Router },
              { label: "Network Uptime", value: "99.99%", icon: Wifi },
              { label: "Cost Savings", value: "40%", icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300"
          >
            <Eye className="w-5 h-5" />
            Explore Features
          </motion.button>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Features Showcase */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Modern Telecom Management
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive tools designed to optimize your telecommunications infrastructure
            </p>
          </motion.div>
          </div>
          </section>

        
{/* Feature Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <AnimatePresence>
    {features.map((feature, index) => (
      <motion.div
        key={feature.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ 
          scale: 1.02, 
          y: -5,
          transition: { duration: 0.2 }
        }}
        viewport={{ once: true }}
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] hover:shadow-2xl transition-all duration-500`}
      >
        {/* Inner content */}
        <div className="relative h-full bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Feature Icon */}
          <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <feature.icon className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {feature.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-cyan-400">
              {feature.stats}
            </span>
            <motion.div
              whileHover={{ x: 5 }}
              className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300"
            >
              →
            </motion.div>
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</div>

{/* Interactive Demo Section */}
<section className="relative py-20 px-4 bg-gradient-to-r from-slate-800/50 to-gray-900/50 backdrop-blur-xl">
  <div className="max-w-6xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Experience the Future of
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Telecom Management
        </span>
      </h3>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Ready to transform your telecommunications infrastructure? 
        Get started with our comprehensive management system today.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row gap-4 justify-center items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300"
      >
        <Server className="w-5 h-5" />
        Start Free Trial
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300"
      >
        <Smartphone className="w-5 h-5" />
        Schedule Demo
      </motion.button>
    </motion.div>
  </div>
</section>
</div>
  )
}