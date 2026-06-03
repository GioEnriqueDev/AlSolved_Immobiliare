import { useRef, useState, type MouseEvent, type ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/use-mobile';

type EventConflictProps =
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragCapture'
  | 'onDragStartCapture'
  | 'onDragEndCapture'
  | 'onDragEnterCapture'
  | 'onDragLeaveCapture'
  | 'onDragOverCapture';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

type AnchorVariant = BaseButtonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className' | EventConflictProps> & {
    href: string;
  };

type ButtonVariant = BaseButtonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className' | EventConflictProps> & {
    href?: undefined;
  };

type MagneticButtonProps = AnchorVariant | ButtonVariant;

const isAnchor = (props: MagneticButtonProps): props is AnchorVariant =>
  typeof (props as AnchorVariant).href === 'string';

const getSafeButtonType = (type?: string): 'button' | 'reset' | 'submit' =>
  type === 'submit' || type === 'reset' ? type : 'button';

const MagneticButton = (props: MagneticButtonProps) => {
  const { children, className = '', strength = 0.3 } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isTouchDevice = useIsTouch();
  const prefersReducedMotion = usePrefersReducedMotion();
  const disableMagnetism = isTouchDevice || prefersReducedMotion;

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (disableMagnetism) return;

    const ref = event.currentTarget;
    if (!ref) return;

    const rect = ref.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPosition({
      x: (event.clientX - centerX) * strength,
      y: (event.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    if (disableMagnetism) return;
    setPosition({ x: 0, y: 0 });
  };

  // On touch devices, render plain <a>/<button> without framer-motion wrapping
  // to avoid any animation interference with native tap handling
  if (disableMagnetism) {
    if (isAnchor(props)) {
      const { href, strength: _s, ...anchorProps } = props;
      return (
        <a
          ref={anchorRef}
          href={href}
          className={`relative overflow-hidden ${className}`}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const { strength: _s, ...buttonProps } = props;
    const buttonType = getSafeButtonType(props.type);
    return (
      <button
        ref={buttonRef}
        className={`relative overflow-hidden ${className}`}
        {...buttonProps}
        type={buttonType}
      >
        {children}
      </button>
    );
  }

  // Desktop: use framer-motion for magnetic effect
  const sharedMotionProps = {
    className: `relative overflow-hidden ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 350, damping: 15, mass: 0.5 },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (isAnchor(props)) {
    const { href, strength: _s, ...anchorProps } = props;

    return (
      <motion.a ref={anchorRef} href={href} {...sharedMotionProps} {...anchorProps}>
        {children}
      </motion.a>
    );
  }

  const { strength: _s, ...buttonProps } = props;
  const buttonType = getSafeButtonType(props.type);

  return (
    <motion.button ref={buttonRef} {...sharedMotionProps} {...buttonProps} type={buttonType}>
      {children}
    </motion.button>
  );
};

export default MagneticButton;
