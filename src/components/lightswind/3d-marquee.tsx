"use client";

import { motion } from "framer-motion";
import React from "react";

export interface MarqueeImage {
  src: string;
  alt: string;
  name?: string;
  designation?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number; // default is 4
  onImageClick?: (image: MarqueeImage, index: number) => void;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
}) => {
  // Clone the image list twice
  const duplicatedImages = [...images, ...images];

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <section
      className={`mx-auto block h-[600px] max-sm:h-[400px] 
        overflow-hidden rounded-2xl bg-white dark:bg-[#222222] ${className}`}
    >
      <div
        className="flex w-full h-full items-center justify-center"
        style={{
          transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)",
        }}
      >
        <div className="w-full overflow-hidden scale-90 sm:scale-100">
          <div
            className={`relative grid h-full w-full origin-center 
              grid-cols-2 sm:grid-cols-${cols} gap-4 transform 
              `}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={`column-${idx}`}
                animate={{ y: idx % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: idx % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center gap-6 relative"
              >
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;

                  return (
                    <div key={`img-${imgIdx}`} className="relative">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full max-w-[200px]"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          width={970}
                          height={700}
                          className={`aspect-[970/700] w-full rounded-lg object-cover ring ring-gray-300/30 dark:ring-gray-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                            isClickable ? "cursor-pointer" : ""
                          }`}
                          onClick={() => handleImageClick(image, globalIndex)}
                        />
                        {(image.name || image.designation) && (
                          <div className="mt-3 text-center bg-[#1a1a1a] border-2 border-[#2a2a2a] p-3 rounded-lg">
                            {image.name && (
                              <h3 className="text-white font-bold text-base">
                                {image.name}
                              </h3>
                            )}
                            {image.designation && (
                              <p className="text-gray-400 text-sm mt-1">
                                {image.designation}
                              </p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};