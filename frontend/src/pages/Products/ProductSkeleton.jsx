import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = ({ viewMode = 'grid', count = 6 }) => {
  // Animation variants for skeleton items
  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Grid view skeleton
  const GridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10 xl:gap-12">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Image Skeleton */}
          <div className="relative h-56 bg-gradient-to-r from-gray-200 to-gray-300">
            <div className="absolute top-4 left-4 w-24 h-8 bg-gray-400/30 rounded-full"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
            </div>
            
            {/* Usage Type */}
            <div className="flex gap-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
            </div>
            
            {/* Tags */}
            <div className="flex gap-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-14"></div>
            </div>
            
            {/* Button */}
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // List view skeleton
  const ListSkeleton = () => (
    <div className="flex flex-col gap-6">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Skeleton */}
            <div className="md:w-72 h-64 bg-gradient-to-r from-gray-200 to-gray-300 relative">
              <div className="absolute top-4 left-4 w-24 h-8 bg-gray-400/30 rounded-full"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="flex-1 p-6 space-y-4">
              {/* Title */}
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/3"></div>
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
              </div>
              
              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
              
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-24"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Detail page skeleton
  const DetailSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="relative rounded-2xl overflow-hidden bg-white shadow-xl h-[500px] bg-gradient-to-r from-gray-200 to-gray-300"
            >
              <div className="absolute top-4 left-4 w-32 h-8 bg-gray-400/30 rounded-full"></div>
              <div className="absolute top-4 right-4 w-40 h-8 bg-gray-400/30 rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={skeletonVariants}
                  initial="initial"
                  animate="animate"
                  className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"
                ></motion.div>
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              {/* Title */}
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
              
              {/* Rating */}
              <div className="flex gap-2">
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-5 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded ml-2"></div>
              </div>
              
              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl">
                    <div className="h-3 w-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2"></div>
                    <div className="h-6 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded"></div>
                  </div>
                ))}
              </div>
              
              {/* Quantity Selector */}
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="flex-1 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <div className="flex-1 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
              </div>
              
              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="h-5 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                      <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
        >
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex-1 px-6 py-4">
                <div className="h-5 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded mx-auto"></div>
              </div>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="p-8">
            <div className="space-y-4">
              <div className="h-6 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                    <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products Skeleton */}
        <div>
          <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Return appropriate skeleton based on viewMode
  if (viewMode === 'detail') {
    return <DetailSkeleton />;
  }

  return viewMode === 'grid' ? <GridSkeleton /> : <ListSkeleton />;
};

// Specialized skeleton for filters
export const FilterSkeleton = () => (
  <motion.div
    variants={{
      initial: { opacity: 0.6 },
      animate: {
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }}
    initial="initial"
    animate="animate"
    className="flex flex-wrap gap-4 items-center"
  >
    <div className="flex-1 min-w-[200px] h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
    <div className="w-40 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
    <div className="w-40 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
    <div className="w-24 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
    <div className="w-32 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
  </motion.div>
);

export default ProductSkeleton;
