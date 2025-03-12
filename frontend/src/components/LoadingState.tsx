
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
  height?: string;
  type?: "shimmer" | "pulse" | "skeleton";
  message?: string;
}

const LoadingState = ({ 
  className, 
  height = "h-[200px]", 
  type = "skeleton",
  message = "Loading data..." 
}: LoadingStateProps) => {
  if (type === "pulse") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", height, className)}>
        <div className="w-16 h-16 relative">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-teal border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-t-purple border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: -180 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-white/70 animate-pulse">{message}</p>
      </div>
    );
  }

  if (type === "shimmer") {
    return (
      <div className={cn("rounded-lg overflow-hidden", height, className)}>
        <div className="h-full w-full bg-navy-light/50 shimmer"></div>
      </div>
    );
  }

  // Default skeleton type
  return (
    <div className={cn("space-y-4", className)}>
      <div className="h-4 bg-navy-light/50 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-navy-light/50 rounded animate-pulse w-1/2"></div>
      <div className="h-4 bg-navy-light/50 rounded animate-pulse w-5/6"></div>
      <div className="h-4 bg-navy-light/50 rounded animate-pulse w-2/3"></div>
      <div className="h-4 bg-navy-light/50 rounded animate-pulse w-3/5"></div>
      <p className="text-white/70 text-center mt-8">{message}</p>
    </div>
  );
};

export default LoadingState;
