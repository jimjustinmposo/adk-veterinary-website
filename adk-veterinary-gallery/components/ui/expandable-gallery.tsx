"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
}

export const DEFAULT_PHOTOS: GalleryPhoto[] = [
  { id: "photo-1", src: "/images/image1-1.jpeg", alt: "Alpha Delta Veterinary Clinic photo 1", rotation: -15, x: -90, y: 10, zIndex: 10 },
  { id: "photo-2", src: "/images/image1-2.jpeg", alt: "Alpha Delta Veterinary Clinic photo 2", rotation: -3, x: -10, y: -15, zIndex: 20 },
  { id: "photo-3", src: "/images/image1-3.jpeg", alt: "Alpha Delta Veterinary Clinic photo 3", rotation: 12, x: 75, y: 5, zIndex: 30 },
  { id: "photo-4", src: "/images/image1-4.jpeg", alt: "Alpha Delta Veterinary Clinic photo 4" },
  { id: "photo-5", src: "/images/image1-5.jpeg", alt: "Alpha Delta Veterinary Clinic photo 5" },
  { id: "photo-6", src: "/images/image1-6.jpeg", alt: "Alpha Delta Veterinary Clinic photo 6" },
  { id: "photo-7", src: "/images/image1-7.jpeg", alt: "Alpha Delta Veterinary Clinic photo 7" },
  { id: "photo-8", src: "/images/image1-8.jpeg", alt: "Alpha Delta Veterinary Clinic photo 8" },
  { id: "photo-9", src: "/images/image1-9.jpeg", alt: "Alpha Delta Veterinary Clinic photo 9" },
];

const transition = { type: "spring", stiffness: 160, damping: 18, mass: 1 } as const;

interface ExpandableGalleryProps {
  photos?: GalleryPhoto[];
  headline?: string;
  buttonLabel?: string;
}

export function ExpandableGallery({
  photos = DEFAULT_PHOTOS,
  headline = "Care, compassion, and a closer look at our clinic.",
  buttonLabel = "Explore our clinic",
}: ExpandableGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wasExpanded = useRef(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const closeGallery = useCallback(() => setIsExpanded(false), []);

  useEffect(() => {
    if (wasExpanded.current && !isExpanded) toggleRef.current?.focus();
    wasExpanded.current = isExpanded;
  }, [isExpanded]);

  useOutsideClick(containerRef, () => {
    if (isExpanded) closeGallery();
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-[760px] w-full flex-col items-center justify-start overflow-hidden bg-background px-4 py-10 text-foreground md:px-8">
        <LayoutGroup id={layoutGroupId}>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="mb-2 flex h-12 w-full items-center justify-between px-4">
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    key="back-button"
                    ref={backRef}
                    type="button"
                    aria-label="Go back to the stacked photo preview"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                    aria-expanded="true"
                    onClick={closeGallery}
                    className="group z-50 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="rounded-full bg-muted p-2 text-foreground transition-colors group-hover:bg-accent">
                      <HugeiconsIcon icon={ArrowLeft01Icon} width={20} height={20} aria-hidden="true" />
                    </span>
                    <span className="font-medium">Go back</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              ref={containerRef}
              layout
              className={cn(
                "relative w-full",
                isExpanded
                  ? "grid grid-cols-2 gap-4 px-2 md:grid-cols-3 md:gap-8 md:px-4"
                  : "flex flex-col items-center justify-start pt-4",
              )}
              transition={transition}
              onKeyDown={(event) => {
                if (event.key === "Escape" && isExpanded) {
                  event.stopPropagation();
                  closeGallery();
                }
              }}
            >
              <div className={cn("relative", isExpanded ? "contents" : "mb-8 flex h-[340px] w-full items-center justify-center md:h-[450px]")}>
                {photos.map((photo, index) => {
                  const isPrimary = index < 3;
                  if (!isPrimary && !isExpanded) return null;
                  return (
                    <motion.div
                      key={photo.id}
                      layoutId={`card-container-${photo.id}`}
                      layout
                      role={!isExpanded ? "button" : undefined}
                      tabIndex={!isExpanded ? 0 : undefined}
                      aria-label={!isExpanded ? `Open photo gallery from ${photo.alt}` : undefined}
                      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: !isExpanded && !shouldReduceMotion ? photo.rotation ?? 0 : 0,
                        x: !isExpanded && !shouldReduceMotion ? photo.x ?? 0 : 0,
                        y: !isExpanded && !shouldReduceMotion ? photo.y ?? 0 : 0,
                        zIndex: !isExpanded ? photo.zIndex ?? index : 10,
                      }}
                      transition={transition}
                      whileHover={!shouldReduceMotion ? (!isExpanded ? { scale: 1.05, y: (photo.y ?? 0) - 15, rotate: (photo.rotation ?? 0) * 0.8, zIndex: 50, transition: { type: "spring", stiffness: 400, damping: 25 } } : { scale: 1.02 }) : undefined}
                      className={cn(
                        "cursor-pointer overflow-hidden border-background bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
                        isExpanded
                          ? "relative aspect-square rounded-2xl border-4 shadow-lg md:rounded-[3rem] md:border-[6px]"
                          : "absolute h-44 w-44 rounded-[2rem] border-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:h-60 md:w-60 md:rounded-[3rem]",
                      )}
                      onClick={() => { if (!isExpanded) setIsExpanded(true); }}
                      onKeyDown={(event) => {
                        if (!isExpanded && (event.key === "Enter" || event.key === " ")) {
                          event.preventDefault();
                          setIsExpanded(true);
                        }
                      }}
                    >
                      <motion.span layoutId={`image-inner-${photo.id}`} layout="position" className="relative block h-full w-full" transition={transition}>
                        <Image src={photo.src} alt={photo.alt} fill className="pointer-events-none select-none object-cover" sizes={isExpanded ? "(max-width: 768px) 50vw, 33vw" : "240px"} priority={isPrimary} />
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {!isExpanded && (
                  <motion.div
                    key="stack-content"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-2xl space-y-8 text-center"
                  >
                    <h2 className="text-2xl leading-tight font-normal tracking-tight text-foreground/90 md:text-4xl">{headline}</h2>
                    <div className="flex justify-center">
                      <Button
                        ref={toggleRef}
                        variant="default"
                        aria-label={buttonLabel}
                        aria-expanded={isExpanded}
                        aria-controls="gallery-photo-grid"
                        onClick={() => setIsExpanded(true)}
                        className="group cursor-pointer rounded-full border-border/40 px-8 py-6 font-normal"
                      >
                        {buttonLabel}
                        <HugeiconsIcon icon={ArrowRight01Icon} className="transition-transform group-hover:translate-x-1" width={20} height={20} aria-hidden="true" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </LayoutGroup>
        <div id="gallery-photo-grid" className="sr-only" aria-live="polite">
          {isExpanded ? `All ${photos.length} clinic photos are shown.` : "Three clinic photos are previewed."}
        </div>
      </section>
    </MotionConfig>
  );
}

export default ExpandableGallery;