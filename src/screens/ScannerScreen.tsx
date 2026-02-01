import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Animated, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { theme } from '../theme';
import { X, Scan, ShieldCheck, Fingerprint, ShieldAlert } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export const ScannerScreen = ({ onBack, mode = 'BIOMÉTRICO' }: { onBack: () => void; mode?: 'BIOMÉTRICO' | 'DIGITAL' }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ percent: number; status: 'PRISÃO' | 'LIBERAÇÃO' } | null>(null);
  
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanAnim.stopAnimation();
    }
  }, [scanning]);

  if (!permission) {
    return <View style={styles.container}><Text style={styles.text}>Carregando sistema de elite...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Acesso à câmera é obrigatório para identificação de elite.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>CONCEDER ACESSO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const percentage = Math.floor(Math.random() * 101); // 0 a 100%
      const status = percentage >= 80 ? 'PRISÃO' : 'LIBERAÇÃO';
      
      setScanning(false);
      setScanResult({ percent: percentage, status });

      if (status === 'PRISÃO') {
        Alert.alert(
          "⚠️ ALERTA DE PRISÃO IMEDIATA",
          `Compatibilidade de ${percentage}% detectada. O indivíduo é um FORAGIDO DA JUSTIÇA. Proceda com a prisão e solicite reforço.`,
          [{ text: "ENTENDIDO", onPress: () => {} }]
        );
      } else {
        Alert.alert(
          "✅ IDENTIFICAÇÃO NEGATIVA",
          `Compatibilidade de apenas ${percentage}%. O indivíduo não consta como foragido. Pode ser liberado imediatamente.`,
          [{ text: "LIBERAR INDIVÍDUO", onPress: () => {} }]
        );
      }
    }, 4000);
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.9],
  });

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <X color="#FFF" size={32} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SCANNER {mode}</Text>
          </View>

          <View style={styles.scanAreaContainer}>
            <TouchableOpacity 
              activeOpacity={mode === 'DIGITAL' ? 0.7 : 1}
              style={styles.scanArea} 
              onPress={mode === 'DIGITAL' ? handleScan : undefined}
            >
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                
                {mode === 'DIGITAL' && !scanning && !scanResult && (
                  <View style={styles.fingerprintHint}>
                    <Fingerprint color="rgba(255,255,255,0.3)" size={80} strokeWidth={1} />
                    <Text style={styles.fingerprintText}>TOQUE PARA ESCANEAR DIGITAL NA TELA</Text>
                  </View>
                )}

                {scanning && (
                  <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
                )}

                {scanResult && (
                  <View style={[styles.resultOverlay, scanResult.status === 'PRISÃO' ? styles.resultPrisao : styles.resultLiberacao]}>
                    {scanResult.status === 'PRISÃO' ? <ShieldAlert color="#FF4D4D" size={60} /> : <ShieldCheck color="#4DFF88" size={60} />}
                    <Text style={styles.resultStatusText}>{scanResult.status}</Text>
                    <Text style={styles.resultPercentText}>{scanResult.percent}% COMPATÍVEL</Text>
                  </View>
                )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.scanText}>
                {scanning ? "PROCESSANDO DADOS DE ALTA PRECISÃO..." : 
                 mode === 'BIOMÉTRICO' ? "ALINHE O ROSTO NO QUADRO E CLIQUE NO ÍCONE" : "PRESSIONE O DEDO NA ÁREA INDICADA NA TELA"}
            </Text>
            
            <View style={styles.controls}>
                {mode === 'BIOMÉTRICO' && !scanResult && (
                  <TouchableOpacity style={styles.mainButton} onPress={handleScan} disabled={scanning}>
                      <Scan color={theme.colors.accent} size={40} />
                  </TouchableOpacity>
                )}

                {scanResult && (
                  <TouchableOpacity style={styles.resetButton} onPress={() => setScanResult(null)}>
                    <Text style={styles.resetButtonText}>NOVO ESCANEAMENTO</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 3,
    marginLeft: theme.spacing.md,
    textTransform: 'uppercase',
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: width * 0.75,
    height: width * 0.95,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: theme.colors.accent,
  },
  topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 },
  topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    top: 0,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 20,
    zIndex: 10,
  },
  fingerprintHint: {
    alignItems: 'center',
  },
  fingerprintText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  resultPrisao: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  resultLiberacao: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  resultStatusText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 15,
    letterSpacing: 4,
  },
  resultPercentText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scanText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  mainButton: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: theme.spacing.xl,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  resetButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  resetButtonText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  text: { color: '#FFF', textAlign: 'center', marginTop: 100 },
  button: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});
