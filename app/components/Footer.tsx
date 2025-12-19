"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="footer-transition relative h-[80vh] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative -top-[100vh] h-[calc(100vh+80vh)]">
        <div className="sticky top-[calc(100vh-80vh)] h-[80vh]">
          <div className="bg-tertiary flex h-full w-full flex-col justify-between px-4 pt-16 pb-8 text-white md:px-8">
            {/* Top Section */}
            <div className="flex flex-col gap-12 md:flex-row md:justify-start md:gap-4">
              {/* Company Info */}
              <div className="flex flex-col gap-6 md:max-w-md">
                <Link href="/" className="inline-block cursor-pointer">
                  <Image
                    src="/images/logovintage.svg"
                    alt="COAN Logo"
                    width={90}
                    height={24}
                    className="h-10 w-auto"
                    style={{ width: "auto" }}
                  />
                </Link>
                <p className="font-pp-neue-montreal text-lg leading-relaxed text-white/80">
                  A leading construction company offering integrated solutions
                  and related services.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-12 md:grid-cols-2 md:gap-8">
                <div className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link
                        href="/company"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        Company
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/projects"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/gallery"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-3">
                    <li>
                      <a
                        href="mailto:info@coanwa.com"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        info@coanwa.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+2348037869334"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        +234 803 786 9334
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+2347033668523"
                        className="font-pp-neue-montreal cursor-pointer text-lg text-white/80 transition-opacity hover:opacity-80 md:text-xl"
                      >
                        +234 703 366 8523
                      </a>
                    </li>
                    <li className="text-white/80">
                      <p className="font-pp-neue-montreal text-lg md:text-xl">
                        22 Durban Street, Wuse 2,
                        <br />
                        Abuja, Nigeria.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} COAN West Africa Limited. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
