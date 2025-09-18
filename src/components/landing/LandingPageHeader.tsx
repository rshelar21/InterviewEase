'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants';
import Image from 'next/image';

export function LandingPageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href={APP_ROUTES.HOME}
              className="flex w-full items-center gap-3"
            >
              <Image
                src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                alt="CMSFullForm"
                width={32}
                height={32}
                className="hidden flex-shrink-0 dark:block"
              />

              <Image
                src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                alt="CMSFullForm"
                width={32}
                height={32}
                className="block flex-shrink-0 dark:hidden"
              />
              <span className="text-lg font-semibold text-gray-900 transition-opacity duration-200 hover:cursor-pointer dark:text-white">
                InterviewEase
              </span>
            </Link>
            {/* <InterviewEaseLogo size="sm" theme="light" /> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>

            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="border-border space-y-1 border-t px-2 pt-2 pb-3 sm:px-3">
              <a
                href="#features"
                className="text-foreground hover:text-primary block px-3 py-2 transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary block px-3 py-2 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-foreground hover:text-primary block px-3 py-2 transition-colors"
              >
                Pricing
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
