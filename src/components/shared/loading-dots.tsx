import { cn } from "@/lib/utils";

const LoadingDots = ({ className = "top-1/2" }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex absolute top-0 left-0 right-0 space-x-2 justify-center items-center",
        className
      )}
    >
      <span className="sr-only">Loading...</span>
      <div className="size-1 bg-ON_PRIM rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-1 bg-ON_PRIM rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-1 bg-ON_PRIM rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
