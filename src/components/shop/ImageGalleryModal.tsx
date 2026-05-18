"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  alt?: string;
};

export function ImageGalleryModal({ images, initialIndex = 0, open, onClose, alt = "Imagem do produto" }: Props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (open) setActiveIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, images.length, activeIndex]);

  const next = useCallback(() => {
    if (images.length > 1) setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length > 1) setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  if (!images.length) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 z-10 size-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="size-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Anterior"
                className="absolute left-2 sm:left-4 z-10 size-10 sm:size-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Proximo"
                className="absolute right-2 sm:right-4 z-10 size-10 sm:size-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-full max-w-4xl max-h-[80vh] mx-4 flex items-center justify-center"
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} ${activeIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={`size-12 sm:size-14 rounded-lg overflow-hidden border-2 transition ${
                    i === activeIndex ? "border-primary shadow-glow" : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Miniatura ${i + 1}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
