import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductFilters = ({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  totalProducts,
  totalAvailable,
  isSidebar = false,
  brickTypes = ["Classic Reds", "Multies", "Darks", "Hamptons", "Yellows", "Rumbled", "Reclaimed"]
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([0, 100000]);

  // Sidebar layout (vertical)
  if (isSidebar) {
    return (
      <div className="w-full space-y-6" style={{ fontFamily: "'Jost', sans-serif" }}>
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white transition-all text-stone-900 placeholder:text-stone-400"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-stone-900 font-medium"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Application Filter */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">Application</label>
          <select
            value={filters.applicationType}
            onChange={(e) => onFilterChange('applicationType', e.target.value)}
            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-stone-900 font-medium"
          >
            <option value="">All Applications</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-stone-900 font-medium"
          >
            <option value="default">Default Sort</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="strength-desc">Strength: High to Low</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">View</label>
          <div className="flex border border-stone-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 p-3 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-stone-600 hover:bg-stone-50'
              }`}
              title="Grid View"
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 p-3 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-stone-600 hover:bg-stone-50'
              }`}
              title="List View"
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        <AnimatePresence>
          {(filters.category || filters.applicationType || filters.searchQuery) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={onClearFilters}
              className="w-full px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Horizontal layout (original)
  return (
    <div className="w-full" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-red-50 border border-red-200 rounded-lg mb-4 font-semibold text-stone-700 hover:bg-red-100 transition-colors"
      >
        <span>🔍 Filters & Sorting</span>
        <svg
          className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters Content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Left Side - Filters */}
            <div className="flex flex-wrap gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchQuery}
                  onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white transition-all text-stone-900 placeholder:text-stone-400"
                />
                <svg
                  className="absolute left-3 top-3 w-5 h-5 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => onFilterChange('category', e.target.value)}
                className="px-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white min-w-[160px] text-stone-900 font-medium"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Application Filter */}
              <select
                value={filters.applicationType}
                onChange={(e) => onFilterChange('applicationType', e.target.value)}
                className="px-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white min-w-[160px] text-stone-900 font-medium"
              >
                <option value="">All Applications</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>

              {/* Clear Filters */}
              <AnimatePresence>
                {(filters.category || filters.applicationType || filters.searchQuery) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={onClearFilters}
                    className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 font-semibold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side - View & Sort */}
            <div className="flex items-center gap-3">
              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-stone-900 font-medium"
              >
                <option value="default">Default Sort</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="strength-desc">Strength: High to Low</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-red-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                  title="Grid View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                  title="List View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;