"use client";

import { useEffect, useRef, useState } from "react";
import Preloader from './Preloader';
import Footer from './Footer';

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  CylinderGeometry,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight,
  AmbientLight,
  SphereGeometry,
  LineBasicMaterial,
  BufferGeometry,
  Line,
} from "three";
import {
  Wifi,
  Server,
  Smartphone,
  Router,
  Database,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Globe,
  Signal,
  LogOut,
  Bell,
  X,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";
import { HeroSection } from "./HeroSection";
import { FqaSection } from "./Fqa";
import ShowCase from "./ShowCaseSection";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'low-stock',
      title: 'Low Stock Alert',
      message: 'Router Model R2000 - Only 5 units remaining',
      timestamp: '2 minutes ago',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-yellow-400',
    },
    {
      id: 2,
      type: 'high-stock',
      title: 'High Stock Alert',
      message: 'WiFi Access Points - 150 units in stock',
      timestamp: '5 minutes ago',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-green-400',
    },
    {
      id: 3,
      type: 'supplier',
      title: 'Supplier Update',
      message: 'New shipment from TechCorp arriving tomorrow',
      timestamp: '10 minutes ago',
      icon: <Users className="w-4 h-4" />,
      color: 'text-blue-400',
    },
    {
      id: 4,
      type: 'stock',
      title: 'Inventory Update',
      message: 'Network Switches restocked - 50 new units added',
      timestamp: '15 minutes ago',
      icon: <Package className="w-4 h-4" />,
      color: 'text-purple-400',
    },
  ]);

  const heroRef = useRef();
  const featuresRef = useRef();
  const statsRef = useRef();

  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, threshold: 0.2 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.3 });

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.isLoggedIn) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // New handleLearnMore function using navigate
  const handleLearnMore = (title) => {
    // Create a URL-friendly slug from the title
    const slug = title.toLowerCase().replace(/ /g, '-');
    navigate(`/${slug}`);
  };

  // NEW: handleNavigation function for the new menu items
  const handleNavigation = (path) => {
    navigate(path);
    setShowNotifications(false); // Close notifications panel on navigation
  };

  // Handle notification click
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  // Close notifications when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.notification-panel')) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showNotifications]);

  // Three.js Scene
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    sceneRef.current = scene;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create telecom tower
    const towerGeometry = new CylinderGeometry(0.1, 0.3, 4, 8);
    const towerMaterial = new MeshPhongMaterial({ color: 0x4a90e2 });
    const tower = new Mesh(towerGeometry, towerMaterial);
    tower.position.y = 2;
    scene.add(tower);

    // Create antenna parts
    const antennaGeometry = new CylinderGeometry(0.05, 0.05, 1, 6);
    const antennaMaterial = new MeshPhongMaterial({ color: 0xff6b6b });

    for (let i = 0; i < 3; i++) {
      const antenna = new Mesh(antennaGeometry, antennaMaterial);
      antenna.position.y = 4 + i * 0.3;
      antenna.rotation.z = (i * Math.PI) / 6;
      scene.add(antenna);
    }

    // Create floating network nodes
    const nodes = [];
    const nodeGeometry = new SphereGeometry(0.2, 16, 16);
    const nodeMaterials = [
      new MeshPhongMaterial({ color: 0x50fa7b }),
      new MeshPhongMaterial({ color: 0xff79c6 }),
      new MeshPhongMaterial({ color: 0x8be9fd }),
      new MeshPhongMaterial({ color: 0xf1fa8c }),
    ];

    for (let i = 0; i < 8; i++) {
      const node = new Mesh(
        nodeGeometry,
        nodeMaterials[i % nodeMaterials.length],
      );
      node.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 8,
        (Math.random() - 0.5) * 10,
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connecting lines
    const lines = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const points = [nodes[i].position, nodes[i + 1].position];
      const geometry = new BufferGeometry().setFromPoints(points);
      const material = new LineBasicMaterial({
        color: 0x6272a4,
        opacity: 0.6,
        transparent: true,
      });
      const line = new Line(geometry, material);
      lines.push(line);
      scene.add(line);
    }

    camera.position.z = 8;
    camera.position.y = 3;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate tower
      tower.rotation.y += 0.005;

      // Animate nodes
      nodes.forEach((node, index) => {
        node.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
      });

      // Update lines
      lines.forEach((line, index) => {
        if (index < nodes.length - 1) {
          const points = [nodes[index].position, nodes[index + 1].position];
          line.geometry.setFromPoints(points);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      towerGeometry.dispose();
      towerMaterial.dispose();
      antennaGeometry.dispose();
      antennaMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterials.forEach(mat => mat.dispose());
    };
  }, []);

  const features = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Real-time Inventory",
      description: "Track all telecom equipment in real-time with automated updates and alerts",
      content: "Our real-time inventory system provides a live, 360-degree view of your entire network. Automated updates ensure that you always have accurate data, enabling faster decision-making and preventing costly errors.",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Network Monitoring",
      description: "Monitor network performance and equipment status across all locations",
      content: "Monitor the health and performance of your network with our advanced monitoring tools. Identify bottlenecks, predict failures, and ensure optimal service delivery with a comprehensive dashboard that provides actionable insights.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Get insights with advanced analytics and predictive maintenance",
      content: "Leverage the power of AI to analyze vast amounts of data and gain predictive insights. Our analytics dashboard helps you forecast future needs, optimize resource allocation, and implement a proactive maintenance strategy.",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance tracking and reporting",
      content: "Our platform is built with enterprise-grade security to protect your sensitive data. With automated compliance tracking and detailed reporting, you can easily meet regulatory requirements and maintain a secure network environment.",
      color: "from-orange-400 to-red-400",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "10K+", label: "Devices Managed" },
    { value: "500+", label: "Clients Worldwide" },
    { value: "24/7", label: "Support" },
  ];

  const inventoryItems = [
    { icon: <Router className="w-6 h-6" />, name: "Routers" },
    { icon: <Server className="w-6 h-6" />, name: "Servers" },
    { icon: <Smartphone className="w-6 h-6" />, name: "Mobile Devices" },
    { icon: <Signal className="w-6 h-6" />, name: "Antennas" },
    { icon: <Wifi className="w-6 h-6" />, name: "WiFi Access Points" },
    { icon: <Globe className="w-6 h-6" />, name: "Network Switches" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ background: "transparent" }}
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-10">
        <motion.div className="absolute inset-0" style={{ y, opacity }}>
          <div
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(79, 172, 254, 0.2) 0%, transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(139, 233, 253, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 40% 40%, rgba(80, 250, 123, 0.1) 0%, transparent 60%),
                linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(17,24,39,0.8) 100%)
              `,
            }}
          />
        </motion.div>
      </div>

      {/* Floating Inventory Items */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        {inventoryItems.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/20"
            initial={{ x: -100, y: Math.random() * window.innerHeight }}
            animate={{
              x: window.innerWidth + 100,
              y: Math.random() * window.innerHeight,
              rotate: 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: Math.random() * window.innerHeight,
              fontSize: Math.random() * 20 + 30,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-30">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-0 w-full p-6 z-50"
        >
          <div
            className="max-w-7xl mx-auto backdrop-blur-3xl bg-black/20 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl"
            style={{
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%),
                rgba(0,0,0,0.2)
              `,
              backdropFilter: "blur(20px)",
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.4), 
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
            }}
          >
            <div className="flex justify-between items-center">
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/')}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Signal className="w-6 h-6 text-white font-bold" />
                </div>
                <span className="text-xl font-bold text-white">TelecomIMS</span>
              </motion.div>

              <div className="hidden md:flex space-x-8">
                {/* Home link */}
                <motion.div
                  key="Home"
                  onClick={() => navigate('/')}
                  className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.div>
                {/* NEW: Products link */}
                <motion.div
                  key="Products"
                  onClick={() => handleNavigation('/products')}
                  className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Products
                </motion.div>
                {/* NEW: Dashboards link */}
                <motion.div
                  key="Dashboards"
                  onClick={() => handleNavigation('/dashboards')}
                  className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Dashboards
                </motion.div>
                {/* NEW: Suppliers link */}
                <motion.div
                  key="Suppliers"
                  onClick={() => handleNavigation('/suppliers')}
                  className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suppliers
                </motion.div>
                {/* About link */}
                <motion.div
                  key="About"
                  onClick={() => navigate('/about')}
                  className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </motion.div>

                {/* Contact link */}
                <motion.div
                  key="Contact"
                  onClick={() => navigate('/contact')}
                  className="text-white/80 hover:text-white font-bold transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.div>
              </div>

              {/* Notification Section */}
              <div className="flex items-center space-x-4">
                <div className="relative notification-panel">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleNotifications}
                    className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </motion.button>

                  {/* Notification Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-12 right-0 w-80 max-h-96 overflow-y-auto backdrop-blur-3xl bg-black/90 border border-white/20 rounded-2xl shadow-2xl z-50"
                      >
                        <div className="p-4 border-b border-white/10">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Notifications</h3>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowNotifications(false)}
                              className="text-white/60 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-6 text-center text-white/60">
                              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p>No new notifications</p>
                            </div>
                          ) : (
                            notifications.map((notification) => (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors group"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`${notification.color} mt-1`}>
                                    {notification.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-white truncate">
                                      {notification.title}
                                    </h4>
                                    <p className="text-sm text-white/70 mt-1 leading-relaxed">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-white/50 mt-2">
                                      {notification.timestamp}
                                    </p>
                                  </div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => markAsRead(notification.id)}
                                    className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white/80 transition-all"
                                  >
                                    <X className="w-3 h-3" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                        
                        {notifications.length > 0 && (
                          <div className="p-4 border-t border-white/10">
                            <button 
                              onClick={() => setNotifications([])}
                              className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Clear all notifications
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                </AnimatePresence>
                </div>
              </div>

              {/* Login/User Section */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-bold text-sm">
                        Welcome, {user.name}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-400/30 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(79, 172, 254, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-200"
                  >
                    Login
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 pt-32"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
                initial={{ y: 100, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Telecom{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Inventory
                </span>
                <br />
                Management
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-bold"
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Revolutionize your telecom operations with AI-powered inventory
                management, real-time monitoring, and predictive analytics.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(79, 172, 254, 0.4)",
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center space-x-3 transition-all duration-300"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>
        </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={statsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={
                      statsInView
                        ? {
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/60 font-bold text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden p-8 sm:p-12 md:p-16">
          <section className="container mx-auto max-w-7xl text-center py-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500 leading-tight">
              Empower Your Telecom Infrastructure
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Seamlessly manage and monitor your network with our cutting-edge solutions designed for efficiency and reliability.
            </p>

            <div ref={featuresRef} className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                  animate={featuresInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                  }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-lg font-bold leading-relaxed">
                    {feature.description}
                  </p>
                  <motion.button
                    className="flex items-center text-blue-400 mt-6 font-bold"
                    whileHover={{ x: 10 }}
                    onClick={() => handleLearnMore(feature.title)}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Existing Sections */}
        <div>
          <HeroSection />
        </div>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-white/20 rounded-3xl p-12"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(79, 172, 254, 0.3)",
                    "0 0 40px rgba(79, 172, 254, 0.6)",
                    "0 0 20px rgba(79, 172, 254, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex p-4 rounded-full bg-blue-600/20 mb-8"
              >
                <Zap className="w-8 h-8 text-blue-400" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Telecom Operations?
                </span>
              </h2>

              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-bold">
                Join thousands of telecom professionals who trust our platform
                to manage their inventory and optimize their operations.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(79, 172, 254, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                >
                  Start Your Free Trial
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Contact Sales
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Existing Sections */}
        <div>
          <ShowCase />
        </div>
        <div>
          <FqaSection />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader
        onComplete={() => setIsLoading(false)}
        duration={5000}
      />
      <AnimatePresence>
        {!isLoading && <Hero />}
      </AnimatePresence>
    </>
  );
}