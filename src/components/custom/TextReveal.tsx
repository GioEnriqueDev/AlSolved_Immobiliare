import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

const TextReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    once = true,
}: TextRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{
                    duration,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    once?: boolean;
}

export const SplitText = ({
    text,
    className = '',
    delay = 0,
    stagger = 0.03,
    once = true,
}: SplitTextProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const words = text.split(' ');

    return (
        <div ref={ref} className={`flex flex-wrap ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="overflow-hidden mr-[0.25em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', opacity: 0, rotateX: -90 }}
                        animate={
                            isInView
                                ? { y: 0, opacity: 1, rotateX: 0 }
                                : { y: '100%', opacity: 0, rotateX: -90 }
                        }
                        transition={{
                            duration: 0.6,
                            delay: delay + wordIndex * stagger,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    );
};

interface CountUpProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export const CountUp = ({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
}: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span ref={ref} className={className}>
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            >
                {prefix}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {isInView && (
                        <Counter from={0} to={end} duration={duration} />
                    )}
                </motion.span>
                {suffix}
            </motion.span>
        </span>
    );
};

const Counter = ({ from, to, duration }: { from: number; to: number; duration: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);

    return (
        <motion.span
            ref={nodeRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onAnimationComplete={() => {
                    if (nodeRef.current) {
                        const startTime = performance.now();
                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / (duration * 1000), 1);
                            const easeProgress = 1 - Math.pow(1 - progress, 3);
                            const value = Math.floor(from + (to - from) * easeProgress);
                            if (nodeRef.current) {
                                nodeRef.current.textContent = value.toLocaleString();
                            }
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        };
                        requestAnimationFrame(animate);
                    }
                }}
            >
                {from}
            </motion.span>
        </motion.span>
    );
};

export default TextReveal;
