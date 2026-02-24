"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Temporary logic for client review: hiding unfinished pages
  const hiddenPaths = [
    "/about",
    "/courses",
    "/gallery",
    "/community",
    "/store",
    "/apply",
  ];

  useEffect(() => {
    // If the path starts with any of the hidden paths, redirect to home
    if (hiddenPaths.some((p) => pathname.startsWith(p))) {
      router.replace("/");
    }
  }, [pathname, router]);

  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/apply";

  // Prevent flashing of hidden pages before redirect
  const shouldHide = hiddenPaths.some((p) => pathname.startsWith(p));
  if (shouldHide) return null;

  return (
    <main
      className={`flex-1 flex flex-col ${
        isAuthPage ? "" : "pt-[72px] sm:pt-[76px]"
      }`}
    >
      {children}
    </main>
  );
}
