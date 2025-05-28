"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function Footer({ isBlurred = false }: { isBlurred?: boolean }) {
  const [emailValue, setEmailValue] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  return (
    <>
      {/* Hilfiger Club Signup - Fixed height to prevent layout shift */}
      <section
        className={`py-12 border-t border-b mt-16 min-h-[320px] md:min-h-[280px] ${isBlurred ? "filter blur-sm" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col md:flex-row items-center justify-center mb-6 max-w-3xl mx-auto gap-4 md:gap-0">
              <div className="text-center relative flex justify-center flex-shrink-0">
                <div className="w-[130px] h-[110px]">
                  <Image
                    src="/images/hilfiger-club.svg"
                    alt="Hilfiger Club"
                    width={130}
                    height={110}
                    className="object-contain"
                    priority
                    style={{
                      width: "130px",
                      height: "110px",
                      minWidth: "130px",
                      minHeight: "110px",
                    }}
                  />
                </div>
              </div>
              <div className="max-w-md text-center md:text-left">
                <p className="text-sm mb-2 font-bold leading-tight">Enter your email for VIP access</p>
                <p className="text-sm mb-2 leading-tight">to sales and more exclusive perks</p>
                <p className="text-xs leading-tight">Or text JOIN to TOMMY (866669) to sign up instantly</p>
              </div>
            </div>

            <div className="max-w-md w-full">
              <div className="flex gap-4 mb-4">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-none h-10"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <Button className="bg-black text-white rounded-none hover:bg-gray-800 h-10 px-6 whitespace-nowrap">
                  Join Now
                </Button>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  className="mt-0.5 flex-shrink-0"
                />
                <label htmlFor="terms" className="text-xs leading-tight">
                  By clicking the Join Now button, I agree to the{" "}
                  <Link href="#" className="underline">
                    Terms and Conditions
                  </Link>{" "}
                  and to receive updates on the latest products and promotions via email or other channels. See{" "}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>
                  , which includes our{" "}
                  <Link href="#" className="underline">
                    Notice of Financial Incentive
                  </Link>{" "}
                  for more information.
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Fixed height to prevent layout shift */}
      <footer className={`py-12 bg-white min-h-[600px] ${isBlurred ? "filter blur-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[400px]">
            <div className="min-h-[280px] flex flex-col">
              <h3 className="font-bold mb-4 h-6 flex items-center">Help & Support</h3>
              <ul className="space-y-2 text-sm flex-1">
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Customer Service
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Order Status
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Shipping
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Returns
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Klarna
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Cash App Afterpay
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Promotions & Discounts
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Group Discounts
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    E-Gift Cards
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Store Directory
                  </Link>
                </li>
              </ul>
            </div>
            <div className="min-h-[280px] flex flex-col">
              <h3 className="font-bold mb-4 h-6 flex items-center">About Tommy Hilfiger</h3>
              <ul className="space-y-2 text-sm flex-1">
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Tommy Stories
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    People's Place Program
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Sustainability
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Press
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Pre-owned
                  </Link>
                </li>
              </ul>
            </div>
            <div className="min-h-[280px] flex flex-col">
              <h3 className="font-bold mb-4 h-6 flex items-center">Join Us</h3>
              <ul className="space-y-2 text-sm flex-1">
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    The Hilfiger Club
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Newsletter Signup
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>
            <div className="min-h-[280px] flex flex-col">
              <h3 className="font-bold mb-4 h-6 flex items-center">Contact Us</h3>
              <ul className="space-y-2 text-sm mb-6 flex-1">
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Store Locator
                  </Link>
                </li>
                <li className="h-5 flex items-center">
                  <Link href="#" className="hover:underline">
                    Chat
                  </Link>
                </li>
              </ul>
              <div className="flex space-x-4 h-6 items-center">
                <Link href="#" aria-label="Twitter" className="hover:text-gray-600 flex-shrink-0">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Facebook" className="hover:text-gray-600 flex-shrink-0">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Instagram" className="hover:text-gray-600 flex-shrink-0">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Pinterest" className="hover:text-gray-600 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.9 6.4 9.4-.1-.8-.2-2 0-2.9.2-.8 1.3-5 1.3-5s-.3-.6-.3-1.6c0-1.5.9-2.6 1.9-2.6.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.4-2 3.4-4.9 0-2.6-1.9-4.4-4.5-4.4-3.1 0-4.8 2.3-4.8 4.7 0 .9.3 1.9.8 2.4.1.1.1.2.1.3-.1.3-.2 1-.3 1.1-.1.2-.2.2-.4.1-1.4-.7-2.3-2.9-2.3-4.6 0-3.8 2.8-7.2 7.9-7.2 4.2 0 7.4 3 7.4 6.9 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.4-.6-2.8-1.4 0 0-.6 2.3-.7 2.9-.3 1-1 2.3-1.5 3.1 1.1.3 2.3.5 3.5.5 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                  </svg>
                </Link>
                <Link href="#" aria-label="YouTube" className="hover:text-gray-600 flex-shrink-0">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-center mb-6">
              <div className="w-[150px] h-[30px]">
                <Image
                  src="/images/tommy-hilfiger-logo.svg"
                  alt="TOMMY HILFIGER"
                  width={150}
                  height={30}
                  className="object-contain"
                  priority
                  style={{
                    width: "150px",
                    height: "30px",
                    minWidth: "150px",
                    minHeight: "30px",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center text-xs space-x-2 mb-4 min-h-[40px] items-center">
              <Link href="#" className="hover:underline whitespace-nowrap">
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                Privacy Commitment
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                Interest Based Ads
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                Do Not Sell Or Share My Personal Information
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                PVH Corp. Joint Modern Slavery Act Statement
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                Brand Protection
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline whitespace-nowrap">
                Accessibility
              </Link>
            </div>

            <div className="text-center text-xs min-h-[32px] flex flex-col justify-center">
              <p>Web ID: 352511646</p>
              <p>© 2025 Tommy Hilfiger Licensing, LLC. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
