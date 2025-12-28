'use client';

import { useState, useEffect } from 'react';
import { SettingsPage } from '@/components/pages/SettingsPage';
import { FEATURES, SettingsUnavailableModal } from "@/lib/fetu.config";
import { useRouter } from "next/navigation";
export default function Settings() {
  const [businessName, setBusinessName] = useState('');
  const router = useRouter();
  useEffect( () => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('businessName') || 'My Business';
      setBusinessName(name);
    }
  }, []);
  

   if (!FEATURES.settings) {
    //  setShowSettingsModal(true);
     return <SettingsUnavailableModal onClose={() => router.push("/dashboard")} />;
   }
  return <SettingsPage businessName={businessName} />;
}
