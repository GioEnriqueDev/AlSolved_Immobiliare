import { useRef, useState, type MouseEvent, type ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';

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

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
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
    setPosition({ x: 0, y: 0 });
  };

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
    const { href, ...anchorProps } = props;

    return (
      <motion.a ref={anchorRef} href={href} {...sharedMotionProps} {...anchorProps}>
        {children}
      </motion.a>
    );
  }

  const buttonType = getSafeButtonType(props.type);

  return (
    <motion.button ref={buttonRef} {...sharedMotionProps} {...props} type={buttonType}>
      {children}
    </motion.button>
  );
};

export default MagneticButton;
