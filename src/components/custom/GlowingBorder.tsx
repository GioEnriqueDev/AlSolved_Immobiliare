import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlowingBorderProps {
    children: ReactNode;
    className?: string;
    borderRadius?: string;
    glowColor?: string;
    borderWidth?: number;
    animationDuration?: number;
}

const GlowingBorder = ({
    children,
    className = '',
    borderRadius = '1.5rem',
    glowColor = '#c9902e',
    borderWidth = 2,
    animationDuration = 3,
}: GlowingBorderProps) => {
    return (
        <div
            className={`relative ${className}`}
            style={{ borderRadius }}
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0 rounded-[inherit] p-[2px]"
                style={{
                    background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
                    backgroundSize: '200% 100%',
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div
                    className="absolute inset-[1px] bg-charcoal-950 rounded-[inherit]"
                    style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
                />
            </motion.div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-[inherit] blur-xl opacity-30"
                style={{
                    background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
                    backgroundSize: '200% 100%',
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default GlowingBorder;
