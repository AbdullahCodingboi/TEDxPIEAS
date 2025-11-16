import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TEDxRegistrationModal({ isOpen = false, onClose = () => {} }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    university: '',
    email: '',
    cnic: '',
    phone: '',
    cnicFront: null,
    cnicBack: null
  });
  const [errors, setErrors] = useState({});
  const [previewUrls, setPreviewUrls] = useState({
    front: null,
    back: null
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    } else {
      // when modal closes, clear previews & files to avoid leaking objectURLs
      if (previewUrls.front) {
        URL.revokeObjectURL(previewUrls.front);
      }
      if (previewUrls.back) {
        URL.revokeObjectURL(previewUrls.back);
      }
      setPreviewUrls({ front: null, back: null });
      setFormData({
        fullName: '',
        university: '',
        email: '',
        cnic: '',
        phone: '',
        cnicFront: null,
        cnicBack: null
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (previewUrls.front) URL.revokeObjectURL(previewUrls.front);
      if (previewUrls.back) URL.revokeObjectURL(previewUrls.back);
    };
  }, [previewUrls.front, previewUrls.back]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // clear error on change
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const fieldName = side === 'front' ? 'cnicFront' : 'cnicBack';
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      // revoke previous if exists
      if (previewUrls[side]) URL.revokeObjectURL(previewUrls[side]);
      setPreviewUrls(prev => ({ ...prev, [side]: url }));
    }
  };

  const nextStep = () => {
    // validate step 1 required fields
    if (currentStep === 1) {
      const newErrors = {};
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.university.trim()) newErrors.university = 'University / Institute is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else {
        // basic email check
        const re = /\S+@\S+\.\S+/;
        if (!re.test(formData.email)) newErrors.email = 'Enter a valid email';
      }
      if (!formData.cnic.trim()) newErrors.cnic = 'CNIC number is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
    }
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // final validation (ensure CNIC images uploaded)
    const newErrors = {};
    if (!formData.cnicFront) newErrors.cnicFront = 'CNIC front image is required';
    if (!formData.cnicBack) newErrors.cnicBack = 'CNIC back image is required';

    // also ensure no pending errors from step1
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.university.trim()) newErrors.university = 'University / Institute is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC number is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // jump to first step if missing basic info
      if (newErrors.fullName || newErrors.university || newErrors.email || newErrors.cnic || newErrors.phone) {
        setCurrentStep(1);
      } else {
        setCurrentStep(2);
      }
      return;
    }

    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
    // clean up preview URLs
    if (previewUrls.front) {
      URL.revokeObjectURL(previewUrls.front);
    }
    if (previewUrls.back) {
      URL.revokeObjectURL(previewUrls.back);
    }
    setPreviewUrls({ front: null, back: null });
    onClose?.();
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
      width: `${(currentStep / 2) * 100}%`,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => onClose?.()}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl max-h-[90vh] bg-[#1a1a1a] border-4 border-[#ff0000] z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#222222] border-b-2 border-[#ff0000] p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">
                      TEDx<span className="text-[#ff0000]">PIEAS</span> 2025
                    </h2>
                    <p className="text-white text-sm md:text-base">Attendee Registration</p>
                  </div>
                  <button
                    onClick={() => onClose?.()}
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
                  <span className={currentStep >= 2 ? 'text-[#ff0000] font-bold' : ''}>CNIC Upload</span>
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
                      className="space-y-6"
                    >
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
                        {errors.fullName && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          University/Institute <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="Enter your university"
                        />
                        {errors.university && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.university}</p>
                        )}
                      </div>

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
                        {errors.email && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.email}</p>
                        )}
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
                        {errors.cnic && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.cnic}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2 text-sm md:text-base">
                          Phone Number <span className="text-[#ff0000]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[#222222] border-2 border-[#333333] focus:border-[#ff0000] text-white p-3 outline-none transition-all duration-300"
                          placeholder="03XX-XXXXXXX"
                        />
                        {errors.phone && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: CNIC Upload */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-white font-bold mb-3 text-sm md:text-base">
                          CNIC Front Side <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="border-2 border-dashed border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-6 text-center bg-[#222222]">
                          {previewUrls.front ? (
                            <div className="space-y-3">
                              <img 
                                src={previewUrls.front} 
                                alt="CNIC Front" 
                                className="max-h-48 mx-auto border-2 border-[#ff0000]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, cnicFront: null }));
                                  if (previewUrls.front) URL.revokeObjectURL(previewUrls.front);
                                  setPreviewUrls(prev => ({ ...prev, front: null }));
                                }}
                                className="text-[#ff0000] hover:text-white transition-colors text-sm"
                              >
                                Remove Image
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-12 h-12 mx-auto mb-3 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-white mb-2">Click to upload CNIC front</p>
                              <p className="text-white/50 text-xs">JPG, PNG or PDF (Max 5MB)</p>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'front')}
                            className="hidden"
                            id="cnic-front"
                          />
                          {!previewUrls.front && (
                            <label
                              htmlFor="cnic-front"
                              className="inline-block mt-3 bg-[#ff0000] text-white font-bold px-6 py-2 text-sm uppercase tracking-wider cursor-pointer hover:bg-white hover:text-[#ff0000] border-2 border-[#ff0000] transition-all duration-300"
                            >
                              Choose File
                            </label>
                          )}
                        </div>
                        {errors.cnicFront && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.cnicFront}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-3 text-sm md:text-base">
                          CNIC Back Side <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="border-2 border-dashed border-[#333333] hover:border-[#ff0000] transition-all duration-300 p-6 text-center bg-[#222222]">
                          {previewUrls.back ? (
                            <div className="space-y-3">
                              <img 
                                src={previewUrls.back} 
                                alt="CNIC Back" 
                                className="max-h-48 mx-auto border-2 border-[#ff0000]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, cnicBack: null }));
                                  if (previewUrls.back) URL.revokeObjectURL(previewUrls.back);
                                  setPreviewUrls(prev => ({ ...prev, back: null }));
                                }}
                                className="text-[#ff0000] hover:text-white transition-colors text-sm"
                              >
                                Remove Image
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-12 h-12 mx-auto mb-3 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-white mb-2">Click to upload CNIC back</p>
                              <p className="text-white/50 text-xs">JPG, PNG or PDF (Max 5MB)</p>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'back')}
                            className="hidden"
                            id="cnic-back"
                          />
                          {!previewUrls.back && (
                            <label
                              htmlFor="cnic-back"
                              className="inline-block mt-3 bg-[#ff0000] text-white font-bold px-6 py-2 text-sm uppercase tracking-wider cursor-pointer hover:bg-white hover:text-[#ff0000] border-2 border-[#ff0000] transition-all duration-300"
                            >
                              Choose File
                            </label>
                          )}
                        </div>
                        {errors.cnicBack && (
                          <p className="text-[#ff0000] text-xs mt-1">{errors.cnicBack}</p>
                        )}
                      </div>

                      <div className="bg-[#222222] border-2 border-[#ff0000] p-4 mt-6">
                        <p className="text-white text-xs leading-relaxed">
                          Please ensure your CNIC images are clear and all details are readable. 
                          Your information will be kept confidential and used only for registration purposes.
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
                  
                  {currentStep < 2 ? (
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
    </>
  );
}