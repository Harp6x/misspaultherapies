"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { HeaderProps, PageVisibility } from "@/types";

type NavLink = { label: string; href: string };
type NavGroup = { label: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const HIDDEN_HREF_MAP: Record<string, keyof PageVisibility> = {
  "/products": "products",
  "/blog": "blog",
  "/resources": "resources",
  "/gallery": "gallery",
  "/workshops": "workshops",
};

function filterNav(items: NavItem[], vis: PageVisibility): NavItem[] {
  return items
    .map((item) => {
      if (isGroup(item)) {
        const children = item.children.filter(
          (c) => !(c.href in HIDDEN_HREF_MAP) || vis[HIDDEN_HREF_MAP[c.href]]
        );
        return children.length > 0 ? { ...item, children } : null;
      }
      if (item.href in HIDDEN_HREF_MAP && !vis[HIDDEN_HREF_MAP[item.href]]) return null;
      return item;
    })
    .filter(Boolean) as NavItem[];
}

const allNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  {
    label: "Resources",
    children: [
      { label: "FAQ", href: "/faq" },
      { label: "Resources", href: "/resources" },
      { label: "Tools", href: "/tools" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Workshops", href: "/workshops" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function Header({ branding, pageVisibility }: HeaderProps) {
  const vis: PageVisibility = pageVisibility ?? { blog: true, products: true, workshops: true, gallery: true, resources: true };
  const siteName = branding?.name ?? siteConfig.name;
  const navItems = filterNav(allNavItems, vis);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close desktop dropdown on outside click and Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function groupIsActive(group: NavGroup) {
    return group.children.some((c) => pathname === c.href);
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl font-bold text-brown group-hover:text-sage-dark transition-colors">
              {siteName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-1"
            aria-label="Main"
          >
            {navItems.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-brown-light hover:text-sage-dark rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }

              const open = openMenu === item.label;
              const active = groupIsActive(item);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() =>
                      setOpenMenu(open ? null : item.label)
                    }
                    className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      active || open
                        ? "text-sage-dark"
                        : "text-brown-light hover:text-sage-dark"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div
                      role="menu"
                      aria-label={item.label}
                      className="absolute left-0 top-full mt-1 min-w-[12rem] rounded-lg border border-border bg-cream py-1 shadow-lg"
                      onMouseEnter={clearCloseTimer}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                          className={`block px-4 py-2 text-sm transition-colors hover:bg-accent ${
                            pathname === child.href
                              ? "text-sage-dark font-medium"
                              : "text-brown-light hover:text-sage-dark"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
            >
              <Phone className="h-4 w-4" />
              Book a Session
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-brown hover:text-sage-dark rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t border-border bg-cream px-4 pb-4"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-brown-light hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }

              const open = mobileGroupOpen === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() =>
                      setMobileGroupOpen(open ? null : item.label)
                    }
                    className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-brown-light hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-brown-light hover:bg-accent rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-2 flex items-center gap-3">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
              >
                <Phone className="h-4 w-4" />
                Book a Session
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
