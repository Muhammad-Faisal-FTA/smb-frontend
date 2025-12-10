'use client';

import { useRouter } from 'next/navigation';
import { OnboardingPage } from '@/components/pages/OnboardingPage';

export default function Onboarding() {
  const router = useRouter();

  const handleComplete = (businessName: string) => {
    // Store business name in localStorage or state management
    if (typeof window !== 'undefined') {
      localStorage.setItem('businessName', businessName);
    }
    router.push('/login');
  };

  return <OnboardingPage onComplete={handleComplete} />;
}
