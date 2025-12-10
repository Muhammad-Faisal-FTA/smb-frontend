'use client';

import { useState, useEffect } from 'react';
import { SettingsPage } from '@/components/pages/SettingsPage';

export default function Settings() {
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('businessName') || 'My Business';
      setBusinessName(name);
    }
  }, []);

  return <SettingsPage businessName={businessName} />;
}
