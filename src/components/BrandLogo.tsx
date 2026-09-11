import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showEyes?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-8 w-auto',
  size = 'md',
  showEyes = true,
}) => {
  const [imgError, setImgError] = React.useState(false);

  // Official hotlinked asset from HTML prompt
  const officialLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1WKk6x-4WbP4VxNQaGfWude7Rrt-lMktjbpsQlCaWtG0AJdD4Clea51q5v76vLGT3qGwmmrVOHM3cET2QkmbBEquzotAEDVlE-nTxfUxzYbh0gmtCutz3t0o4IJFa0ttrvGw4fYD-JYmrvpp-BBBJcuYMAgvVr_vtyH1FEYiv3bgvUeCYPg0CrZQWYqYkzlLnLNZhidl9OwxdwPgGV5QFA4YN_xP1I_aFNErf9kbwOzGRX_qwb5VrMKuoU';

  if (!imgError) {
    return (
      <img
        src={officialLogoUrl}
        alt="Student OS Official Logo"
        className={`${className} object-contain flex-shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }

  // Pixel-perfect vector reproduction of the red infinity logo with eyes (Image 2 & 3)
  const pixelSize = size === 'sm' ? 28 : size === 'md' ? 34 : 48;

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg bg-[#2c2f36] p-1 flex-shrink-0 border border-[#85888f]/20 shadow-sm ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <svg
        viewBox="0 0 100 60"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red Infinity symbol outline */}
        <path
          d="M32 12C20.954 12 12 20.059 12 30C12 39.941 20.954 48 32 48C42 48 48 38 50 30C52 22 58 12 68 12C79.046 12 88 20.059 88 30C88 39.941 79.046 48 68 48C58 48 52 38 50 30C48 22 42 12 32 12Z"
          stroke="#ff0000"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showEyes && (
          <>
            <circle cx="32" cy="30" r="4.5" fill="#ffffff" />
            <circle cx="68" cy="30" r="4.5" fill="#ffffff" />
          </>
        )}
      </svg>
    </div>
  );
};
