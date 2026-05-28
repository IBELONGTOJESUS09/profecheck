"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7.5 3.8v2.8M16.5 3.8v2.8M3.5 9.2h17" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 12.2h3.2v3.2H8zM12.8 12.2H16v3.2h-3.2zM8 16.2h3.2v1.8H8z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    href: "/dashboard/section-2",
    label: "Seccion 2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    href: "/dashboard/section-3",
    label: "Avisos",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          d="M3 11c3.8 0 6-1.6 8.6-3.8 2.2-1.8 5-2.2 8.4-2.2v10c-3.4 0-6.2-.4-8.4-2.2C9 10.6 6.8 9 3 9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M8 14.5 9.8 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    href: "/dashboard/section-4",
    label: "Seccion 4",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          d="M12 6.5c4.5 0 8 2.8 9 5.5-1 2.7-4.5 5.5-9 5.5S4 14.7 3 12c1-2.7 4.5-5.5 9-5.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    )
  },
  {
    href: "/dashboard/profile",
    label: "Configuracion",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="2.8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 3.8v2.1M12 18.1v2.1M20.2 12h-2.1M5.9 12H3.8M17.8 6.2l-1.5 1.5M7.7 16.3l-1.5 1.5M17.8 17.8l-1.5-1.5M7.7 7.7 6.2 6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-transparent"
      aria-label="Navegacion inferior"
    >
      <ul className="mx-auto grid h-16 w-full max-w-3xl grid-cols-5 items-center px-2">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href} className="flex justify-center">
              <Link
                href={item.href}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition ${
                  active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                {item.icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
