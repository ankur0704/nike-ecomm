import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'News', href: '/news' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Returns', href: '/returns' },
      { name: 'Contact Us', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: '/facebook.svg' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '/instagram.svg' },
    { name: 'Twitter', href: 'https://twitter.com', icon: '/x.svg' },
  ];

  return (
    <footer className="bg-[var(--color-dark-900)] text-[var(--color-light-100)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.svg"
                alt="Nike Logo"
                width={60}
                height={60}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-[var(--text-body)] font-[var(--text-body--font-weight)] text-[var(--color-dark-500)] mb-4">
              Just Do It. Experience the best in athletic footwear and apparel.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[var(--text-lead)] font-[var(--text-lead--font-weight)] text-[var(--color-light-100)] mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-body)] font-[var(--text-body--font-weight)] text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-[var(--text-lead)] font-[var(--text-lead--font-weight)] text-[var(--color-light-100)] mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-body)] font-[var(--text-body--font-weight)] text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-[var(--text-lead)] font-[var(--text-lead--font-weight)] text-[var(--color-light-100)] mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-body)] font-[var(--text-body--font-weight)] text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--color-dark-700)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--text-caption)] font-[var(--text-caption--font-weight)] text-[var(--color-dark-500)]">
              © {currentYear} Nike, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-[var(--text-caption)] font-[var(--text-caption--font-weight)] text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[var(--text-caption)] font-[var(--text-caption--font-weight)] text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-[var(--text-caption)] font-[var(--text-caption--font-weight)] text-[var(--color-dark-500)] hover:text-[var(--color-light-100)] transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;