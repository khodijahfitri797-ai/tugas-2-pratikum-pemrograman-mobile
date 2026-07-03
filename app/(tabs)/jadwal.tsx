/**
 * app/(tabs)/jadwal.tsx — Halaman 3: Jadwal per Hari.
 * WAJIB SectionList dengan:
 *   renderSectionHeader (bar warna hari + tint + nama hari + "N kelas"),
 *   keyExtractor item unik, stickySectionHeadersEnabled.
 * [IMK #3] CLOSURE — SectionList mengelompokkan tuntas per hari.
 * [IMK #7] header hari sticky = konteks berjalan (kurangi beban ingatan).
 */
import { useRef, useState } from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackToTopButton from '@/components/BackToTopButton';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, fonts, getDayColor, radius, space } from '@/constants/theme';
import { jadwalPerHari, type JadwalItem } from '@/data/scheduleData';
import { useReduceMotion } from '@/hooks/useReduceMotion';

export default function JadwalScreen() {
  const listRef = useRef<SectionList<JadwalItem>>(null);
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReduceMotion();

  const totalKelas = jadwalPerHari.reduce((sum, s) => sum + s.data.length, 0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowTop(e.nativeEvent.contentOffset.y > 240);
  };

  const scrollToTop = () => {
    listRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: !reduceMotion,
      viewOffset: 100,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <SectionList
        ref={listRef}
        sections={jadwalPerHari}
        // [IMK #4] keyExtractor untuk item unik
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled // konteks hari tetap terlihat saat scroll
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        // header layar (konsisten dengan layar lain) — [IMK #1/#7]
        ListHeaderComponent={
          <ScreenHeader
            title="Jadwal"
            subtitle="Jadwal kelas Senin sampai Jumat."
            count={totalKelas}
            countLabel="kelas"
          />
        }
        // [IMK #1] header section WAJIB jelas beda dari item
        renderSectionHeader={({ section }) => {
          const c = getDayColor(section.title);
          return (
            <View style={[styles.sectionHeader, { backgroundColor: c.tint }]}>
              <View style={[styles.dayBar, { backgroundColor: c.solid }]} />
              <Text style={[styles.dayName, { color: c.solid }]}>{section.title}</Text>
              <Text style={styles.dayCount}>{section.data.length} kelas</Text>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* blok jam besar (mono) di kiri */}
            <View style={styles.timeBlock}>
              <Text style={styles.timeStart}>{item.jamMulai || '--:--'}</Text>
              <Text style={styles.timeEnd}>{item.jamSelesai || '--:--'}</Text>
            </View>
            {/* nama matkul + ruangan di kanan */}
            <View style={styles.itemBody}>
              <Text style={styles.itemNama} numberOfLines={2}>
                {item.namaMatkul || '-'}
              </Text>
              <Text style={styles.itemRuang}>{item.ruangan || '-'}</Text>
            </View>
          </View>
        )}
        // [IMK #3] CLOSURE — footer ringkasan menutup daftar
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>Total {totalKelas} kelas dalam seminggu</Text>
          </View>
        }
      />

      <BackToTopButton visible={showTop} onPress={scrollToTop} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: space.xxl * 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: space.lg,
    marginTop: space.md,
    marginBottom: space.sm,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.sm,
  },
  dayBar: {
    width: 5,
    height: 22,
    borderRadius: radius.pill,
    marginRight: space.md,
  },
  dayName: {
    fontFamily: fonts.display,
    fontSize: 16,
    flex: 1,
  },
  dayCount: {
    fontFamily: fonts.monoMedium,
    fontSize: 12,
    color: colors.textLo,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: space.lg,
    marginBottom: space.sm,
    padding: space.lg,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  timeBlock: {
    minWidth: 68,
    paddingRight: space.md,
    marginRight: space.md,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.line,
  },
  timeStart: {
    fontFamily: fonts.monoBold,
    fontSize: 18,
    color: colors.textHi,
  },
  timeEnd: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.textLo,
    marginTop: 2,
  },
  itemBody: {
    flex: 1,
  },
  itemNama: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.textHi,
    lineHeight: 21,
  },
  itemRuang: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textLo,
    marginTop: space.xs,
  },
  footer: {
    marginTop: space.md,
    alignItems: 'center',
    paddingVertical: space.sm,
  },
  footerText: {
    fontFamily: fonts.monoMedium,
    fontSize: 13,
    color: colors.textLo,
  },
});
