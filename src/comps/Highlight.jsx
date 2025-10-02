import { Box } from "@mui/material";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMotionValue, motion, useMotionTemplate, useAnimation, useInView } from "framer-motion";

export function cn(...inputs) { return twMerge(clsx(inputs)); }

export const AnimatedHeroHighlight = ({ children, className, containerClassName, }) => { let mouseX = useMotionValue(0); let mouseY = useMotionValue(0); function handleMouseMove({ currentTarget, clientX, clientY, }) { if (!currentTarget) return; let { left, top } = currentTarget.getBoundingClientRect(); mouseX.set(clientX - left); mouseY.set(clientY - top); } return ( <Box className={cn( "relative group", containerClassName )} onMouseMove={handleMouseMove} > <Box className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" /> <motion.div className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" style={{ WebkitMaskImage: useMotionTemplate` radial-gradient( 200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100% ) `, maskImage: useMotionTemplate` radial-gradient( 200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100% ) `, }} /> <Box className={cn("relative", className)}>{children}</Box> </Box> ); };

export const AnimatedHighlight = ({ children, className }) => {
    const controls = useAnimation();
    const location = useLocation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });

    useEffect(() => {
        if (isInView) {
            controls.start({
                backgroundSize: "100% 100%",
                transition: { duration: 2, ease: "linear", delay: 0.5 },
            });
        } else {
            controls.start({ backgroundSize: "0% 100%" });
        }
    }, [isInView, location.pathname, controls]);

    return (
        <motion.span
            ref={ref}
            initial={{ backgroundSize: "0% 100%" }}
            animate={controls}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            className={cn(
                `relative inline-block pb-1 px-2 rounded-lg bg-gradient-to-r from-[#b4afd2] to-[#8b7fa6]`,
                className
            )}
        >
            <span className="highlight-text-wrapper">{children}</span>
        </motion.span>
    );
};

export function ContainerTextFlip({ words = ["better", "modern", "beautiful", "awesome"], interval = 2000, className, }) { const [currentWordIndex, setCurrentWordIndex] = useState(0); useEffect(() => { const intervalId = setInterval(() => { setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); }, interval); return () => clearInterval(intervalId); }, [words, interval]); return ( <Box className={cn("inline-flex items-center", className)}> <Box className="flip-text-container"> <motion.div key={words[currentWordIndex]} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5, ease: "easeInOut" }} > {words[currentWordIndex]} </motion.div> </Box> </Box> ); }