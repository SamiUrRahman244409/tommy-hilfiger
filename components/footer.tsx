import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const blurThreshold = 100; // Adjust this value as needed

      setIsBlurred(scrollPosition > blurThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`py-12 bg-white min-h-[400px] ${isBlurred ? "filter blur-sm" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About Hilfiger Club */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Hilfiger Club</h4>
            <p className="text-gray-600">
              Join the Hilfiger Club and get 15% off your next purchase. Plus,
              enjoy exclusive access to sales, new arrivals, and more.
            </p>
            <div className="text-center relative md:min-w-[200px] flex justify-center">
              <div className="w-[150px] h-[110px] flex items-center justify-center">
                <Image
                  src="/images/hilfiger-club.svg"
                  alt="Hilfiger Club"
                  width={130}
                  height={110}
                  className="h-auto w-auto max-w-[150px] mx-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Help & Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Orders & Shipping
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Returns & Exchanges
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Payment Options
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Tommy Hilfiger */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Tommy Hilfiger</h4>
            <ul>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Store Locator
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Press
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Investor Relations
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Tommy.com
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hilfiger Club Signup Section */}
        <section className={`py-12 border-t border-b mt-16 min-h-[200px] ${isBlurred ? "filter blur-sm" : ""}`}>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Join the Hilfiger Club
            </h3>
            <p className="text-gray-600 mb-6">
              Get 15% off your next purchase and enjoy exclusive access to
              sales, new arrivals, and more.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col md:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 md:mb-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Copyright and Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tommy Hilfiger Licensing LLC. All
            rights reserved.
          </p>
          <div className="flex items-center">
            <Link href="#" className="text-gray-600 hover:text-blue-500 mr-4">
              Terms of Use
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500 mr-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Tommy Hilfiger Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-[150px] h-[32px] flex items-center justify-center">
            <Image
              src="/images/tommy-hilfiger-logo.svg"
              alt="TOMMY HILFIGER"
              width={150}
              height={30}
              className="h-8"
              priority
            />
          </div>
        </div>
      </div>
    </footer>
  );
};