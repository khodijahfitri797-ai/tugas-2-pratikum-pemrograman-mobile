/**
 * components/ScreenHeader.tsx
 * Pola header seragam di 3 layar.
 * [IMK #7] KURANGI BEBAN INGATAN — tiap layar menjelaskan dirinya sendiri.
 * [IMK #3] CLOSURE — badge jumlah memberi tahu ukuran daftar.
 * [IMK #2] UMPAN BALIK — badge jumlah item terlihat jelas.
 */
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, space } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
  count?: number;
  countLabel?: string; // mis. "matkul", "pertemuan"
};

export default function ScreenHeader({ title, subtitle, count, countLabel }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        {typeof count === 'number' && (
          <View style={styles.countPill} accessibilityLabel={`${count} ${countLabel ?? 'item'}`}>
            <Text style={styles.countText}>
              {count} {countLabel ?? ''}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.textHi,
    flexShrink: 1,
  },
  countPill: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radius.pill,
    marginLeft: space.sm,
  },
  countText: {
    fontFamily: fonts.monoMedium,
    fontSize: 12,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textLo,
    marginTop: space.xs,
  },
});
