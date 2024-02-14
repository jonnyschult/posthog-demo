import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  keyId: string;
}

const AnimatedStack = ({ children, keyId }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyId}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStack;
