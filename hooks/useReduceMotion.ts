/**
 * hooks/useReduceMotion.ts
 * [Aksesibilitas] Hormati preferensi "Reduce Motion" pengguna.
 * Dipakai untuk menonaktifkan animasi scroll & efek tekan saat diminta.
 */
import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReduceMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (mounted) setReduce(v);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce);
    return () => {
      mounted = false;
      sub?.remove();
    };
  }, []);

  return reduce;
}
