import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import type { ScanModalProps, ScanResult } from '../../../shared/types/scanner';

export const ScanModal: React.FC<ScanModalProps> = ({
  visible,
  onClose,
  onScanSuccess,
}) => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isNfcScanning, setIsNfcScanning] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [scanMode, setScanMode] = useState<'QR' | 'NFC' | 'IDLE'>('IDLE');

  useEffect(() => {
    checkNfcSupport();
    requestCameraPermission();
    
    return () => {
      cleanupNfc();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setScanResult(null);
      setScanMode('IDLE');
    } else {
      cleanupNfc();
    }
  }, [visible]);

  const checkNfcSupport = async () => {
    try {
      const supported = await NfcManager.isSupported();
      setNfcSupported(supported);
      if (supported) {
        await NfcManager.start();
      }
    } catch (error) {
      console.log('NFC not supported', error);
      setNfcSupported(false);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setCameraPermission(false);
      }
    } else {
      // iOS permissions are handled automatically by the camera component
      setCameraPermission(true);
    }
  };

  const handleQRCodeRead = (e: any) => {
    const result: ScanResult = {
      data: e.data,
      type: 'QR',
      timestamp: new Date(),
    };
    
    setScanResult(result);
    setScanMode('IDLE');
    onScanSuccess?.(e.data, 'QR');
    
    Alert.alert(
      'QR Code Scanned',
      e.data,
      [
        { text: 'OK', onPress: () => {} }
      ]
    );
  };

  const startNfcScan = async () => {
    if (!nfcSupported) {
      Alert.alert('Error', 'NFC is not supported on this device');
      return;
    }

    try {
      setIsNfcScanning(true);
      setScanMode('NFC');
      
      // Request NFC technology
      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      // Read NFC tag
      const tag = await NfcManager.getTag();
      
      if (tag?.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        let textRecord = 'Unknown NFC data';
        
        try {
          if (ndefRecord.payload) {
            const payload = new Uint8Array(ndefRecord.payload);
            textRecord = Ndef.text.decodePayload(payload);
          }
        } catch (decodeError) {
          console.log('NFC decode error, using raw data');
          textRecord = JSON.stringify(ndefRecord);
        }
        
        const result: ScanResult = {
          data: textRecord,
          type: 'NFC',
          timestamp: new Date(),
        };
        
        setScanResult(result);
        onScanSuccess?.(textRecord, 'NFC');
        
        Alert.alert(
          'NFC Tag Scanned',
          textRecord,
          [
            { text: 'OK', onPress: () => {} }
          ]
        );
      } else {
        Alert.alert('Error', 'No readable data found on NFC tag');
      }
    } catch (error) {
      console.log('NFC scan error:', error);
      Alert.alert('Error', 'Failed to scan NFC tag. Please try again.');
    } finally {
      setIsNfcScanning(false);
      setScanMode('IDLE');
      cleanupNfc();
    }
  };

  const cleanupNfc = async () => {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch (error) {
      // Ignore cleanup errors
    }
  };

  const handleClose = () => {
    cleanupNfc();
    setScanResult(null);
    setScanMode('IDLE');
    onClose();
  };

  const startQRScan = () => {
    if (!cameraPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to scan QR codes',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Request Permission', onPress: requestCameraPermission }
        ]
      );
      return;
    }
    setScanMode('QR');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Scan QR Code or NFC Tag</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.description}>
            Choose a scanning method below to scan QR codes or NFC tags
          </Text>

          {/* QR Code Scanner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📱 QR Code Scanner</Text>
            
            {scanMode === 'QR' && cameraPermission ? (
              <View style={styles.scannerContainer}>
                <QRCodeScanner
                  onRead={handleQRCodeRead}
                  showMarker={true}
                  markerStyle={styles.qrMarker}
                  cameraStyle={styles.camera}
                  topContent={
                    <Text style={styles.scannerText}>
                      Position QR code within the frame
                    </Text>
                  }
                  bottomContent={
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => setScanMode('IDLE')}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.scanButton}
                onPress={startQRScan}
                disabled={!cameraPermission}
              >
                <Text style={styles.scanButtonText}>
                  {cameraPermission ? 'Start QR Scan' : 'Camera Permission Required'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* NFC Scanner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📡 NFC Scanner</Text>
            
            <TouchableOpacity
              style={[
                styles.scanButton,
                !nfcSupported && styles.disabledButton,
                isNfcScanning && styles.scanningButton
              ]}
              onPress={startNfcScan}
              disabled={!nfcSupported || isNfcScanning}
            >
              <Text style={[
                styles.scanButtonText,
                !nfcSupported && styles.disabledButtonText
              ]}>
                {isNfcScanning ? 'Scanning for NFC...' : 
                 nfcSupported ? 'Start NFC Scan' : 'NFC Not Supported'}
              </Text>
            </TouchableOpacity>
            
            {!nfcSupported && (
              <Text style={styles.warningText}>
                NFC is not supported on this device
              </Text>
            )}
          </View>

          {/* Scan Result */}
          {scanResult && (
            <View style={styles.resultSection}>
              <Text style={styles.resultTitle}>✅ {scanResult.type} Scan Result</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultData}>{scanResult.data}</Text>
                <Text style={styles.resultTimestamp}>
                  Scanned at {scanResult.timestamp.toLocaleTimeString()}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  scannerContainer: {
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
  },
  camera: {
    height: 250,
  },
  qrMarker: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  scannerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    margin: 10,
  },
  scanButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  scanningButton: {
    backgroundColor: '#3b82f6',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  warningText: {
    fontSize: 12,
    color: '#f59e0b',
    marginTop: 8,
    textAlign: 'center',
  },
  resultSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 10,
  },
  resultContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  resultData: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 5,
  },
  resultTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
});