import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, viewMode }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const productId = product.id || product._id;
  const productDetailPath = `/products/${productId}`;

  const handleCardNavigate = (e) => {
    // Allow inner buttons/links to handle their own actions.
    if (e.target.closest('a, button')) return;
    navigate(productDetailPath);
  };

  // Star rating
  const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-stone-300'}`}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs font-medium text-stone-500">({reviews})</span>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardNavigate}
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 border border-orange-100 cursor-pointer"
      >
        <div className="flex flex-col md:flex-row h-72">
          {/* Image Container - Fixed Height */}
          <div className="relative md:w-80 h-72 overflow-hidden bg-stone-200 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-stone-300 to-stone-200 animate-pulse" />
            )}
            <img
              src={product.image || '/images/default-brick.jpg'}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Badges */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                {product.inStock && (
                  <span className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg w-fit">
                    In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"
            />
          </div>

          {/* Content Container - Fixed Height */}
          <div className="flex-1 p-5 flex flex-col justify-between h-72 overflow-hidden">
            <div className="overflow-y-auto">
              <Link to={productDetailPath}>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-stone-600 text-xs mb-2 line-clamp-1 font-light">{product.shortDescription}</p>
              
              {/* Rating */}
              <div className="mb-2">
                <StarRating rating={product.rating} reviews={product.reviews} />
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-center p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <svg className="w-4 h-4 text-orange-600 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-orange-600 font-bold">Strength</div>
                  <div className="font-bold text-stone-900 text-xs">{product.specifications?.strength || 'N/A'}</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <svg className="w-4 h-4 text-orange-600 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM15 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                  </svg>
                  <div className="text-xs text-orange-600 font-bold">Size</div>
                  <div className="font-bold text-stone-900 text-xs">{product.specifications.size || 'N/A'}</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <svg className="w-4 h-4 text-orange-600 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 16.5a1 1 0 01-1-1V6.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L9 6.414V15.5a1 1 0 01-1 1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-orange-600 font-bold">Weight</div>
                  <div className="font-bold text-stone-900 text-xs">{product.specifications.weight || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-stone-200 mt-auto">
              <Link
                to={productDetailPath}
                className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-center font-bold text-xs whitespace-nowrap"
              >
                Explore
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact', { state: { productId: product.id, productName: product.name } })}
                className="flex-1 px-3 py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-bold text-xs whitespace-nowrap"
              >
                Inquire
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View - Fixed height cards
  return (
    <motion.div
      whileHover={{ y: -12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardNavigate}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 border border-orange-100 flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-64 overflow-hidden bg-stone-200 flex-shrink-0 rounded-t-2xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-stone-300 to-stone-200 animate-pulse" />
        )}
        <img
          src={product.image || '/images/default-brick.jpg'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {product.inStock && (
              <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg w-fit">
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"
        />
      </div>

      {/* Content Container - Flexible grow */}
      <div className="p-4 flex flex-col justify-between flex-grow overflow-hidden">
        <div className="overflow-y-auto">
          <Link to={productDetailPath}>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-stone-600 text-xs mb-2 line-clamp-1 font-light">{product.shortDescription}</p>
          
          {/* Rating */}
          <div className="mb-3">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

            {/* Quick Features Grid */}
            <div className="grid grid-cols-2 gap-1 mb-3">
              <div className="text-center p-2 bg-orange-50 rounded-md border border-orange-100">
                <svg className="w-4 h-4 text-orange-600 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                </svg>
                <div className="font-bold text-stone-900 text-xs">{product.specifications.strength}</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded-md border border-orange-100">
                <svg className="w-4 h-4 text-orange-600 mx-auto mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 16.5a1 1 0 01-1-1V6.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L9 6.414V15.5a1 1 0 01-1 1z" clipRule="evenodd" />
                </svg>
                <div className="font-bold text-stone-900 text-xs">{product.specifications.weight}</div>
              </div>
            </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pt-2">
          <Link
            to={productDetailPath}
            className="flex-1 px-3 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-center font-bold text-xs whitespace-nowrap"
          >
            Explore
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact', { state: { productId: product.id, productName: product.name } })}
            className="flex-1 px-3 py-2.5 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-bold text-xs whitespace-nowrap"
          >
            Inquire
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
