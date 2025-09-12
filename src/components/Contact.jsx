import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, HeadphonesIcon, MapPin, Phone } from 'lucide-react';
import * as THREE from 'three';

// --- Hardcoded Data (instead of entities) ---
const stationData = [
  {
    "id": 1,
    "name": "Sydney Data Center", 
    "location": "Sydney, Australia",
    "address": "100 Smith Street, Collingwood VIC 3066 AU",
    "coordinates": {"lat": -33.8688, "lng": 151.2093},
    "station_type": "data_center",
    "capacity": "10,000 servers",
    "status": "active"
  },
  {
    "id": 2,
    "name": "New York Hub",
    "location": "New York, USA", 
    "address": "45 Broadway, New York NY 10006",
    "coordinates": {"lat": 40.7128, "lng": -74.0060},
    "station_type": "fiber_hub",
    "capacity": "1 Tbps backbone",
    "status": "active"
  },
  {
    "id": 3,
    "name": "London Network Node",
    "location": "London, UK",
    "address": "25 Old Broad St, London EC2N 1HN",
    "coordinates": {"lat": 51.5074, "lng": -0.1278},
    "station_type": "network_node", 
    "capacity": "500 Gbps",
    "status": "active"
  },
  {
    "id": 4,
    "name": "Tokyo Satellite Station",
    "location": "Tokyo, Japan",
    "address": "1-1-2 Uchisaiwaicho, Chiyoda, Tokyo",
    "coordinates": {"lat": 35.6762, "lng": 139.6503},
    "station_type": "satellite_station",
    "capacity": "Global coverage",
    "status": "active"
  },
  {
    "id": 5,
    "name": "Singapore Cell Tower",
    "location": "Singapore",
    "address": "1 Marina Bay, Singapore 018989", 
    "coordinates": {"lat": 1.3521, "lng": 103.8198},
    "station_type": "cell_tower",
    "capacity": "5G coverage 50km",
    "status": "active"
  },
  {
    "id": 6,
    "name": "Mumbai Fiber Hub",
    "location": "Mumbai, India",
    "address": "BKC, Bandra East, Mumbai 400051",
    "coordinates": {"lat": 19.0760, "lng": 72.8777},
    "station_type": "fiber_hub",
    "capacity": "800 Gbps",
    "status": "active"
  }
];

// --- Embedded InteractiveMap Component ---
const InteractiveMap = ({ stations = [] }) => {
  const mountRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const getNetworkSignalPositions = () => {
    const signals = [];
    const signalTypes = [
      { type: 'wifi', color: '#10b981', size: 0.08 },
      { type: 'cellular', color: '#f59e0b', size: 0.06 },
      { type: 'bluetooth', color: '#8b5cf6', size: 0.05 },
      { type: 'satellite', color: '#06b6d4', size: 0.07 },
      { type: 'fiber', color: '#ef4444', size: 0.04 }
    ];

    for (let i = 0; i < 150; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lng = (Math.random() - 0.5) * 360;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const radius = 2.2 + Math.random() * 0.8;
      
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      const signalType = signalTypes[Math.floor(Math.random() * signalTypes.length)];
      
      signals.push({
        position: { x, y, z },
        ...signalType,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2
      });
    }
    return signals;
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight('#1e293b', 0.4));
    const pointLight1 = new THREE.PointLight('#0ea5e9', 0.8);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight('#10b981', 0.6);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: '#1e40af', wireframe: true, transparent: true, opacity: 0.1 });
    worldGroup.add(new THREE.Mesh(earthGeometry, earthMaterial));

    const networkSignals = getNetworkSignalPositions();
    const signalMeshes = networkSignals.map(signal => {
      let geometry;
      switch (signal.type) {
        case 'wifi': geometry = new THREE.RingGeometry(signal.size * 0.5, signal.size, 8); break;
        case 'cellular': geometry = new THREE.ConeGeometry(signal.size, signal.size * 1.5, 6); break;
        case 'bluetooth': geometry = new THREE.OctahedronGeometry(signal.size); break;
        case 'satellite': geometry = new THREE.TetrahedronGeometry(signal.size); break;
        default: geometry = new THREE.CylinderGeometry(signal.size * 0.3, signal.size * 0.3, signal.size * 2); break;
      }
      const material = new THREE.MeshBasicMaterial({ color: signal.color, transparent: true, opacity: 0.7 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(signal.position.x, signal.position.y, signal.position.z);
      mesh.userData = { signal };
      worldGroup.add(mesh);
      return mesh;
    });

    const stationGeometry = new THREE.SphereGeometry(0.04, 16, 12);
    const stationMaterial = new THREE.MeshBasicMaterial({ color: '#f59e0b', transparent: true, opacity: 0.9 });
    const stationGlowGeometry = new THREE.SphereGeometry(0.08, 16, 12);
    const stationGlowMaterial = new THREE.MeshBasicMaterial({ color: '#fbbf24', transparent: true, opacity: 0.2 });
    
    const stationMeshes = stations.map(station => {
      const phi = (90 - station.coordinates.lat) * (Math.PI / 180);
      const theta = (station.coordinates.lng + 180) * (Math.PI / 180);
      const x = -2.1 * Math.sin(phi) * Math.cos(theta);
      const y = 2.1 * Math.cos(phi);
      const z = 2.1 * Math.sin(phi) * Math.sin(theta);
      const mesh = new THREE.Mesh(stationGeometry, stationMaterial);
      mesh.position.set(x, y, z);
      mesh.userData = { station };
      const glowMesh = new THREE.Mesh(stationGlowGeometry, stationGlowMaterial);
      glowMesh.position.set(x, y, z);
      worldGroup.add(mesh);
      worldGroup.add(glowMesh);
      return mesh;
    });

    const hoverRingGeometry = new THREE.RingGeometry(0.06, 0.1, 16);
    const hoverRingMaterial = new THREE.MeshBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    const hoverRing = new THREE.Mesh(hoverRingGeometry, hoverRingMaterial);
    hoverRing.visible = false;
    scene.add(hoverRing);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1, -1);
    let lastIntersected = null;

    const onMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      worldGroup.rotation.y += 0.002;

      signalMeshes.forEach(mesh => {
        const { signal } = mesh.userData;
        const pulse = 1 + Math.sin(time * signal.speed * 2 + signal.phase) * 0.2;
        mesh.scale.setScalar(pulse);
        if (signal.type === 'satellite' || signal.type === 'bluetooth') {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.02;
        }
        mesh.material.opacity = 0.5 + Math.sin(time * signal.speed + signal.phase) * 0.3;
      });

      if (hoverRing.visible) {
        hoverRing.rotation.z += 0.05;
        hoverRing.scale.setScalar(1 + Math.sin(time * 4) * 0.1);
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stationMeshes);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (lastIntersected !== intersectedObject) {
          lastIntersected = intersectedObject;
          const { station } = intersectedObject.userData;
          const rect = renderer.domElement.getBoundingClientRect();
          setTooltip({ station, position: { x: (mouse.x * 0.5 + 0.5) * rect.width + rect.left, y: (-mouse.y * 0.5 + 0.5) * rect.height + rect.top } });
          hoverRing.position.copy(intersectedObject.position);
          hoverRing.lookAt(camera.position);
          hoverRing.visible = true;
        }
      } else if (lastIntersected) {
        lastIntersected = null;
        setTooltip(null);
        hoverRing.visible = false;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [stations]);

  return (
    <div className="relative w-full h-96">
      <div ref={mountRef} className="w-full h-full" />
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 bg-slate-800 border border-cyan-400/30 text-white p-4 rounded-lg shadow-xl pointer-events-none backdrop-blur-sm"
            style={{ left: tooltip.position.x - 120, top: tooltip.position.y - 120, transform: 'translate(-50%, -50%)' }}
          >
            <div className="text-sm font-semibold text-cyan-300">{tooltip.station.location}</div>
            <div className="text-xs text-gray-300">{tooltip.station.name}</div>
            <div className="text-xs text-gray-400">{tooltip.station.address}</div>
            <div className="text-xs text-amber-300 mt-1">{tooltip.station.station_type?.replace(/_/g, ' ')} • {tooltip.station.capacity}</div>
            <div className={`inline-block px-2 py-1 rounded text-xs mt-2 ${tooltip.station.status === 'active' ? 'bg-green-600' : 'bg-orange-600'}`}>
              {tooltip.station.status}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs">
        <div className="font-semibold mb-2 text-cyan-300">Network Signals</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div><span>WiFi Networks</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded"></div><span>Cellular Towers</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Bluetooth Hubs</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500 rounded"></div><span>Satellite Links</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded"></div><span>Fiber Networks</span></div>
        </div>
      </div>
    </div>
  );
};

// --- Embedded ContactSection Component ---
const ContactSection = ({ icon: Icon, title, description, actionText, actionHref, delay = 0 }) => {
  const ButtonClasses = "w-full border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors inline-block text-center py-2 px-4 rounded-md";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:border-cyan-400/40 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-cyan-200 text-sm mb-4">{description}</p>
        </div>
        <a href={actionHref} className={ButtonClasses}>
          {actionText}
        </a>
      </div>
    </motion.div>
  );
};


// --- Main Page Component ---
export default function Contact() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Using hardcoded data instead of fetching
    setStations(stationData);
  }, []);

  const contactSections = [
    { icon: MessageCircle, title: "Chat to sales", description: "Speak to our friendly team about inventory solutions.", actionText: "sales@telecom-ims.com", actionHref: "mailto:sales@telecom-ims.com", delay: 0.1 },
    { icon: HeadphonesIcon, title: "Chat to support", description: "We're here to help with technical assistance.", actionText: "support@telecom-ims.com", actionHref: "mailto:support@telecom-ims.com", delay: 0.2 },
    { icon: MapPin, title: "Visit us", description: "Visit our headquarters and operations center.", actionText: "View on Google Maps", actionHref: "https://maps.google.com/?q=Telecom+Headquarters", delay: 0.3 },
    { icon: Phone, title: "Call us", description: "Mon-Fri from 8am to 5pm EST.", actionText: "+1 (555) 123-4567", actionHref: "tel:+15551234567", delay: 0.4 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium rounded-full mb-6">Contact us</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Get in touch with our team</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-xl text-cyan-100 max-w-2xl mx-auto leading-relaxed">We have the expertise and technology to help you manage your telecom infrastructure more efficiently.</motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mb-20 bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-cyan-400/20 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-2">Global Network Infrastructure</h2>
            <p className="text-cyan-200 text-center mb-8">Interactive view of our telecom stations and network signals worldwide</p>
            <InteractiveMap stations={stations} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactSections.map((section, index) => <ContactSection key={index} {...section} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="mt-20 text-center">
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white rounded-3xl p-12 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4">Ready to optimize your telecom inventory?</h3>
            <p className="text-cyan-100 text-lg mb-6 max-w-2xl mx-auto">Join hundreds of telecom companies that trust our inventory management system to streamline their operations.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="mailto:sales@telecom-ims.com" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-cyan-50 transition-colors duration-200 shadow-lg">Start Your Free Trial</a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}