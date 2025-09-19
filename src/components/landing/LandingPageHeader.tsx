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
              className="-ml-8 flex w-full items-center gap-2"
            >
              <Image
                src="/assets/icons/logo.png"
                alt="InterviewEase"
                width={100}
                height={150}
                className="block flex-shrink-0 object-cover"
                priority
              />

              <span className="-ml-6 text-xl font-semibold text-gray-900 transition-opacity duration-200 hover:opacity-80 dark:text-white">
                Interview<span className="text-[#7877c6]">Ease</span>
              </span>
            </Link>
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
              <div className="px-3 pt-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
