import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer({ isBlurred = false }: { isBlurred?: boolean }) {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-8">
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

        {/* Footer Sections */}
        <section className={`py-12 border-t border-b mt-16 min-h-[200px] ${isBlurred ? "filter blur-sm" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul>
                <li>
                  <Link href="#" className="hover:underline">
                    Help & Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Orders & Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">About Tommy Hilfiger</h4>
              <ul>
                <li>
                  <Link href="#" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Tommy Values
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Press Room
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Investors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">More</h4>
              <ul>
                <li>
                  <Link href="#" className="hover:underline">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cookies Notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hilfiger Club */}
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

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Tommy Hilfiger Licensing LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}