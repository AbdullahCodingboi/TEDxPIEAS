'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Particle system component
function ParticleField() {
  const points = useRef();
  const particleCount = 1500;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    return { positions };
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

export default function LearnMorePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <a href="/" className="text-white font-bold text-xl md:text-2xl">
            TEDx<span className="text-[#ff0000]">PIEAS</span>
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a 
            href="/"
            className="text-white hover:text-[#ff0000] transition-colors text-sm font-semibold"
          >
            ← BACK TO HOME
          </a>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-12 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8">
              Learn <span className="text-[#ff0000]">More</span>
              <br />About TEDx
            </h1>
            <div className="w-32 h-1 bg-[#ff0000]"></div>
          </motion.div>
        </div>
      </div>

      {/* What is TEDx Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                What is <span className="text-[#ff0000]">TEDx?</span>
              </h2>
              <div className="space-y-4 text-white text-lg leading-relaxed">
                <p>
                  In the spirit of ideas worth spreading, TED created a program called TEDx. 
                  TEDx is a program of local, self-organized events that bring people together 
                  to share a TED-like experience.
                </p>
                <p>
                  At a TEDx event, TED Talks video and live speakers combine to spark deep 
                  discussion and connection. These local, self-organized events are branded 
                  TEDx, where x = independently organized TED event.
                </p>
                <p>
                  The TED Conference provides general guidance for the TEDx program, but 
                  individual TEDx events are self-organized. (Subject to certain rules and 
                  regulations.)
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-[#222222] border-4 border-[#ff0000] p-8 md:p-12"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-2xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Local & Independent</h3>
                    <p className="text-white">
                      Each TEDx event is independently organized by volunteers in their community
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-2xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Ideas Worth Spreading</h3>
                    <p className="text-white">
                      We share powerful talks that spark curiosity and meaningful conversations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-2xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Community Driven</h3>
                    <p className="text-white">
                      Bringing together thought leaders, innovators, and curious minds
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* TED vs TEDx Section */}
      {/* <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#222222]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-12 text-center"
          >
            TED <span className="text-[#ff0000]">vs</span> TEDx
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border-2 border-white p-8 hover:border-[#ff0000] transition-all duration-300"
            >
              <h3 className="text-3xl font-black text-white mb-6">TED</h3>
              <ul className="space-y-4 text-white">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Annual conference in Vancouver, Canada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Curated by TED organization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Global thought leaders and innovators</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Founded in 1984</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Technology, Entertainment, Design focus</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1a1a] border-2 border-[#ff0000] p-8"
            >
              <h3 className="text-3xl font-black text-[#ff0000] mb-6">TEDx</h3>
              <ul className="space-y-4 text-white">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Local, independently organized events worldwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Community volunteers organize and curate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Local speakers and thought leaders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Program launched in 2009</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff0000] text-xl">•</span>
                  <span>Diverse topics relevant to local communities</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section> */}

      {/* About TEDxPIEAS Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              About TEDx<span className="text-[#ff0000]">PIEAS</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-white text-lg leading-relaxed space-y-4">
              <p>
                TEDxPIEAS is an independently organized TED event bringing together the brightest 
                minds at Pakistan Institute of Engineering and Applied Sciences (PIEAS) and beyond. 
                Our mission is to create a platform where innovative ideas, groundbreaking research, 
                and inspiring stories converge.
              </p>
              <p>
                Located in Islamabad, Pakistan, PIEAS is renowned for its excellence in engineering, 
                applied sciences, and technology. Our TEDx event reflects this spirit of innovation 
                and academic excellence, featuring speakers from diverse fields including science, 
                technology, arts, and social impact.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-[#222222] border-2 border-white p-6 hover:border-[#ff0000] transition-all duration-300">
                <div className="text-5xl font-black text-[#ff0000] mb-4">500+</div>
                <p className="text-white font-bold text-lg">Expected Attendees</p>
              </div>

              <div className="bg-[#222222] border-2 border-white p-6 hover:border-[#ff0000] transition-all duration-300">
                <div className="text-5xl font-black text-[#ff0000] mb-4">12</div>
                <p className="text-white font-bold text-lg">Featured Speakers</p>
              </div>

              <div className="bg-[#222222] border-2 border-white p-6 hover:border-[#ff0000] transition-all duration-300">
                <div className="text-5xl font-black text-[#ff0000] mb-4">8hrs</div>
                <p className="text-white font-bold text-lg">Of Inspiration</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Attend Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#222222]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-12 text-center"
          >
            Why <span className="text-[#ff0000]">Attend?</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Get Inspired",
                description: "Hear from visionaries who are shaping the future with their innovative ideas and groundbreaking work",
                icon: "💡"
              },
              {
                title: "Network",
                description: "Connect with like-minded individuals, fellow students, professionals, and thought leaders",
                icon: "🤝"
              },
              {
                title: "Learn",
                description: "Gain insights from diverse fields including science, technology, arts, and social innovation",
                icon: "📚"
              },
              {
                title: "Discover",
                description: "Explore new perspectives and challenge your thinking with ideas that spark curiosity",
                icon: "🔍"
              },
              {
                title: "Engage",
                description: "Participate in interactive sessions, workshops, and discussions throughout the event",
                icon: "🎯"
              },
              {
                title: "Transform",
                description: "Leave empowered with knowledge and connections to make a positive impact in your community",
                icon: "🚀"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-6"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-white font-black text-2xl mb-3">{item.title}</h3>
                <p className="text-white leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Event Format Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-10 px-6 md:px-12 bg-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-12"
          >
            Event <span className="text-[#ff0000]">Format</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {[
             {
  time: "09:30 - 10:00 AM",
  title: "Registration & Welcome",
  description: "Attendees and guests arrive, register, and network"
},
{
  time: "10:00 - 10:15 AM",
  title: "Opening Ceremony",
  description: "National Anthem, Curator's welcome, and Chief Guest's address"
},
{
  time: "10:15 AM - 12:15 PM",
  title: "Morning Speaker Session (Talks 1-6)",
  description: "Six guest talks (~20 min each) on innovation, leadership, and purposeful decision-making"
},
{
  time: "12:15 - 12:35 PM",
  title: "Drama on Entrepreneurship",
  description: "A 20-minute original play 'The Weight of Choices' highlighting risk, resilience, and choices in entrepreneurship"
},
{
  time: "12:35 - 01:00 PM",
  title: "Midday Speaker Session (Talks 7-8)",
  description: "Two impactful talks (~12 min each) leading into the lunch break"
},
{
  time: "01:00 - 01:30 PM",
  title: "Lunch Break",
  description: "Single consolidated break for all attendees and guests"
},
{
  time: "01:30 - 04:30 PM",
  title: "Afternoon Speaker Session (Talks 9-18)",
  description: "Nine guest talks (~20 min each) focusing on sustainability, ethics, creativity, and life decisions"
},
{
  time: "04:30 - 04:50 PM",
  title: "Instrumental Performance",
  description: "20-minute live performance by PIEAS student"
},
{
  time: "04:50 - 05:50 PM",
  title: "Interactive Panel & Reflections",
  description: "Moderator-led discussion and Q&A with select speakers exploring 'The Weight of Choices' in depth"
},
{
  time: "05:50 - 06:30 PM",
  title: "Closing Ceremony",
  description: "Curator's reflections, acknowledgments, and presentation of souvenirs"
},
{
  time: "06:30 - 07:00 PM",
  title: "Vote of Thanks & Departure",
  description: "Group photo and conclusion of TEDxPIEAS 2025"
}
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-6 mb-0 items-start group"
              >
                <div className="flex-shrink-0 w-32">
                  <div className="bg-[#ff0000] text-white font-black text-sm py-2 px-4 text-center">
                    {item.time}
                  </div>
                </div>
                <div className="flex-1 bg-[#222222] border-2 border-[#333333] group-hover:border-[#ff0000] transition-all duration-300 p-6">
                  <h3 className="text-white font-black text-xl mb-2">{item.title}</h3>
                  <p className="text-white">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 py-20 px-6 md:px-12 bg-[#222222]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to <span className="text-[#ff0000]">Join Us?</span>
            </h2>
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Be part of an extraordinary gathering of minds. Reserve your spot at TEDxPIEAS 2025 
              and experience ideas that will inspire, challenge, and transform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                              href={'https://forms.gle/WKtY7xUr5WDrnuAf9'}
                              target="_blank"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                // onClick={() => setRegistrationOpen(true)}
                                className="bg-[#ff0000] text-white font-bold px-10 py-4 text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
                              >
                                Register Now
                              </motion.a>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white font-bold px-10 py-4 text-base uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#222222] transition-all duration-300"
              >
                Back to Home
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#1a1a1a] border-t-2 border-[#333333] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
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

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contacts</h4>
            <ul className="space-y-3">
              <li>
                <p className="text-white font-semibold text-sm">Rida Aziz</p>
                <p className="text-gray-400 text-xs">Head Liaison</p>
                <a href="tel:+923176565132" className="text-white hover:text-[#ff0000] transition-colors text-xs block">
                  +92 317 6565132
                </a>
              </li>
              <li>
                <p className="text-white font-semibold text-sm">Muhammad Bilal</p>
                <p className="text-gray-400 text-xs">Director Foreign Affairs</p>
                <a href="tel:+923154399354" className="text-white hover:text-[#ff0000] transition-colors text-xs block">
                  +92 315 4399354
                </a>
              </li>
              <li>
                <p className="text-white font-semibold text-sm">Malik Hassam Zahid</p>
                <p className="text-gray-400 text-xs">Head Outreach</p>
                <a href="tel:+923485184940" className="text-white hover:text-[#ff0000] transition-colors text-xs block">
                  +92 348 5184940
                </a>
              </li>
            </ul>
          </div>

          {/* Connect - Social Media */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/tedxpieas?igsh=MXY0YmJ0MjBsMThoNQ==" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#333333] hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center rounded"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.061-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.149-.558-2.913-.306-.789-.717-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/ted-x-pieas-523080399?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#333333] hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center rounded"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.64 1.34 2.98 2.98 2.98s2.98-1.34 2.98-2.98c0-1.64-1.34-2.98-2.98-2.98zM2.4 8.98h5.16V21H2.4V8.98zm7.88 0h4.95v1.63h.07c.69-1.31 2.38-2.7 4.89-2.7 5.23 0 6.2 3.44 6.2 7.91V21h-5.16v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V21H10.28V8.98z"/>
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