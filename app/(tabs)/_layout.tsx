/**
 * app/(tabs)/_layout.tsx — navigasi 3 tab.
 * [IMK #7] KURANGI BEBAN INGATAN — tiap tab pakai ikon + LABEL (recognition, bukan recall).
 * [IMK #2] UMPAN BALIK — tab aktif ditandai jelas dengan warna primary.
 * [IMK #1] KONSISTENSI — ikon+label seragam di ketiga tab.
 * [IMK #5/#6] navigasi tab bebas bolak-balik, tanpa auto-navigate.
 */
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary, // penanda tab aktif
        tabBarInactiveTintColor: colors.textLo,
        tabBarShowLabel: true, // label selalu terlihat
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mata Kuliah',
          tabBarAccessibilityLabel: 'Tab Mata Kuliah',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pertemuan"
        options={{
          title: 'Pertemuan',
          tabBarAccessibilityLabel: 'Tab Pertemuan',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jadwal"
        options={{
          title: 'Jadwal',
          tabBarAccessibilityLabel: 'Tab Jadwal',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: Platform.select({ ios: 88, android: 64, default: 64 }),
    paddingTop: 6,
  },
  tabItem: {
    paddingVertical: 4,
  },
  tabLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
  },
});
