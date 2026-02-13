interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* D letter - Dylan style: bold outline only, transparent inside */}
      <path 
        d="M8 6h8c6 0 11 5 11 11s-5 11-11 11H8V6zm4 4v14h4c4 0 7-3 7-7s-3-7-7-7h-4z" 
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
