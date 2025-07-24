import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const checkMatch = () => {
      const match = window.innerWidth >= breakpoints[breakpoint];
      setIsMatch(match);
    };

    checkMatch();

    window.addEventListener('resize', checkMatch);
    return () => window.removeEventListener('resize', checkMatch);
  }, [breakpoint]);

  return isMatch;
}
