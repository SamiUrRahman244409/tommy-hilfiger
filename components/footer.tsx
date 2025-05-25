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
      {/* Hilfiger Club Signup */}
      <section className={`py-12 border-t border-b mt-16 ${isBlurred ? "filter blur-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center mb-6 max-w-3xl mx-auto gap-0">
              <div className="text-center relative md:min-w-[200px] flex justify-center">
                <Image
                  src="https://media.tommy.com/us/static/images/scheduled_marketing/logos/HC_CLUB_LOGO_VERT_BLUE.png"
                  alt="Hilfiger Club"
                  width={130}
                  height={110}
                  className="h-auto w-auto max-w-[150px] mx-auto"
                />
              </div>
              <div className="max-w-md">
                <p className="text-sm mb-2 font-bold">Enter your email for VIP access</p>
                <p className="text-sm mb-2">to sales and more exclusive perks</p>
                <p className="text-xs">Or text JOIN to TOMMY (866669) to sign up instantly</p>
              </div>
            </div>

            <div className="max-w-md w-full">
              <div className="flex gap-4 mb-4">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-none"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <Button className="bg-black text-white rounded-none hover:bg-gray-800">Join Now</Button>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="text-xs">
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

      {/* Footer */}
      <footer className={`py-12 bg-white ${isBlurred ? "filter blur-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Help & Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Klarna
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cash App Afterpay
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Promotions & Discounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Group Discounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    E-Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Store Directory
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About Tommy Hilfiger</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Tommy Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    People's Place Program
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Pre-owned
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Join Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    The Hilfiger Club
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Newsletter Signup
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Chat
                  </Link>
                </li>
              </ul>
              <div className="flex space-x-4 mt-6">
                <Link href="#" aria-label="Twitter" className="hover:text-gray-600">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Facebook" className="hover:text-gray-600">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Instagram" className="hover:text-gray-600">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Pinterest" className="hover:text-gray-600">
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
                <Link href="#" aria-label="YouTube" className="hover:text-gray-600">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-center mb-6">
              <Image
                src="https://usa.tommy.com/on/demandware.static/-/Sites-PVHTHUS-Library/default/dw6244e61b/logo/Logo.svg"
                alt="TOMMY HILFIGER"
                width={150}
                height={30}
                className="h-8"
              />
            </div>

            <div className="flex flex-wrap justify-center text-xs space-x-2 mb-4">
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Privacy Commitment
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Interest Based Ads
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Do Not Sell Or Share My Personal Information
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                PVH Corp. Joint Modern Slavery Act Statement
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Brand Protection
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Accessibility
              </Link>
            </div>

            <div className="text-center text-xs">
              <p>Web ID: 352511646</p>
              <p>© 2025 Tommy Hilfiger Licensing, LLC. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
