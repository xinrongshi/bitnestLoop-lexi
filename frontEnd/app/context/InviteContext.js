"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'
export const InviteContext = React.createContext();

export const InviteContextProvider = ({ children }) => {
  const [inviteAddress, setInviteAddress] = useState("");
  const [referrerAddress, setReferrerAddress] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const inviteParam = searchParams.get('invite');
  //     const referrerParam = searchParams.get('referrer');

  //     if (referrerParam) {
  //       setReferrerAddress(referrerParam);
  //     } else if (inviteParam) {
  //       setInviteAddress(inviteParam);
  //     }
  //   }
  // }, [pathname]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const currentUrl = window.location.href;
  //     const url = new URL(currentUrl);
  //     let shouldUpdate = false;

  //     if (pathname === '/zh') {
  //       router.replace('/', { shallow: true });
  //       shouldUpdate = true;
  //     }

  //     if (url.searchParams.has('utm_source')) {
  //       url.searchParams.delete('utm_source');
  //       shouldUpdate = true;
  //     }

  //     if (referrerAddress) {
  //       if (url.searchParams.get('referrer') !== referrerAddress) {
  //         url.searchParams.set('referrer', referrerAddress);
  //         shouldUpdate = true;
  //       }
  //       if (url.searchParams.has('invite')) {
  //         url.searchParams.delete('invite');
  //         shouldUpdate = true;
  //       }
  //     } else if (inviteAddress) {
  //       if (url.searchParams.get('invite') !== inviteAddress) {
  //         url.searchParams.set('invite', inviteAddress);
  //         shouldUpdate = true;
  //       }
  //     }

  //     const newUrl = url.toString();
  //     if (shouldUpdate && currentUrl !== newUrl) {
  //       router.replace(newUrl, { shallow: true });
  //     }
  //   }
  // }, [referrerAddress, inviteAddress, pathname]);

  return (
    <Suspense>
    <InviteContext.Provider
      value={{
        inviteAddress,
        setInviteAddress,
        referrerAddress,
        setReferrerAddress
      }}
    >
      {children}
    </InviteContext.Provider>
    </Suspense>
  );
};
