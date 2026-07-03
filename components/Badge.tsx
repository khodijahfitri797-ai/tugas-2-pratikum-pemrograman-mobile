/**
 * components/Badge.tsx
 * Badge nomor pertemuan monospace, mis. "P-04". [IMK #1] konsisten,
 * [IMK #2] penanda visual jelas (umpan balik informatif tiap item).
 */
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';

export default function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 44, // target sentuh / area baca nyaman
    height: 32,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.monoBold,
    fontSize: 13,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
