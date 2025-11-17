import React, { useEffect, useState } from 'react';

export default function InstrumentalPerformance() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black via-50% to-red-900"></div>
      
      {/* Animated mesh gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.4) 0%, transparent 50%)`
        }}
      ></div>

      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Floating musical notes - more dynamic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-600 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 40}px`
            }}
          >
            {i % 3 === 0 ? '♪' : i % 3 === 1 ? '♫' : '♬'}
          </div>
        ))}
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-scan"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Section - Image */}
          <div className="lg:col-span-4 relative h-64 sm:h-80 lg:h-[600px] overflow-hidden rounded-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent z-10"></div>
            <img 
              src="/phonograph.png" 
              alt="Musical Performance" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20"></div>
            
            {/* Glassmorphism card overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 z-30">
              <p className="text-white font-semibold text-sm sm:text-base">Live Performance</p>
              <p className="text-red-400 text-xs sm:text-sm">Exclusive Event</p>
            </div>
          </div>

          {/* Center Content - Main Announcement */}
          <div className="lg:col-span-4 text-center px-4 sm:px-8 py-8 sm:py-12 lg:py-16 relative flex items-center justify-center">
            <div className="relative z-10 w-full">
              {/* Glowing title */}
              <div className="mb-6 sm:mb-8 flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-widest uppercase relative inline-block">
                  <span className="relative z-10">INSTRUMENTAL</span>
                  <div className="absolute inset-0 blur-2xl bg-red-600 opacity-50 animate-pulse"></div>
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 tracking-widest uppercase animate-gradient">
                  PERFORMANCE
                </h3>
              </div>

              {/* Musical notes decoration - responsive */}
              <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-red-600 text-3xl opacity-80">
                <span className="animate-bounce">♪</span>
                <span className="animate-bounce" style={{animationDelay: '0.2s'}}>♫</span>
                <span className="animate-bounce" style={{animationDelay: '0.4s'}}>♬</span>
              </div>

              {/* TEDx Logo with glow */}
              <div className="mb-6 sm:mb-8">
                <p className="text-white/70 text-sm mb-2">presented by</p>
                <h4 className="text-3xl sm:text-4xl font-black text-white tracking-wider relative inline-block">
                  TEDx<span className="text-red-600">PIEAS</span>
                  <div className="absolute -inset-1 bg-red-600 blur-xl opacity-30"></div>
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto">
                Experience the fusion of musical mastery and innovative ideas in an unforgettable evening
              </p>

              {/* CTA Button - more dynamic */}
              <button className="relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-base tracking-widest uppercase transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden group rounded-full">
                <span className="relative z-10">STAY TUNED</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>

              {/* Pulse ring effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-red-600 rounded-full opacity-20 animate-ping pointer-events-none"></div>
            </div>
          </div>

          {/* Right Section - Image with enhanced effects */}
          <div className="lg:col-span-4 relative h-64 sm:h-80 lg:h-[600px] overflow-hidden rounded-2xl group">
            <div className="absolute inset-0 bg-gradient-to-bl from-red-600/20 to-transparent z-10"></div>
            <img 
              src="/piano.png" 
              alt="Piano Performance" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 z-20"></div>
            
            {/* Animated musical notes around image */}
            <div className="absolute top-8 sm:top-10 right-6 sm:right-8 text-4xl sm:text-5xl text-red-600 animate-float opacity-80 drop-shadow-2xl z-30">♪</div>
            <div className="absolute top-24 sm:top-32 right-3 sm:right-4 text-3xl sm:text-4xl text-red-500 animate-float opacity-60 drop-shadow-2xl z-30" style={{animationDelay: '0.5s'}}>♫</div>
            <div className="absolute top-16 sm:top-20 left-3 sm:left-4 text-5xl sm:text-6xl text-red-600 animate-float opacity-70 drop-shadow-2xl z-30" style={{animationDelay: '1s'}}>♬</div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-red-600/50 to-transparent z-30"></div>
          </div>

        </div>

        {/* Bottom accent line */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex justify-center">
          <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-30px) translateX(10px) rotate(10deg); 
          }
          66% { 
            transform: translateY(-15px) translateX(-10px) rotate(-10deg); 
          }
        }
        
        @keyframes scan {
          0% { 
            transform: translateY(-100vh); 
          }
          100% { 
            transform: translateY(100vh); 
          }
        }
        
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}