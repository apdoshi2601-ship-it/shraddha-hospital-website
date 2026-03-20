"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#specialities", label: "Specialities" },
  { href: "#doctors", label: "Our Doctors" },
  { href: "#spine-hub", label: "Spine Hub" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-white"
      }`}
    >
      {/* Top Bar */}
      <div className="hidden md:block bg-surface-dark text-white text-sm">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="text-xs">🕐</span> OPD: Mon-Sat, 10 AM - 1 PM & 6 PM - 7 PM
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} />
              Emergency 24/7:{" "}
              <a href="tel:+919637711122" className="text-white hover:underline">
                +91 96377 11122
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/10 px-3 py-0.5 rounded-full text-xs font-medium">
              NABH Accredited
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="" width={44} height={44} className="h-11 w-auto" />
          <Image
            src="/images/logo-text.png"
            alt="Shraddha Institute of Spine and Orthopaedic Superspeciality"
            width={180}
            height={40}
            className="h-10 w-auto hidden sm:block"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-primary bg-primary-light"
                  : "text-text-light hover:text-primary hover:bg-primary-light/50"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#book" className="btn btn-primary btn-sm hidden md:inline-flex">
            Book Appointment
          </a>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-text-light hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <nav className="lg:hidden border-t border-border bg-white pb-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-border/50 ${
                activeSection === link.href.slice(1)
                  ? "text-primary"
                  : "text-text-light"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#book" className="btn btn-primary btn-full mt-4" onClick={() => setIsMobileOpen(false)}>
            Book Appointment
          </a>
        </nav>
      )}
    </header>
  );
}
