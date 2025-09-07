import React, { useState } from 'react';
import { Card, CardBody } from './ui/card';
import { trackPropertyClick } from '../lib/analytics';
import { StatusBadge, PriceDisplay, PropertyStats, LocationBadge, FeatureList, ActionButton } from './ui/VisualElements';
import { Heart, Share2, Eye } from 'lucide-react';

type P = { 
  url: string; 
  title: string; 
  cover?: string; 
  location?: string; 
  type: string; 
  bedrooms: number; 
  bathrooms?: number;
  living_sqm?: number;
  price_thb: number; 
  status?: string;
  features?: string[];
};

export default function PropertyCard({ p }: { p: P }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleClick = () => {
    trackPropertyClick(p.url, p.title);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Share functionality
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <a href={p.url} className="block" onClick={handleClick}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 motion-safe:animate-[cardin_280ms_ease-out]">
          {/* Image with overlay */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={p.cover || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center'} 
              alt={p.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              loading="lazy"
              decoding="async"
            />
            
            {/* Status Badge */}
            {p.status && (
              <div className="absolute top-3 left-3">
                <StatusBadge status={p.status as any} />
              </div>
            )}

            {/* Action Buttons */}
            <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={handleFavorite}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'
                }`}
              >
                <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:bg-white flex items-center justify-center transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardBody className="p-4">
            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: 'var(--color-text)' }}>
              {p.title}
            </h3>

            {/* Location */}
            <LocationBadge location={p.location || 'Pattaya'} className="mb-3" />

            {/* Property Stats */}
            <PropertyStats 
              bedrooms={p.bedrooms} 
              bathrooms={p.bathrooms || 1} 
              area={p.living_sqm}
              className="mb-3"
            />

            {/* Features */}
            {p.features && p.features.length > 0 && (
              <FeatureList 
                features={p.features} 
                maxItems={2} 
                className="mb-3"
              />
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <PriceDisplay price={p.price_thb} size="lg" />
              <ActionButton
                variant="outline"
                size="sm"
                icon={<Eye size={14} />}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(p.url, '_blank');
                }}
              >
                Ansehen
              </ActionButton>
            </div>
          </CardBody>
        </Card>
      </a>
    </div>
  );
}
