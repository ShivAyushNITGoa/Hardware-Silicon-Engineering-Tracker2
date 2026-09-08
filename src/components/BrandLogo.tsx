import React from 'react';

export interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'compact' | 'badge' | 'logo' | 'image';
  theme?: 'dark' | 'light' | 'auto';
  subtitle?: string;
  className?: string;
}

/**
 * Official G icon for The GDevelopers.
 * Renders /G%20icon.svg with automatic fallback to /G%20icon.png.
 */
export const GDevelopersIcon: React.FC<{
  className?: string;
  size?: number | string;
  rounded?: boolean;
}> = ({ className = 'w-8 h-8', size, rounded = true }) => {
  return (
    <img
      src="/g-icon.svg?v=20260908"
      alt="The GDevelopers Icon"
      className={`shrink-0 ${rounded ? 'rounded-[20%]' : ''} ${className} object-contain select-none`}
      style={size ? { width: size, height: size } : undefined}
      loading="eager"
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src.includes('g-icon.svg')) {
          target.src = '/G%20icon.svg?v=20260908';
        } else if (!target.src.includes('.png')) {
          target.src = '/G%20icon.png?v=20260908';
        }
      }}
    />
  );
};

/**
 * Official Brand Logo Image for The GDevelopers.
 * Renders /logo.png with automatic fallback to /logo.svg.
 */
export const BrandLogoImage: React.FC<{
  className?: string;
  height?: number | string;
  alt?: string;
}> = ({ className = 'h-8 w-auto', height, alt = 'The GDevelopers' }) => {
  return (
    <img
      src="/logo.png?v=20260908"
      alt={alt}
      className={`object-contain shrink-0 select-none ${className}`}
      style={height ? { height } : undefined}
      loading="eager"
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.src.includes('.svg')) {
          target.src = '/logo.svg?v=20260908';
        }
      }}
    />
  );
};

/**
 * Full Brand Logo for The GDevelopers with typography and optional subtitle.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'auto',
  subtitle,
  className = ''
}) => {
  const sizeMap = {
    xs: { icon: 'w-5 h-5', imgHeight: 20, text: 'text-xs', sub: 'text-[9px]' },
    sm: { icon: 'w-6 h-6', imgHeight: 24, text: 'text-sm', sub: 'text-[10px]' },
    md: { icon: 'w-8 h-8 sm:w-9 sm:h-9', imgHeight: 32, text: 'text-base sm:text-lg', sub: 'text-[10px] sm:text-xs' },
    lg: { icon: 'w-10 h-10 sm:w-11 sm:h-11', imgHeight: 40, text: 'text-xl sm:text-2xl', sub: 'text-xs sm:text-sm' },
    xl: { icon: 'w-14 h-14', imgHeight: 56, text: 'text-3xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  if (variant === 'icon') {
    return <GDevelopersIcon className={`${currentSize.icon} ${className}`} />;
  }

  if (variant === 'logo' || variant === 'image') {
    return (
      <div className={`inline-flex flex-col select-none ${className}`}>
        <BrandLogoImage height={currentSize.imgHeight} />
        {subtitle && (
          <span className={`font-semibold tracking-normal truncate ${currentSize.sub} ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  // Theme text color mapping:
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  // "The" in signature Brand Olive-Lime Green (#9EB613)
  const theColor = 'text-[#9EB613]';
  // "GDevelopers" in high-contrast slate/white or light beige matching logo.png
  const devColor = isDark ? 'text-white' : isLight ? 'text-neutral-950' : 'text-neutral-900 dark:text-white';
  const subColor = isDark ? 'text-neutral-300' : isLight ? 'text-neutral-600' : 'text-neutral-600 dark:text-neutral-300';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="shrink-0 rounded-[20%] shadow-2xs overflow-hidden flex items-center justify-center">
        <GDevelopersIcon className={currentSize.icon} />
      </div>

      <div className="flex flex-col leading-tight justify-center">
        <div className={`font-black tracking-tight flex items-baseline gap-1.5 ${currentSize.text}`}>
          <span className={`${theColor} font-black drop-shadow-2xs`}>The</span>
          <span className={`${devColor} font-black`}>
            GDevelopers
          </span>
        </div>

        {subtitle && (
          <span className={`font-semibold tracking-normal truncate ${currentSize.sub} ${subColor}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
