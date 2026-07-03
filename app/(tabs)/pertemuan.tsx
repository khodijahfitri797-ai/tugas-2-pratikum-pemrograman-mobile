/**
 * app/(tabs)/pertemuan.tsx — Halaman 2: Daftar Pertemuan.
 * WAJIB FlatList dengan props aktif:
 *   keyExtractor, ItemSeparatorComponent, ListHeaderComponent,
 *   ListEmptyComponent, ListFooterComponent.
 */
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackToTopButton from '@/components/BackToTopButton';
import Badge from '@/components/Badge';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, fonts, radius, space } from '@/constants/theme';
import { pertemuan, type Pertemuan } from '@/data/scheduleData';
import { useReduceMotion } from '@/hooks/useReduceMotion';

// Ubah ke true untuk MENGUJI state kosong (ListEmptyComponent) — [IMK #4]
const SHOW_EMPTY = false;

export default function PertemuanScreen() {
  const listRef = useRef<FlatList<Pertemuan>>(null);
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReduceMotion();

  const data = SHOW_EMPTY ? [] : pertemuan;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowTop(e.nativeEvent.contentOffset.y > 240);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        ref={listRef}
        data={data}
        // [IMK #4] key unik dari id → hindari tabrakan key
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={data.length === 0 ? styles.contentEmpty : styles.content}
        // [IMK #7] ListHeaderComponent — judul yang menjelaskan layar
        ListHeaderComponent={
          <ScreenHeader
            title="Daftar Pertemuan"
            subtitle="Riwayat pertemuan dari seluruh mata kuliah."
            count={data.length}
            countLabel="pertemuan"
          />
        }
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.item,
              index === 0 && styles.itemFirst,
              index === data.length - 1 && styles.itemLast,
            ]}>
            <View style={styles.topRow}>
              {/* badge mono "P-04" (pertemuan ke-) */}
              <Badge label={`P-${String(item.pertemuanKe).padStart(2, '0')}`} />
              {/* tanggal mono, rata kanan */}
              <Text style={styles.tanggal}>{item.tanggal || '-'}</Text>
            </View>
            <Text style={styles.nama} numberOfLines={1}>
              {item.namaMatkul || '-'}
            </Text>
            <Text style={styles.topik}>{item.topik || '-'}</Text>
          </View>
        )}
        // [IMK #1] ItemSeparatorComponent — garis 1px warna line
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // [IMK #4] ListEmptyComponent — cegah layar kosong, beri arahan
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="documents-outline" size={28} color={colors.textLo} />
            <Text style={styles.emptyTitle}>Belum ada pertemuan terjadwal</Text>
            <Text style={styles.emptyBody}>
              Pertemuan akan muncul di sini setelah jadwal kuliah dimulai. Cek kembali pada tab
              Jadwal untuk melihat jam kelas.
            </Text>
          </View>
        }
        // [IMK #3] ListFooterComponent — closure: jumlah yang ditampilkan
        ListFooterComponent={
          data.length > 0 ? (
            <View style={styles.footer}>
              <Text style={styles.footerText}>Menampilkan {data.length} pertemuan</Text>
            </View>
          ) : null
        }
      />

      <BackToTopButton
        visible={showTop}
        onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: !reduceMotion })}
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
  contentEmpty: {
    flexGrow: 1,
    paddingBottom: space.xxl * 2,
  },
  item: {
    backgroundColor: colors.surface,
    marginHorizontal: space.lg,
    paddingHorizontal: space.lg,
    paddingVertical: space.lg,
  },
  itemFirst: {
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  itemLast: {
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tanggal: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textLo,
    textAlign: 'right',
  },
  nama: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.textHi,
    marginTop: space.md,
  },
  topik: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textLo,
    marginTop: space.xs,
    lineHeight: 19,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.line,
    marginHorizontal: space.lg,
  },
  emptyCard: {
    marginHorizontal: space.lg,
    marginTop: space.sm,
    padding: space.xl,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    alignItems: 'center',
    gap: space.sm,
  },
  emptyTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 15,
    color: colors.textHi,
    textAlign: 'center',
  },
  emptyBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textLo,
    textAlign: 'center',
    lineHeight: 19,
  },
  footer: {
    marginTop: space.lg,
    alignItems: 'center',
    paddingVertical: space.sm,
  },
  footerText: {
    fontFamily: fonts.monoMedium,
    fontSize: 13,
    color: colors.textLo,
  },
});
