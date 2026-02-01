import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { theme } from '../theme';
import { X, Scan, ShieldCheck, Fingerprint } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export const ScannerScreen = ({ onBack }: { onBack: () => void }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <View style={styles.container}><Text style={styles.text}>Carregando câmera...</Text></View>;
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
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      Alert.alert(
        "IDENTIFICAÇÃO POSITIVA",
        "Foragido identificado com 99.8% de precisão. Enviando localização para a central...",
        [{ text: "OK", onPress: onBack }]
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
              <X color="#FFF" size={32} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SCANNER BIOMÉTRICO</Text>
          </View>

          <View style={styles.scanAreaContainer}>
            <View style={styles.scanArea}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                
                {scanning && <View style={styles.scanLine} />}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.scanText}>
                {scanning ? "ANALISANDO BIOMETRIA..." : "ALINHE O ROSTO OU DIGITAL NO QUADRO"}
            </Text>
            
            <View style={styles.controls}>
                <TouchableOpacity style={styles.iconControl}>
                    <Fingerprint color={theme.colors.secondary} size={28} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainButton} onPress={handleScan} disabled={scanning}>
                    <Scan color={theme.colors.accent} size={40} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconControl}>
                    <ShieldCheck color={theme.colors.secondary} size={28} />
                </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    marginLeft: theme.spacing.md,
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: width * 0.7,
    height: width * 0.9,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
  },
  topLeft: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 },
  topRight: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 },
  scanLine: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    top: 0,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  footer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  scanText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconControl: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: theme.spacing.md,
    borderRadius: 50,
    marginHorizontal: theme.spacing.lg,
  },
  mainButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: theme.spacing.lg,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  text: { color: '#FFF', textAlign: 'center', marginTop: 100 },
  button: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});
