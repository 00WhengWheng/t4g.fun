import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface NavbarProps {
  onScanPress?: () => void;
  onSharePress?: () => void;
  onGamePress?: () => void;
  onProfilePress?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onScanPress,
  onSharePress,
  onGamePress,
  onProfilePress,
}) => {
  return (
    <View style={styles.navbar}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>T4G</Text>
        </View>
        <Text style={styles.logoTitle}>Tag 4 Gift</Text>
      </View>

      {/* Center Icon Buttons */}
      <View style={styles.centerButtons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onScanPress}
          accessibilityLabel="Scan"
        >
          <Text style={styles.iconText}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onSharePress}
          accessibilityLabel="Share"
        >
          <Text style={styles.iconText}>📤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onGamePress}
          accessibilityLabel="Games"
        >
          <Text style={styles.iconText}>🎮</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onProfilePress}
          accessibilityLabel="Profile"
        >
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  centerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profileSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
  iconText: {
    fontSize: 18,
  },
});

export default Navbar;