"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
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

export function Header({ config, pageVisibility }: HeaderProps) {
  const vis: PageVisibility = pageVisibility ?? {
    blog: true,
    products: true,
    workshops: true,
    gallery: true,
    resources: true,
  };
  const siteName = config.name;
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
    <header className="bg-cream/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-brown group-hover:text-sage-dark font-serif text-xl font-bold transition-colors">
              {siteName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-brown-light hover:text-sage-dark rounded-md px-3 py-2 text-sm font-medium transition-colors"
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
                    onClick={() => setOpenMenu(open ? null : item.label)}
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active || open ? "text-sage-dark" : "text-brown-light hover:text-sage-dark"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div
                      role="menu"
                      aria-label={item.label}
                      className="border-border bg-cream absolute top-full left-0 mt-1 min-w-[12rem] rounded-lg border py-1 shadow-lg"
                      onMouseEnter={clearCloseTimer}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                          className={`hover:bg-accent block px-4 py-2 text-sm transition-colors ${
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
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/book"
              className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              <Phone className="h-4 w-4" />
              Book a Session
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="text-brown hover:text-sage-dark rounded-md p-2 md:hidden"
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
        <nav className="border-border bg-cream border-t px-4 pb-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => {
              if (!isGroup(item)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-brown-light hover:bg-accent rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
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
                    onClick={() => setMobileGroupOpen(open ? null : item.label)}
                    className="text-brown-light hover:bg-accent flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="border-border ml-3 flex flex-col gap-1 border-l pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-brown-light hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors"
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
                className="bg-sage hover:bg-sage-dark inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
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
