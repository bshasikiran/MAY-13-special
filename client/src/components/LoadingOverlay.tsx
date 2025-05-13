import { motion } from 'framer-motion';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-90 z-50 transition-opacity duration-500"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none' 
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4" />
        <p className="text-light-dimmed text-lg">Loading your experience...</p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
