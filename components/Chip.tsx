/**
 * components/Chip.tsx
 * Chip data monospace (kode matkul, SKS). [IMK #1] gaya seragam untuk semua data.
 * Font mono menegaskan bahwa ini data teknis (recognition) — [IMK #7].
 */
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, space } from '@/constants/theme';

type ChipProps = {
  label: string;
  tone?: 'primary' | 'neutral';
};

export default function Chip({ label, tone = 'primary' }: ChipProps) {
  const isPrimary = tone === 'primary';
  return (
    <View style={[styles.chip, isPrimary ? styles.primary : styles.neutral]}>
      <Text style={[styles.text, { color: isPrimary ? colors.primary : colors.textLo }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: colors.primarySoft,
  },
  neutral: {
    backgroundColor: colors.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  text: {
    fontFamily: fonts.monoMedium,
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
