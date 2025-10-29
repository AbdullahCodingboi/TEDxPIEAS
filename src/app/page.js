'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Past Events Carousel Component
function PastEventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const events = [
    { year: "2019", title: "TEDxPIEAS 2019", theme: "Dare to Dream", attendees: "300+" },
    { year: "2020", title: "TEDxPIEAS 2020", theme: "Beyond Boundaries", attendees: "400+" },
    { year: "2021", title: "TEDxPIEAS 2021", theme: "Rise & Thrive", attendees: "350+" },
    { year: "2022", title: "TEDxPIEAS 2022", theme: "New Horizons", attendees: "450+" },
    { year: "2023", title: "TEDxPIEAS 2023", theme: "Infinite Possibilities", attendees: "500+" }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px]">
      {/* Carousel Container */}
      <div className="relative w-full h-full" style={{ perspective: '2000px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {events.map((event, idx) => {
            const position = idx - currentIndex;
            const isActive = idx === currentIndex;
            
            // Calculate curved position (inverted U - center forward, sides back)
            const angle = position * 35; // degrees
            const radius = 600; // pixels
            const radians = (angle * Math.PI) / 180;
            
            const translateX = Math.sin(radians) * radius;
            const translateZ = Math.cos(radians) * radius - radius; // Center forward, sides back
            const rotateY = -angle; // Rotate to face viewer
            const scale = 1 - Math.abs(position) * 0.1;
            
            let zIndex = 30 - Math.abs(position) * 5; // Center card highest
            let opacity = Math.max(1 - Math.abs(position) * 0.2, 0.4);
            
            const transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${Math.max(scale, 0.6)})`;

            return (
              <motion.div
                key={idx}
                className="absolute w-[280px] md:w-[400px] h-[400px] md:h-[500px]"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`w-full h-full bg-[#1a1a1a] border-2 ${isActive ? 'border-[#ff0000]' : 'border-[#333333]'} p-8 flex flex-col justify-between transition-all duration-300`}>
                  {/* Year Badge */}
                  <div className="inline-block self-start">
                    <div className="border-2 border-white px-4 py-2">
                      <span className="text-white text-sm font-bold tracking-widest">{event.year}</span>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-black text-white">
                      {event.title}
                    </h3>
                    <div className="w-16 h-1 bg-[#ff0000]"></div>
                    <p className="text-xl text-white font-bold">
                      Theme: <span className="text-[#ff0000]">{event.theme}</span>
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6">
                    <div>
                      <p className="text-3xl font-black text-[#ff0000]">{event.attendees}</p>
                      <p className="text-sm text-white uppercase tracking-wider">Attendees</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-[#ff0000]">10+</p>
                      <p className="text-sm text-white uppercase tracking-wider">Speakers</p>
                    </div>
                  </div>

                  {/* Image Placeholder */}
                  <div className="mt-4 h-24 bg-[#333333] border-2 border-white flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-[#ff0000] hover:bg-white hover:text-[#ff0000] text-white transition-all duration-300 flex items-center justify-center border-2 border-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-[#ff0000] hover:bg-white hover:text-[#ff0000] text-white transition-all duration-300 flex items-center justify-center border-2 border-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 border-2 border-white transition-all duration-300 ${
              idx === currentIndex ? 'bg-[#ff0000]' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Particle system component
function ParticleField() {
  const points = useRef();
  const particleCount = 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    
    const positions = points.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += Math.sin(time * 0.5 + i) * 0.001;
      positions[i * 3 + 1] += Math.cos(time * 0.3 + i) * 0.001;
      positions[i * 3 + 2] += Math.sin(time * 0.4 + i) * 0.001;
      
      if (Math.abs(positions[i * 3]) > 25) positions[i * 3] *= -0.9;
      if (Math.abs(positions[i * 3 + 1]) > 25) positions[i * 3 + 1] *= -0.9;
      if (Math.abs(positions[i * 3 + 2]) > 15) positions[i * 3 + 2] *= -0.9;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += 0.0002;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ff0000"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    group.current.rotation.y += 0.001;
  });

  return (
    <group ref={group}>
      <mesh position={[-5, 2, -5]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#ff0000"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      <mesh position={[6, -3, -8]}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#ff0000"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      
      <mesh position={[-8, -2, -10]}>
        <tetrahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#ff0000"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff0000" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />
      <ParticleField />
      <FloatingShapes />
    </>
  );
}

export default function TEDxHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#222222] overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <motion.div 
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center space-x-2"
        >
          <div className="text-white font-bold text-xl md:text-2xl">
            TEDx<span className="text-[#ff0000]">PIEAS</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex space-x-8 text-sm text-white"
        >
          <a href="#home" className="hover:text-[#ff0000] transition-colors">HOME</a>
          <a href="#about" className="hover:text-[#ff0000] transition-colors">ABOUT</a>
          <a href="#team" className="hover:text-[#ff0000] transition-colors">OUR TEAM</a>
          <a href="#speakers" className="hover:text-[#ff0000] transition-colors">SPEAKERS</a>
          <a href="#talks" className="hover:text-[#ff0000] transition-colors">TALKS</a>
          <a href="#highlights" className="hover:text-[#ff0000] transition-colors">HIGHLIGHTS</a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="md:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side - Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Event Badge */}
              <motion.div variants={itemVariants} className="inline-block">
                <div className="inline-flex items-center gap-3 border-2 border-white px-6 py-3">
                  <div className="w-2 h-2 bg-[#ff0000]"></div>
                  <span className="text-white text-sm font-bold tracking-widest">TEDx EVENT 2025</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-6">
                  AGAINST<br />
                  <span className="text-[#ff0000]">ALL</span><br />
                  ODDS
                </h1>
                <div className="w-24 h-1 bg-[#ff0000]"></div>
              </motion.div>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-white text-lg md:text-xl leading-relaxed max-w-xl"
              >
                Join us for an extraordinary gathering of visionaries, innovators, and change-makers as we explore ideas that challenge conventions and inspire transformation.
              </motion.p>

              {/* Event Details */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                  <svg className="w-6 h-6 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/70">EVENT DATE</p>
                    <p className="font-bold text-lg">April 12, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white">
                  <svg className="w-6 h-6 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/70">LOCATION</p>
                    <p className="font-bold text-lg">PIEAS, Islamabad</p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#ff0000] text-white font-bold px-10 py-4 text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
                >
                  Register Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent text-white font-bold px-10 py-4 text-base uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#222222] transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block relative"
            >
              {/* Countdown Timer */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="space-y-6"
                >
                  <p className="text-white text-sm uppercase tracking-widest mb-8">Event Countdown</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-[#ff0000] mb-2">134</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Days</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-white mb-2">08</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Hours</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-white mb-2">45</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Minutes</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-white mb-2">23</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Seconds</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Simple Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 lg:mt-20"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="h-px bg-[#ff0000]"
                style={{ width: "60px" }}
              />
              <p className="text-white text-lg md:text-xl font-bold uppercase tracking-widest">
                Ideas Worth Spreading
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Section Preview */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-[#1a1a1a] py-20 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="text-white">We share</span>
              <br />
              <span className="text-[#ff0000]">ideas</span>
              <span className="text-white"> worth</span>
              <br />
              <span className="text-white">spreading</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              What is TEDx?
            </h3>
            <p className="text-white text-base md:text-lg leading-relaxed max-w-4xl">
              In the spirit of ideas worth spreading, TED has created a program called TEDx. 
              TEDx is a program of local, self-organized events that bring people together to share 
              a TED-like experience. Our event is called TEDxPIEAS, where x = independently 
              organized TED event. At our TEDxPIEAS event, TEDTalks video and live speakers will 
              combine to spark deep discussion and connection in a small group.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 text-[#ff0000] font-semibold flex items-center gap-2 group"
            >
              FIND OUT MORE 
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Talks Section Preview */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#222222]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white"
            >
              Talks
            </motion.h2>
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#ff0000] font-semibold text-sm md:text-base flex items-center gap-2"
            >
              VIEW ALL TALKS →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "What will it take to change the world?",
              "Do what you love",
              "Can life use plastic so many shoes",
              "Change the narrative of change itself",
              "Exposure adds value to personality",
              "The path of purpose"
            ].map((title, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-[#333333] relative overflow-hidden">
                  <div className="absolute inset-0 group-hover:bg-[#ff0000]/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 rounded-full bg-[#ff0000] flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#ff0000] transition-colors">
                    {title}
                  </h3>
                  <p className="text-white text-sm">Speaker Name | 2025</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Past Events Carousel */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#222222] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-16 text-center"
          >
            Past <span className="text-[#ff0000]">Events</span>
          </motion.h2>

          <div className="relative">
            <PastEventsCarousel />
          </div>
        </div>
      </motion.section>

      {/* Speakers Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-16 text-center"
          >
            Our <span className="text-[#ff0000]">Speakers</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Sarah Ahmed", bio: "AI researcher pioneering ethical machine learning systems" },
              { name: "Ali Hassan", bio: "Social entrepreneur transforming education in rural communities" },
              { name: "Maria Khan", bio: "Climate activist leading sustainable urban development" },
              { name: "Omar Farooq", bio: "Tech innovator building accessible healthcare solutions" },
              { name: "Fatima Malik", bio: "Artist exploring digital and traditional mediums" },
              { name: "Usman Ali", bio: "Neuroscientist researching cognitive enhancement" },
              { name: "Ayesha Butt", bio: "Award-winning documentary filmmaker" },
              { name: "Hassan Raza", bio: "Startup founder revolutionizing fintech" }
            ].map((speaker, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center relative overflow-visible"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#333333] border-2 border-white group-hover:border-[#ff0000] transition-all duration-300 mb-4 flex items-center justify-center relative overflow-hidden">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-white relative  transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  
                  {/* Drawer that slides from bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-full bg-[#ff0000] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-center p-4 border-2 border-white">
                    <p className="text-white text-xs md:text-sm font-bold text-center leading-tight">
                      {speaker.bio}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-center group-hover:text-[#ff0000] transition-colors">
                  {speaker.name}
                </h3>
                <p className="text-white text-sm text-center mt-1">Speaker</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Organizers Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#222222]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-4 text-center"
          >
            The <span className="text-[#ff0000]">Team</span>
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white text-center mb-16 text-lg"
          >
            Organizers & Coordinators making it happen
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Ahmed Khan", role: "Lead Organizer" },
              { name: "Zainab Ali", role: "Event Coordinator" },
              { name: "Bilal Shahid", role: "Marketing Head" },
              { name: "Hira Siddiqui", role: "Logistics Manager" },
              { name: "Fahad Iqbal", role: "Tech Lead" },
              { name: "Sana Tariq", role: "Design Head" }
            ].map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-6 flex items-center gap-6"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#ff0000] transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-white text-sm">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#1a1a1a] border-t-2 border-[#333333] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Logo and About */}
            <div>
              <h3 className="text-white font-bold text-2xl mb-4">
                TEDx<span className="text-[#ff0000]">PIEAS</span>
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Ideas worth spreading. Join us for an unforgettable experience of innovation, inspiration, and connection.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white hover:text-[#ff0000] transition-colors text-sm">About</a></li>
                <li><a href="#speakers" className="text-white hover:text-[#ff0000] transition-colors text-sm">Speakers</a></li>
                <li><a href="#talks" className="text-white hover:text-[#ff0000] transition-colors text-sm">Talks</a></li>
                <li><a href="#team" className="text-white hover:text-[#ff0000] transition-colors text-sm">Team</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#333333] hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#333333] hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#333333] hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">© 2025 TEDxPIEAS. All rights reserved.</p>
            <p className="text-white text-sm">
              This independent TEDx event is operated under license from TED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}