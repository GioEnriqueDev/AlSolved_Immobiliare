import { useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
    style?: CSSProperties;
}

const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(201, 144, 46, 0.25)',
    style,
}: SpotlightCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            style={style}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />

            {/* Border glow on hover */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-[inherit]"
                style={{
                    opacity: isHovered ? 1 : 0,
                    boxShadow: `inset 0 0 0 1px rgba(201, 144, 46, 0.3)`,
                }}
            />

            {children}
        </motion.div>
    );
};

export default SpotlightCard;
