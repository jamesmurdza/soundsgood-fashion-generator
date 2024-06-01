import './globals.css';

import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from '@/components/icons';
import { User } from './user';
import { NavItem } from './nav-item';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold lg:hidden"
                href="/"
              >
                <Logo />
                <span className="">ACME</span>
              </Link>
              <User />
            </header>
            {children}
          </div>
        <Analytics />
      </body>
    </html>
  );
}
