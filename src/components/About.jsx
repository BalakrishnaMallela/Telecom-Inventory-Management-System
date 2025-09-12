import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Award, 
  Cpu, 
  Network, 
  Server, 
  Smartphone,
  Wifi,
  Radio,
  Satellite
} from 'lucide-react';
import * as THREE from 'three';

// --- 3D Background Component ---
const TelecomBackground3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#0f172a', 10, 50);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0f172a, 1);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight('#1e293b', 0.3);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight('#0ea5e9', 1, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight('#10b981', 0.8, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create floating telecom objects
    const objects = [];
    const objectTypes = [
      { geometry: new THREE.BoxGeometry(0.5, 2, 0.5), color: '#0ea5e9', count: 15 }, // Cell towers
      { geometry: new THREE.SphereGeometry(0.3, 8, 6), color: '#10b981', count: 20 }, // Satellites
      { geometry: new THREE.ConeGeometry(0.3, 1, 6), color: '#8b5cf6', count: 12 }, // Antennas
      { geometry: new THREE.CylinderGeometry(0.2, 0.2, 1.5), color: '#f59e0b', count: 18 }, // Fiber cables
      { geometry: new THREE.RingGeometry(0.3, 0.5, 8), color: '#06b6d4', count: 10 } // Network rings
    ];

    objectTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const material = new THREE.MeshPhongMaterial({ 
          color: type.color, 
          transparent: true, 
          opacity: 0.7,
          emissive: type.color,
          emissiveIntensity: 0.1
        });
        const mesh = new THREE.Mesh(type.geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.5) * 40;
        
        mesh.rotation.x = Math.random() * Math.PI * 2;
        mesh.rotation.y = Math.random() * Math.PI * 2;
        
        mesh.userData = {
          originalPosition: { ...mesh.position },
          rotationSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 },
          floatSpeed: Math.random() * 0.5 + 0.3,
          amplitude: Math.random() * 2 + 1
        };
        
        objects.push(mesh);
        scene.add(mesh);
      }
    });

    // Create connection lines between objects
    const lines = [];
    for (let i = 0; i < 25; i++) {
      const points = [];
      const obj1 = objects[Math.floor(Math.random() * objects.length)];
      const obj2 = objects[Math.floor(Math.random() * objects.length)];
      
      points.push(obj1.position);
      points.push(obj2.position);
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: '#1e40af', 
        transparent: true, 
        opacity: 0.3 
      });
      const line = new THREE.Line(geometry, material);
      lines.push(line);
      scene.add(line);
    }

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      objects.forEach(obj => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;
        
        obj.position.y = obj.userData.originalPosition.y + Math.sin(time * obj.userData.floatSpeed) * obj.userData.amplitude;
        obj.position.x = obj.userData.originalPosition.x + Math.cos(time * obj.userData.floatSpeed * 0.7) * (obj.userData.amplitude * 0.5);
      });
      
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

// --- Feature Card Component ---
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="bg-slate-800/60 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/40 transition-all duration-500 group"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotateY: 15 }}
        className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300"
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-cyan-200 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// --- Team Member Card ---
const TeamMemberCard = ({ name, role, image, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="bg-slate-800/60 backdrop-blur-sm border border-cyan-400/20 p-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 group"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-bold text-white text-center mb-2">{name}</h3>
      <p className="text-cyan-400 text-center mb-4 font-semibold">{role}</p>
      <p className="text-cyan-200 text-sm text-center leading-relaxed">{description}</p>
    </motion.div>
  );
};

// --- Stats Counter ---
const StatsCounter = ({ number, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const timer = setTimeout(() => {
      let current = 0;
      const increment = number / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          setHasAnimated(true);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 30);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [number, delay, hasAnimated]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onViewportEnter={() => !hasAnimated && setHasAnimated(true)}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-cyan-300 mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-cyan-200 font-semibold">{label}</div>
    </motion.div>
  );
};

// --- Main About Us Component ---
export default function AboutUs() {
  const features = [
    {
      icon: Network,
      title: "Advanced Network Management",
      description: "Comprehensive monitoring and management of telecom infrastructure with real-time analytics and predictive maintenance.",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security protocols ensuring your sensitive telecom data is protected with end-to-end encryption.",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Optimized for speed and efficiency, handling millions of inventory transactions with minimal latency.",
      delay: 0.3
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Worldwide network of data centers ensuring 99.9% uptime and seamless connectivity across continents.",
      delay: 0.4
    },
    {
      icon: Cpu,
      title: "AI-Powered Analytics",
      description: "Machine learning algorithms provide intelligent insights for optimal resource allocation and cost management.",
      delay: 0.5
    },
    {
      icon: Server,
      title: "Scalable Architecture",
      description: "Built on cloud-native technologies that scale automatically based on your growing business needs.",
      delay: 0.6
    }
  ];

  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "Chief Technology Officer",
      description: "15+ years in telecom infrastructure with expertise in 5G networks and IoT solutions.",
      delay: 0.1
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      description: "Former telecom engineer turned product visionary, leading innovation in inventory management.",
      delay: 0.2
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Engineering",
      description: "Cloud architecture expert specializing in scalable telecom solutions and microservices.",
      delay: 0.3
    },
    {
      name: "Emily Watson",
      role: "Customer Success Director",
      description: "Ensuring client satisfaction with deep understanding of telecom operational challenges.",
      delay: 0.4
    }
  ];

  const technologies = [
    { icon: Smartphone, name: "5G Networks", color: "#10b981" },
    { icon: Wifi, name: "WiFi 6/7", color: "#0ea5e9" },
    { icon: Satellite, name: "Satellite Comm", color: "#8b5cf6" },
    { icon: Radio, name: "Radio Frequency", color: "#f59e0b" },
    { icon: Network, name: "Fiber Optics", color: "#ef4444" },
    { icon: Server, name: "Edge Computing", color: "#06b6d4" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <TelecomBackground3D />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="inline-block px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium rounded-full mb-8">
                About Our Company
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Revolutionizing
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Telecom </span>
              Infrastructure
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              We're building the future of telecom inventory management with cutting-edge technology, 
              empowering companies worldwide to optimize their infrastructure and drive innovation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8"
            >
              <StatsCounter number={500} label="Global Clients" delay={0.2} />
              <StatsCounter number={50000} label="Managed Devices" delay={0.4} />
              <StatsCounter number={99} label="Uptime %" delay={0.6} />
              <StatsCounter number={24} label="Countries" delay={0.8} />
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-cyan-400/20 p-12 rounded-3xl shadow-2xl">
                <p className="text-xl text-cyan-100 leading-relaxed max-w-4xl mx-auto">
                  To transform how telecom companies manage their infrastructure through intelligent automation, 
                  real-time monitoring, and predictive analytics. We believe in creating solutions that not only 
                  solve today's challenges but anticipate tomorrow's needs in an ever-evolving digital landscape.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Us</h2>
              <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                Industry-leading features designed specifically for modern telecom infrastructure management
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Technologies We Support</h2>
              <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                Comprehensive support for all major telecom technologies and protocols
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotateX: 15 }}
                  className="bg-slate-800/60 backdrop-blur-sm border border-cyan-400/20 p-6 rounded-2xl text-center hover:shadow-2xl transition-all duration-300"
                  style={{ borderColor: tech.color + '40' }}
                >
                  <tech.icon className="w-12 h-12 mx-auto mb-4" style={{ color: tech.color }} />
                  <h3 className="text-white font-semibold">{tech.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
              <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                Industry experts with decades of combined experience in telecom and technology
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-3xl p-12 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Telecom Infrastructure?
              </h2>
              <p className="text-xl text-cyan-200 mb-8 leading-relaxed">
                Join leading telecom companies worldwide who trust our platform to manage their critical infrastructure.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a 
                  href="mailto:sales@telecom-ims.com"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-cyan-500/30"
                >
                  Get Started Today
                </a>
                <a 
                  href="/contact"
                  className="inline-block border-2 border-cyan-400 text-cyan-300 px-8 py-4 rounded-full font-semibold hover:bg-cyan-400/10 transition-all duration-200"
                >
                  Contact Sales
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}