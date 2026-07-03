/**
 * app/(tabs)/index.tsx — Halaman 1: Ringkasan Mata Kuliah.
 * WAJIB pakai .map() (BUKAN FlatList) di dalam ScrollView.
 * [IMK #3] CLOSURE — header + daftar + footer ringkasan Total & Σ SKS.
 * [IMK #7] header menjelaskan layar; [IMK #1] Card/Chip dipakai ulang.
 */
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackToTopButton from '@/components/BackToTopButton';
import Card from '@/components/Card';
import Chip from '@/components/Chip';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, fonts, space } from '@/constants/theme';
import { mataKuliah } from '@/data/scheduleData';
import { useReduceMotion } from '@/hooks/useReduceMotion';

export default function MataKuliahScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReduceMotion();

  const totalSks = mataKuliah.reduce((sum, mk) => sum + mk.sks, 0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowTop(e.nativeEvent.contentOffset.y > 240);
  };

  return (
    // [Setup] SafeAreaView wajib (edge-to-edge Android aktif default di Expo 54)
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Mata Kuliah"
          subtitle="Ringkasan mata kuliah yang diambil semester ini."
          count={mataKuliah.length}
          countLabel="matkul"
        />

        <View style={styles.list}>
          {/* [IMK #1/#7] Render array dengan .map(); tiap elemen WAJIB key unik (id) */}
          {mataKuliah.map((mk) => (
            <Card key={mk.id}>
              <Text style={styles.nama} numberOfLines={2}>
                {/* fallback "-" bila field kosong — [IMK #4] pencegahan kesalahan */}
                {mk.nama || '-'}
              </Text>

              <View style={styles.chipRow}>
                <Chip label={mk.kode || '-'} tone="primary" />
                <Chip label={`${mk.sks} SKS`} tone="neutral" />
              </View>

              <Text style={styles.dosen}>{mk.dosen || '-'}</Text>
            </Card>
          ))}
        </View>

        {/* [IMK #3] CLOSURE — footer ringkasan memberi tahu daftar telah selesai */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total {mataKuliah.length} mata kuliah • Σ {totalSks} SKS
          </Text>
        </View>
      </ScrollView>

      <BackToTopButton
        visible={showTop}
        onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: !reduceMotion })}
      />
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
  list: {
    paddingHorizontal: space.lg,
    gap: space.md,
  },
  nama: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.textHi,
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.md,
  },
  dosen: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textLo,
    marginTop: space.md,
  },
  footer: {
    marginTop: space.lg,
    marginHorizontal: space.lg,
    paddingVertical: space.md,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  footerText: {
    fontFamily: fonts.monoMedium,
    fontSize: 13,
    color: colors.textLo,
  },
});
