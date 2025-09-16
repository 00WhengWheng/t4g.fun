export interface ScanResult {
  data: string;
  type: 'QR' | 'NFC';
  timestamp: Date;
}

export interface ScanModalProps {
  isOpen?: boolean; // Web
  visible?: boolean; // Mobile
  onClose: () => void;
  onScanSuccess?: (data: string, type: 'QR' | 'NFC') => void;
}

export type ScanType = 'QR' | 'NFC';

export interface ScannerCapabilities {
  hasCamera: boolean;
  hasNFC: boolean;
  cameraPermission: boolean;
  nfcPermission: boolean;
}