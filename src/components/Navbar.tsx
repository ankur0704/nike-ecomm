'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Nike Logo"
                width={60}
                height={60}
                className="h-8 w-auto filter brightness-0"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                New & Featured
              </Link>
              <Link
                href="/men"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Men
              </Link>
              <Link
                href="/women"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Women
              </Link>
              <Link
                href="/kids"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Kids
              </Link>
              <Link
                href="/sale"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Sale
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Search dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Favorites */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" aria-label="Favorites">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 relative" aria-label="Shopping Cart">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
              </svg>
              {/* Cart count badge */}
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          <Link
            href="/"
            className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            New & Featured
          </Link>
          <Link
            href="/men"
            className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Men
          </Link>
          <Link
            href="/women"
            className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Women
          </Link>
          <Link
            href="/kids"
            className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Kids
          </Link>
          <Link
            href="/sale"
            className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Sale
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;