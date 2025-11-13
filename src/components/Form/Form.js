import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TEDxRegistrationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    sex: '',
    email: '',
    dob: '',
    socialProfile: '',
    contactNumber: '',
    cnic: '',
    institute: '',
    major: '',
    ambassadorCode: '',
    whyInLife: '',
    betterCommunity: '',
    tedVideo: '',
    tedVideoUrl: '',
    portfolio: '',
    attendedBefore: '',
    heardFrom: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
    setIsOpen(false);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: `${(currentStep / 3) * 100}%`,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#222222] flex items-center justify-center p-4">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#ff0000] text-white font-bold px-10 py-4 text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
      >
        Register Now
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl lg:max-w-4xl max-h-[90vh] bg-[#1a1a1a] border-4 border-[#ff0000] z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#222222] border-b-2 border-[#ff0000] p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">
                      TEDx<span className="text-[#ff0000]">PIEAS</span> 2025
                    </h2>
                    <p className="text-white text-sm md:text-base">Attendee Registration Form</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-[#ff0000] hover:bg-white hover:text-[#ff0000] transition-all duration-300 flex items-center justify-center border-2 border-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#333333] overflow-hidden">
                  <motion.div
                    variants={progressVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-full bg-[#ff0000]"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white">
                  <span className={currentStep >= 1 ? 'text-[#ff0000] font-bold' : ''}>Basic Info</span>
                  <span className={currentStep >= 2 ? 'text-[#ff0000] font-bold' : ''}>Personal Details</span>
                  <span className={currentStep >= 3 ? 'text-[#ff0000] font-bold' : ''}>Final Questions</span>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Full Name <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Sex <span className="text-[#ff0000]">*</span>
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-white cursor-pointer">
                              <input
                                type="radio"
                                name="sex"
                                value="Male"
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-[#ff0000]"
                              />
                              Male
                            </label>
                            <label className="flex items-center gap-2 text-white cursor-pointer">
                              <input
                                type="radio"
                                name="sex"
                                value="Female"
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-[#ff0000]"
                              />
                              Female
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Email Address <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Date of Birth <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Social Media Profile <span className="text-[#ff0000]">*</span>
                        </label>
                        <p className="text-white/70 text-xs mb-2">Facebook, Twitter, Instagram or LinkedIn</p>
                        <input
                          type="url"
                          name="socialProfile"
                          value={formData.socialProfile}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="https://www.facebook.com/yourprofile"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Contact Number <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                            placeholder="1234-1234567"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            CNIC Number <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="text"
                            name="cnic"
                            value={formData.cnic}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                            placeholder="12345-1234567-1"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Personal Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Institute/Organization <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="text"
                            name="institute"
                            value={formData.institute}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                            placeholder="Your institute or organization"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-bold mb-2 text-sm md:text-base">
                            Major/Department <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="text"
                            name="major"
                            value={formData.major}
                            onChange={handleInputChange}
                            className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                            placeholder="Your major or department"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Ambassador Code
                        </label>
                        <p className="text-white/70 text-xs mb-2">Get a discount if you were referred by an ambassador</p>
                        <input
                          type="text"
                          name="ambassadorCode"
                          value={formData.ambassadorCode}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="Optional ambassador code"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          What's your 'why' in life? <span className="text-[#ff0000]">*</span>
                        </label>
                        <textarea
                          name="whyInLife"
                          value={formData.whyInLife}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300 resize-none"
                          placeholder="Share your purpose and motivation..."
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          How are you helping to create a better community? <span className="text-[#ff0000]">*</span>
                        </label>
                        <textarea
                          name="betterCommunity"
                          value={formData.betterCommunity}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300 resize-none"
                          placeholder="Describe your contributions..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Final Questions */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Which TED video had the greatest impact on you? <span className="text-[#ff0000]">*</span>
                        </label>
                        <textarea
                          name="tedVideo"
                          value={formData.tedVideo}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300 resize-none"
                          placeholder="Tell us about the TED video that inspired you..."
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          TED Video URL <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="url"
                          name="tedVideoUrl"
                          value={formData.tedVideoUrl}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="https://www.ted.com/talks/..."
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Blog or Portfolio
                        </label>
                        <p className="text-white/70 text-xs mb-2">We'd love to see your work!</p>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Have you attended TEDxPIEAS before? <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                              type="radio"
                              name="attendedBefore"
                              value="Yes"
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-[#ff0000]"
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                              type="radio"
                              name="attendedBefore"
                              value="No"
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-[#ff0000]"
                            />
                            No
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Where did you hear about us? <span className="text-[#ff0000]">*</span>
                        </label>
                        <select
                          name="heardFrom"
                          value={formData.heardFrom}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                        >
                          <option value="">Select an option</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Snapchat">Snapchat</option>
                          <option value="Tumblr">Tumblr</option>
                          <option value="Friend">Friend</option>
                        </select>
                      </div>

                      <div className="bg-[#222222] border-2 border-[#ff0000] p-4 mt-6">
                        <p className="text-white text-xs leading-relaxed">
                          By submitting this form, you accept the terms and conditions of TEDxPIEAS 2025. 
                          Your invitation is non-transferable. Deadline: November 3rd. Only selected attendees 
                          will receive an email invitation.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Navigation */}
              <div className="bg-[#222222] border-t-2 border-[#ff0000] p-4 md:p-6">
                <div className="flex justify-between gap-4">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-transparent text-white font-bold px-6 py-3 text-sm md:text-base uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#222222] transition-all duration-300"
                    >
                      ← Previous
                    </motion.button>
                  )}
                  
                  {currentStep < 3 ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#ff0000] text-white font-bold px-6 py-3 text-sm md:text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
                    >
                      Next →
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#ff0000] text-white font-bold px-6 py-3 text-sm md:text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
                    >
                      Submit Registration
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Controlled modal (named export) so parent can open/close it
export function TEDxRegistrationModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    fullName: '',
    sex: '',
    email: '',
    dob: '',
    socialProfile: '',
    contactNumber: '',
    cnic: '',
    institute: '',
    major: '',
    ambassadorCode: '',
    whyInLife: '',
    betterCommunity: '',
    tedVideo: '',
    tedVideoUrl: '',
    portfolio: '',
    attendedBefore: '',
    heardFrom: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const nextStep = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
    onClose?.();
  };

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
  };
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { width: `${(currentStep / 3) * 100}%`, transition: { duration: 0.5, ease: 'easeInOut' } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl lg:max-w-4xl max-h-[90vh] bg-[#1a1a1a] border-4 border-[#ff0000] z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#222222] border-b-2 border-[#ff0000] p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">
                    TEDx<span className="text-[#ff0000]">PIEAS</span> 2025
                  </h2>
                  <p className="text-white text-sm md:text-base">Attendee Registration Form</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-[#ff0000] hover:bg-white hover:text-[#ff0000] transition-all duration-300 flex items-center justify-center border-2 border-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#333333] overflow-hidden">
                <motion.div
                  variants={progressVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-full bg-[#ff0000]"
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-white">
                <span className={currentStep >= 1 ? 'text-[#ff0000] font-bold' : ''}>Basic Info</span>
                <span className={currentStep >= 2 ? 'text-[#ff0000] font-bold' : ''}>Personal Details</span>
                <span className={currentStep >= 3 ? 'text-[#ff0000] font-bold' : ''}>Final Questions</span>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Full Name <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Sex <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                              type="radio"
                              name="sex"
                              value="Male"
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-[#ff0000]"
                            />
                            Male
                          </label>
                          <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                              type="radio"
                              name="sex"
                              value="Female"
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-[#ff0000]"
                            />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Email Address <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Date of Birth <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        Social Media Profile <span className="text-[#ff0000]">*</span>
                      </label>
                      <p className="text-white/70 text-xs mb-2">Facebook, Twitter, Instagram or LinkedIn</p>
                      <input
                        type="url"
                        name="socialProfile"
                        value={formData.socialProfile}
                        onChange={handleInputChange}
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                        placeholder="https://www.facebook.com/yourprofile"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Contact Number <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="1234-1234567"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          CNIC Number <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="cnic"
                          value={formData.cnic}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="12345-1234567-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Institute/Organization <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="institute"
                          value={formData.institute}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="Your institute or organization"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Major/Department <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="major"
                          value={formData.major}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="Your major or department"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        Ambassador Code
                      </label>
                      <p className="text-white/70 text-xs mb-2">Get a discount if you were referred by an ambassador</p>
                      <input
                        type="text"
                        name="ambassadorCode"
                        value={formData.ambassadorCode}
                        onChange={handleInputChange}
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                        placeholder="Optional ambassador code"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        What's your 'why' in life? <span className="text-[#ff0000]">*</span>
                      </label>
                      <textarea
                        name="whyInLife"
                        value={formData.whyInLife}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300 resize-none"
                        placeholder="Share your purpose and motivation..."
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        How are you helping to create a better community? <span className="text-[#ff0000]">*</span>
                      </label>
                      <textarea
                        name="betterCommunity"
                        value={formData.betterCommunity}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300 resize-none"
                        placeholder="Describe your contributions..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Final Questions */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        Which TED video had the greatest impact on you? <span className="text-[#ff0000]">*</span>
                      </label>
                      <textarea
                        name="tedVideo"
                        value={formData.tedVideo}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300 resize-none"
                        placeholder="Tell us about the TED video that inspired you..."
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        TED Video URL <span className="text-[#ff0000]">*</span>
                      </label>
                      <input
                        type="url"
                        name="tedVideoUrl"
                        value={formData.tedVideoUrl}
                        onChange={handleInputChange}
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                        placeholder="https://www.ted.com/talks/..."
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        Blog or Portfolio
                      </label>
                      <p className="text-white/70 text-xs mb-2">We'd love to see your work!</p>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        Have you attended TEDxPIEAS before? <span className="text-[#ff0000]">*</span>
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                          <input
                            type="radio"
                            name="attendedBefore"
                            value="Yes"
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-[#ff0000]"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                          <input
                            type="radio"
                            name="attendedBefore"
                            value="No"
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-[#ff0000]"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-sm md:text-base">
                        Where did you hear about us? <span className="text-[#ff0000]">*</span>
                      </label>
                      <select
                        name="heardFrom"
                        value={formData.heardFrom}
                        onChange={handleInputChange}
                        className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                      >
                        <option value="">Select an option</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Snapchat">Snapchat</option>
                        <option value="Tumblr">Tumblr</option>
                        <option value="Friend">Friend</option>
                      </select>
                    </div>

                    <div className="bg-[#222222] border-2 border-[#ff0000] p-4 mt-6">
                      <p className="text-white text-xs leading-relaxed">
                        By submitting this form, you accept the terms and conditions of TEDxPIEAS 2025. 
                        Your invitation is non-transferable. Deadline: November 3rd. Only selected attendees 
                        will receive an email invitation.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="bg-[#222222] border-t-2 border-[#ff0000] p-4 md:p-6">
              <div className="flex justify-between gap-4">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-transparent text-white font-bold px-6 py-3 text-sm md:text-base uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#222222] transition-all duration-300"
                  >
                    ← Previous
                  </motion.button>
                )}
                
                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#ff0000] text-white font-bold px-6 py-3 text-sm md:text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
                  >
                    Next →
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#ff0000] text-white font-bold px-6 py-3 text-sm md:text-base uppercase tracking-widest border-2 border-[#ff0000] hover:bg-transparent hover:text-[#ff0000] transition-all duration-300"
                  >
                    Submit Registration
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}