/**
 * components/Card.tsx
 * [IMK #1] KONSISTENSI — komponen Card dipakai ulang di ketiga layar
 * (bentuk, radius, bayangan, aksen kiri seragam). Perubahan gaya cukup di sini.
 */
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { cardShadow, colors, radius, space } from '@/constants/theme';

type CardProps = {
  children: React.ReactNode;
  accentColor?: string; // warna rule tipis di kiri (default: primary)
  style?: ViewStyle;
};

export default function Card({ children, accentColor = colors.primary, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {/* rule warna tipis di kiri card — penanda visual yang konsisten */}
      <View style={[styles.accent, { backgroundColor: accentColor }]} />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    overflow: 'hidden',
    ...cardShadow,
  },
  accent: {
    width: 4,
  },
  body: {
    flex: 1,
    padding: space.lg,
  },
});
