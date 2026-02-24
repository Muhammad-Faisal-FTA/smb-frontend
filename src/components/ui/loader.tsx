import React from "react";

type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  size?: LoaderSize;
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export default function Loader({
  size = "md",
  label,
  fullScreen = false,
  className = "",
}: LoaderProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          ${sizeMap[size]}
          rounded-full
          border-slate-300
          border-t-slate-600
          animate-spin
        `}
      />
      {label && <p className="text-sm text-slate-600 tracking-wide">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`
          fixed inset-0
          flex items-center justify-center
          bg-slate-50
          ${className}
        `}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
}
