'use client';

import React, { useRef, useMemo, useState,useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ThreeDImageRing } from "@/components/lightswind/3d-image-ring";
import Link from "next/link";
import { ThreeDMarquee, MarqueeImage } from "@/components/lightswind/3d-marquee"
import  TEDxRegistrationModal  from '@/components/Form/Form';
// Past Events Carousel Component
 import InstrumentalPerformance from '@/components/Misc/MusicAndArt';
// function PastEventsCarousel() {

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
 const imageUrls = [

  "/eventHighlights/12.jpg",
  "/eventHighlights/13.jpg",
  "/eventHighlights/14.jpg",
  "/eventHighlights/15.jpg",
  "/eventHighlights/16.jpg",
  "/eventHighlights/17.jpg",
  "/eventHighlights/18.jpg",
  "/eventHighlights/19.jpg",
  "/eventHighlights/20.jpg",
  "/eventHighlights/21.jpg",
  "/eventHighlights/22.jpg",
  "/eventHighlights/23.jpg"
];

const clickableImages = [
  {
    src: "/path/to/image1.jpg",
    alt: "Portfolio Item 1",
    href: "https://example.com/project1",
    target: "_blank"
  }
];
 

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

  const [registrationOpen, setRegistrationOpen] = useState(false);
  
  // Countdown state -> target: Nov 29, 2025 (local timezone)
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });

  useEffect(() => {
    const target = new Date(2025, 10, 29, 0, 0, 0); // month is 0-indexed: 10 = November

    function update() {
      const now = new Date();
      let diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: '0', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const sec = Math.floor((diff / 1000) % 60);
      const min = Math.floor((diff / (1000 * 60)) % 60);
      const hr = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));

      setCountdown({
        days: String(d),
        hours: String(hr).padStart(2, '0'),
        minutes: String(min).padStart(2, '0'),
        seconds: String(sec).padStart(2, '0')
      });
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // enable smooth scrolling for in-page anchors
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev || "";
    };
  }, []);
     
  return (
    <div id="home" className="relative min-h-screen bg-[#222222] overflow-hidden">
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
                  TED<br />
                  <span className="text-[#ff0000]">X</span><br />
                 PIEAS
                </h1>
                <div className="w-24 h-1 bg-[#ff0000]"></div>
              </motion.div>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-white text-lg md:text-xl leading-relaxed max-w-xl"
              >
                TED is a global nonprofit committed to exploring ideas that challenge perspectives, inspire curiosity, and encourage meaningful action. What began in 1984 as a convergence of Technology, Entertainment and Design has grown into a worldwide movement that welcomes voices from every field — science, innovation, humanities, business, art, and social change. Through TED Talks, educational series, podcasts, and thousands of independent TEDx events held across the world each year, TED works to make powerful ideas accessible to all. With no political or commercial agenda, TED continues to foster learning, connection, and dialogue, offering a platform where ideas can ignite conversations and shape a more thoughtful and informed future.
              </motion.p>

              {/* Event Details */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                  <svg className="w-6 h-6 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/70">EVENT DATE</p>
                    <p className="font-bold text-lg">November 29, 2025</p>
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
                <Link href="/LearnMore">
                <motion.button
                
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent text-white font-bold px-10 py-4 text-base uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#222222] transition-all duration-300"
                >
                  Learn More
                </motion.button>
                </Link>
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
                      <p className="text-6xl font-black text-[#ff0000] mb-2">{countdown.days}</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Days</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-white mb-2">{countdown.hours}</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Hours</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-white mb-2">{countdown.minutes}</p>
                      <p className="text-sm text-white uppercase tracking-wider font-bold">Minutes</p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="bg-[#1a1a1a] border-2 border-white p-8 text-center hover:border-[#ff0000] transition-all duration-300"
                    >
                      <p className="text-6xl font-black text-white mb-2">{countdown.seconds}</p>
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
        id="about"
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
              TEDx
            </h3>
            <div className="text-white text-base md:text-lg leading-relaxed max-w-4xl space-y-4">
              <p>
                TEDx is a global initiative that brings the power of TED’s mission — ideas worth spreading — to local communities across the world. Each TEDx event is independently organized by committed volunteers who believe that a single idea, when shared, can shift perspectives, challenge assumptions, and ignite change.
              </p>
              <p>
                Under a free license from TED, organizers curate thought-provoking talks, performances, and conversations that follow TED’s global standards while reflecting the unique voice of their community. TEDx events aim to create moments of clarity — the kind that make audiences pause, rethink, and see the world differently.
              </p>
              <p>
                With thousands of events held annually, TEDx has become a catalyst for eye-opening insights, unexpected discoveries, and ideas that illuminate the path toward a more informed and inspired society.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Talks Section Preview */}
     <motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  id="talks"
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
        className="text-[#ff0000] font-semibold text-sm md:text-base flex items-center gap-2 hover:text-white transition-colors"
        onClick={() => window.open('https://www.youtube.com/@TEDx/search?query=pieas', '_blank')}
      >
        VIEW ALL TALKS →
      </motion.button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
  {
    title: "Athletes and Mental Health- The Unrevealed Contender",
    speaker: "Hajra Khan",
    videoId: "5YeYnByqDBw"
  },
  {
    title: "Harnessing Technology and Available Resources to Bridge Gaps",
    speaker: "Yahya Ali",
    videoId: "m8r3k4A0dm8"
  },
  {
    title: "Power Of Choices We Make Everyday",
    speaker: "Sobia Zafar",
    videoId: "92PqfXX8yTE"
  },
  {
    title: "Making Traveling Frictionless in Pakistan",
    speaker: "Muhammad Azeem",
    videoId: "277KAoGgsJI"
  },
  {
    title: "Giving Back To Society Through Business Ventures",
    speaker: "Umer Hussain",
    videoId: "6tmUxCS8FVA"
  },
  {
    title: "Taleem ki Taaqat (The Might of Education)",
    speaker: "Master Ayub Khan",
    videoId: "ba9-gihhcK8"
  },
  {
    title: "The Importance of Listicles",
    speaker: "Haseeb Sultan",
    videoId: "qQhTezcKMHw"
  },
  {
    title: "Taking Analytics to the Dance Floor",
    speaker: "Tanveer Nandla",
    videoId: "8Xkuuw4AuiE"
  },
  {
    title: "Performance by Bilal Khan",
    speaker: "Bilal Khan",
    videoId: "S3CFkTbRx2Y"
  }
].map((talk, idx) => (
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
      <iframe
        src={`https://www.youtube.com/embed/${talk.videoId}`}
        title={talk.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
    <div className="p-6">
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#ff0000] transition-colors line-clamp-2">
        {talk.title}
      </h3>
      <p className="text-gray-400 text-sm">{talk.speaker} | TEDxPIEAS</p>
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
        id="highlights"
        className="relative z-10 py-10 px-6 md:px-12 bg-[#222222] overflow-hidden"
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

        </div>
      </motion.section>
 
<div className="h-[480px] px-0 mx-0 sm:h-[480px]  flex items-center justify-center w-full">
 <ThreeDImageRing 
   images={imageUrls} 
   imageDistance={600} 
   perspective={2000}
 width={300}
   id="speakers"
   imageClassName="!bg-center"
 />
</div>
{/* Responsive 3D ring — full width on small devices, constrained on large */}
<div className="w-full px-0 mx-0 h-[320px] sm:h-[480px] flex items-center justify-center">
 <div className="w-full max-w-4xl lg:max-w-none">
   <ThreeDImageRing
     images={imageUrls}
    imageDistance={600}
     perspective={2000}
     id="speakers"
    className="w-full h-full"
     imageClassName="!bg-center"
    />
  </div>
</div>

      {/* Speakers Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        id="speakers"
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
              { name: "Orya Maqbool Jan", bio: "Orya Maqbool Jan is a senior columnist, poet, playwright, and intellectual widely recognized across Pakistan", image: "/Speakers/Orya Maqbool Jan.png" },
              { name: "Tuaha Ibn-e-Jalil", bio: "Tuaha Ibn e Jalil is a renowned motivational speaker and life coach inspiring millions through his transformative journey", image: "/Speakers/tuahaibnejalil.jpeg" },
              { name: "Dr Hurriya Khan", bio: "Dr. Hurriya Khan is a dedicated physician, mentor, and advocate for change, blending compassion with purpose.", image: "/Speakers/DrHUrriya.jpeg" },
              { name: "Adeel Hashmi", bio: "Tech innovator building accessible healthcare solutions", image: "/Speakers/adeelhashmi.jpeg" },
              { name: "Dr. Sassi Malik Sher", bio: "Educationist & Women Empowerment Advocate", image: "/Speakers/Dr. Sassi Malik Sher.png" },
              { name: "Raza Syed", bio: "Communications & Policy Expert", image: "/Speakers/Raza Syed.png" },
              { name: "Fahad Malik", bio: "Digital Media Specialist | Tamgha-e-Imtiaz", image: "/Speakers/Fahad Malik.jpeg" },
              { name: "Zaurayze Tarique", bio: "CEO & Founder of NY212 & Instacon", image: "/Speakers/Zaurayze Tarique.png" },
              { name: "Ozair Khan (OzairArts)", bio: "Digital Creator & Storyteller", image: "/Speakers/Ozair Khan.png" },
              { name: "Fahad Shahbaz", bio: "Youth Leader & Founder of YGA Pakistan", image: "/Speakers/Fahad Shahbaz .png" },
              { name: "Sara Qureshi", bio: "Aerospace Engineer & CEO", image: "/Speakers/Sarah Quraishi .png" },
              { name: "Azam Jamil", bio: "Former Minister & Leadership Expert", image: "/Speakers/Azam Jamil.png" },
              { name: "Shahzad Nawaz", bio: "Film Director & Actor", image: "/Speakers/Shahzad nawab.png" },
                { name: "Hisham Sarwar", bio: "Freelancing Industry Pioneer", image: "/Speakers/Hisham Sarwar.jpeg" },
  { name: "Brigadier Edgar Felix (Retired)", bio: "Strategic Defence Leader", image: "/Speakers/Brigadier Edgar Felix .png" },
  { name: "Nasir Majeed Mirza", bio: "Ex-Rector PIEAS & Education Advocate", image: "/Speakers/nasir majeed.jpeg" },
  { name: "Syeda Kashmala", bio: "Climate & Law Changemaker", image: "/Speakers/Syeda Kashmala.png" },
  ,{ name: "Ahmed Asad", bio: "An accomplished engineer from NUST and MBA graduate from LUMS", image: "/Speakers/Ahmed Asad.jpeg" },
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
                   <img
                     src={speaker.image}
                     alt={speaker.name}
                     className="w-full h-full object-cover block"
                   />
                 
                  
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
                {/* <p className="text-white text-sm text-center mt-1">Speaker</p> */}
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
         id="team"
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

          {/* Pyramid Layout */}
          <div className="flex flex-col items-center gap-8">
            {/* top */}
          <div className="flex justify-center w-full">
  {[
   { name: "Mohammed Amir", role: "President", image: "/Tedx OBs/MohammadAmir_President.jpg" },
  ].map((person, idx) => (
    <motion.div
      key={idx}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 sm:p-6 flex flex-col items-center gap-4 min-h-[140px] w-full sm:w-[280px]"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-lg sm:text-xl mb-1 group-hover:text-[#ff0000] transition-colors">
          {person.name}
        </h3>
        <p className="text-white text-sm">{person.role}</p>
      </div>
    </motion.div>
  ))}
</div>

            {/* Top Row - 3 people */}
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
  {[
    { name: "Mohammed Amir", role: "Curator", image: "/Tedx OBs/Muhammad ibrahim_.jpg" },
    { name: "Muhammad Awais", role: "Co Curator", image: "/Tedx OBs/Muhammad Awais_Co-Curator TEDx.jpg" },
    { name: "Mudassar Rehman", role: "Deputy Curator", image: "/Tedx OBs/Mudassar Rehman Deputy Curater.jpg" }
  ].map((person, idx) => (
    <motion.div
      key={idx}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 sm:p-6 flex flex-col items-center gap-4 min-h-[140px] w-[calc(33.333%-16px)] sm:w-[280px]"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-lg sm:text-xl mb-1 group-hover:text-[#ff0000] transition-colors">
          {person.name}
        </h3>
        <p className="text-white text-sm">{person.role}</p>
      </div>
    </motion.div>
  ))}
</div>
      {/* Top Row - 3 people */}
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
  {[
    { name: "Muhammad Taha", role: "Director IT", image: "/Tedx Directors/Muhammad Taha _Director IT.jpg" },
    { name: "Syeda Noreen Rubab", role: "Director PR", image: "/Tedx Directors/Syeda Noreen Rubab _ Director PR_.jpg" },
    { name: "Muhammad Bilal", role: "Director Foreign Affairs", image: "/Tedx Directors/Muhammad Bilal .jpg" }
  ].map((person, idx) => (
    <motion.div
      key={idx}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 sm:p-6 flex flex-col items-center gap-4 min-h-[140px] w-[calc(33.333%-16px)] sm:w-[280px]"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-lg sm:text-xl mb-1 group-hover:text-[#ff0000] transition-colors">
          {person.name}
        </h3>
        <p className="text-white text-sm">{person.role}</p>
      </div>
    </motion.div>
  ))}
</div>

<div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
  {[
    { name: "Mohib Ullah", role: "Director Finance", image: "/Tedx Directors/Mohib Ullah .jpg" },
    { name: "Taha Zafar", role: "Director Management", image: "/Tedx Directors/tahazaffar.jpg" },
    { name: "Salman Mansoor", role: "Director Registration", image: "/Tedx Directors/Salman Mansoor (2).png" }
  ].map((person, idx) => (
    <motion.div
      key={idx}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 sm:p-6 flex flex-col items-center gap-4 min-h-[140px] w-[calc(33.333%-16px)] sm:w-[280px]"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-lg sm:text-xl mb-1 group-hover:text-[#ff0000] transition-colors">
          {person.name}
        </h3>
        <p className="text-white text-sm">{person.role}</p>
      </div>
    </motion.div>
  ))}
</div>
<div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
  {[
    { name: "Hammad Tariq", role: "Representative MME", image: "/DRs/Hammad Tariq, Mme_.jpg" },
    { name: "Shahbaz Ahmed Shah", role: "Representative DEE", image: "/DRs/Shahbaz_Ahmed_Shah_DEE_DR.png" },
  ].map((person, idx) => (
    <motion.div
      key={idx}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 sm:p-6 flex flex-col items-center gap-4 min-h-[140px] w-[calc(33.333%-16px)] sm:w-[280px]"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-lg sm:text-xl mb-1 group-hover:text-[#ff0000] transition-colors">
          {person.name}
        </h3>
        <p className="text-white text-sm">{person.role}</p>
      </div>
    </motion.div>
  ))}
</div>
            {/* Middle Row - 5 people */}
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
              {[
                { name: "Fajar Saleem", role: "Head Web Dev", image: "/Tedx Heads/FajarSaleem_Head Webdev.jpg" },
                { name: "Syed Tahir Ali", role: "Head Transport", image: "/Tedx Heads/Syed Tahir Ali _Head Transport.png" },
                { name: "Rida Aziz", role: "Head Liaison", image: "/Tedx Heads/Rida Aziz_headliaison.jpg" },
                { name: "Momna Tul Jannat", role: "Head Task Force", image: "/Tedx Heads/Momna tul jannat_head_task force.jpg" },
                { name: "Faseeh Hassan", role: "Head Decor", image: "/Tedx Heads/FaseehHassan_HeadDecor.jpg" }

              ].map((person, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 2) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 flex flex-col items-center gap-4 min-h-[140px] w-[calc(33.333%-16px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)]"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
                     <img
                     src={person.image}
                     alt={person.name}
                     className="w-full h-full object-cover block"
                   />
                  </div>
                  <div className="text-center flex-1">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-[#ff0000] transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-white text-xs sm:text-sm">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 5 - 5 people */}
            <div className="flex flex-wrap justify-center gap-5 w-full max-w-6xl">
              {[
                { name: "Muhammad Talha Sadiq", role: "Head Social Media", image: "/Tedx Heads/Muhammad Talha Sadiq _ Head social Media.jpg"  },
                { name: "Taha Mumtaz", role: "Head Security", image: "/Tedx Heads/Taha Mumtaz _ Head Security.jpg" },
                { name: "Mohsan Ali Javed", role: "Head Purchase", image: "/Tedx Heads/Mohsan Ali Javed_Head Purchase .jpg" },
                { name: "Tuba Zareef", role: "Head Documentation", image: "/Tedx Heads/TubaZareef_Headdocumentation.jpg" },
                { name: "Azm ul haq", role: "Head Sponsorship", image: "/Tedx Heads/IMG-20250620-WA0001.jpg" }
              ].map((person, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 6) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-3 sm:p-4 flex flex-col items-center gap-3 min-h-[130px] w-[calc(33.333%-14px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
                     <img
                     src={person.image}
                     alt={person.name}
                     className="w-full h-full object-cover block"
                   />
                  </div>
                  <div className="text-center flex-1">
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1 group-hover:text-[#ff0000] transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-white text-xs">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 6 - 6 people */}
           <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
  {[
    { name: "Muhammad Ali", role: "Head Back Stage", image: "/Tedx Heads/Muhammad Ali _ Head Back Stage_.jpg"  },
    { name: "Zohaib Cheema", role: "Head Mess", image: "/Tedx Heads/Zohaib Cheema_Head Mess.jpg" },
    { name: "Hassam Zahid ", role: "Head Outreach", image: "/Tedx Heads/Hassam Zahid _ Head OutReach.jpg" },
    { name: "Sana Shahzad", role: "Head Registration", image: "/Tedx Heads/Head Registration .jpg" },
    { name: "Ali Ammar Wahla", role: "Head operations", image: "/Tedx Heads/Ali Ammar Wahla- Head operations.jpg" },
    { name: "Umer Farooq", role: "Head Finance", image: "/Tedx Heads/umer farooq.jpg" }
  ].map((person, idx) => (
    <motion.div
      key={idx}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (idx + 6) * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a1a] border-2 border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-4 sm:p-5 flex flex-col items-center gap-4 min-h-[140px] w-[calc(33.333%-16px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)]"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#333333] border-2 border-white flex-shrink-0 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="text-center flex-1 min-w-0">
        <h3 className="text-white font-bold text-sm sm:text-base mb-1 group-hover:text-[#ff0000] transition-colors break-words overflow-hidden">
          {person.name}
        </h3>
        <p className="text-white text-xs sm:text-sm leading-tight break-words overflow-hidden">
          {person.role}
        </p>
      </div>
    </motion.div>
  ))}
</div>

          </div>
        </div>
      </motion.section>
<InstrumentalPerformance /> 
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

      {/* place modal near root of this component so it mounts above everything */}
      {/* <TEDxRegistrationModal isOpen={registrationOpen} onClose={() => setRegistrationOpen(false)} /> */}
    </div>
  );
}