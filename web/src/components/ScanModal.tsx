import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Wifi, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { ScanModalProps, ScanResult } from '../../../shared/types/scanner';

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(false);

  // Check NFC support
  useEffect(() => {
    if ('NDEFReader' in window) {
      setNfcSupported(true);
    }
  }, []);

  // Initialize QR scanner when modal opens
  useEffect(() => {
    if (isOpen && !scannerRef.current) {
      // Small delay to ensure DOM element is rendered
      const timer = setTimeout(() => {
        const qrReaderElement = document.getElementById('qr-reader');
        if (qrReaderElement) {
          initializeQRScanner();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }

    return () => {
      cleanupScanner();
    };
  }, [isOpen]);

  const initializeQRScanner = () => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    scannerRef.current = new Html5QrcodeScanner('qr-reader', config, false);
    
    scannerRef.current.render(
      (decodedText: string) => {
        handleScanSuccess(decodedText, 'QR');
      },
      (errorMessage: string) => {
        // Ignore frequent scanning errors
        if (!errorMessage.includes('No QR code found')) {
          console.warn('QR Code scanning error:', errorMessage);
        }
      }
    );

    setIsScanning(true);
    setError(null);
  };

  const cleanupScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText: string, type: 'QR' | 'NFC') => {
    const result: ScanResult = {
      data: decodedText,
      type,
      timestamp: new Date(),
    };
    
    setScanResult(result);
    cleanupScanner();
    onScanSuccess?.(decodedText, type);
  };

  const startNFCScan = async () => {
    if (!nfcSupported) {
      setError('NFC is not supported on this device');
      return;
    }

    try {
      setError(null);
      setIsScanning(true);
      
      // Request NFC permissions
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      
      ndef.addEventListener('reading', (event: any) => {
        const message = event.message;
        if (message.records.length > 0) {
          const record = message.records[0];
          const textDecoder = new TextDecoder(record.encoding);
          const decodedText = textDecoder.decode(record.data);
          handleScanSuccess(decodedText, 'NFC');
        }
      });

      ndef.addEventListener('readingerror', () => {
        setError('Failed to read NFC tag');
        setIsScanning(false);
      });

    } catch (error) {
      setError('NFC scanning failed. Please check permissions.');
      setIsScanning(false);
      console.error('NFC Error:', error);
    }
  };

  const handleClose = () => {
    cleanupScanner();
    setScanResult(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Scan QR Code or NFC Tag
          </DialogTitle>
          <DialogDescription>
            Position a QR code in front of your camera or tap an NFC tag to scan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* QR Scanner */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">QR Code Scanner</h3>
            {!scanResult && (
              <div id="qr-reader" className="w-full" />
            )}
          </div>

          {/* NFC Scanner */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              NFC Scanner
            </h3>
            <Button
              onClick={startNFCScan}
              disabled={!nfcSupported || isScanning}
              variant="outline"
              className="w-full"
            >
              {isScanning ? 'Scanning for NFC...' : 'Start NFC Scan'}
            </Button>
            {!nfcSupported && (
              <p className="text-xs text-muted-foreground">
                NFC is not supported on this browser/device
              </p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Success Display */}
          {scanResult && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  {scanResult.type} Scan Successful
                </p>
                <p className="text-xs text-green-600 break-all">
                  {scanResult.data}
                </p>
                <p className="text-xs text-green-500 mt-1">
                  Scanned at {scanResult.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};