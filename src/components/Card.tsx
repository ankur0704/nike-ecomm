import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  id?: string;
  title: string;
  image: string;
  price?: number;
  originalPrice?: number;
  isOnSale?: boolean;
  link?: string;
  className?: string;
  brand?: string;
  rating?: number;
  isNew?: boolean;
  category?: string; // e.g., "Men's Shoes", "Women's Shoes", "Kids' Shoes"
  colors?: number; // number of color options available
  sizes?: string; // e.g., "6-15"
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  price,
  originalPrice,
  isOnSale = false,
  link = '#',
  className = '',
  brand = 'Nike',
  rating = 4.5,
  isNew = false,
  category = "Men's Shoes",
  colors = 1,
  sizes = "6-15",
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" clipPath="inset(0 50% 0 0)"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer ${className}`}>
      <Link href={link} className="block">
        <div className="relative overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={title}
            width={400}
            height={320}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                New
              </div>
            )}
            {isOnSale && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Sale
              </div>
            )}
          </div>

          {/* Favorite button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-100">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {/* Brand */}
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {brand}
          </div>

          {/* Category and Colors */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">
              {category}
            </span>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <span>{colors} {colors === 1 ? 'color' : 'colors'}</span>
              <span>•</span>
              <span>Sizes {sizes}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {price && (
                <span className="text-xl font-bold text-gray-900">
                  ${price}
                </span>
              )}
              {originalPrice && originalPrice > price! && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            {isOnSale && originalPrice && price && (
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Save ${(originalPrice - price).toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;