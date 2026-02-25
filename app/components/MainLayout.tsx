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

  // useEffect(() => {
  //   if (hiddenPaths.some((p) => pathname.startsWith(p))) {
  //     router.replace("/");
  //   }
  // }, [pathname, router]);

  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/apply" || pathname === "/reset-password";

  const isAdminPage = pathname.startsWith("/admin");

  // const shouldHide = hiddenPaths.some((p) => pathname.startsWith(p));
  // if (shouldHide) return null;

  if (isAdminPage) {
    return <>{children}</>;
  }

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
