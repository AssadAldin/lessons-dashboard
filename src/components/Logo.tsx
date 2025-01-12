import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ children, className }: Props) => {
  return (
    <Link
      href="/"
      className={`text-white/70 text-2xl font-black uppercase tracking-wider flex items-center align-baseline gap-2 group ${className}`}
    >
      {children}
    </Link>
  );
};

export default Logo;
