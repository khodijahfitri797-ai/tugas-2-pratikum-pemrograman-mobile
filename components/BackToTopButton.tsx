/**
 * components/BackToTopButton.tsx
 * Tombol melayang "ke atas".
 * [IMK #2] UMPAN BALIK — Pressable dengan state ditekan (opacity + scale halus).
 * [IMK #5] PEMBALIKAN AKSI MUDAH — cepat kembali ke awal daftar (scroll ke atas).
 * [IMK #6] PUSAT KENDALI — hanya muncul & bekerja atas inisiatif pengguna, tidak memaksa.
 */
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cardShadow, colors, fonts, radius, space, HIT_TARGET } from '@/constants/theme';
import { useReduceMotion } from '@/hooks/useReduceMotion';

type Props = {
  visible: boolean;
  onPress: () => void;
};

export default function BackToTopButton({ visible, onPress }: Props) {
  const reduceMotion = useReduceMotion(); // hormati reduce-motion
  if (!visible) return null;
  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Kembali ke atas daftar"
        hitSlop={8}
        style={({ pressed }) => [
          styles.btn,
          pressed && (reduceMotion ? styles.pressedNoScale : styles.pressed), // umpan balik ditekan
        ]}>
        <Ionicons name="arrow-up" size={16} color="#FFFFFF" />
        <Text style={styles.label}>Atas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: space.lg,
    bottom: space.xl,
  },
  btn: {
    minHeight: HIT_TARGET,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    ...cardShadow,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  pressedNoScale: {
    opacity: 0.85, // tanpa scale saat reduce-motion aktif
  },
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
