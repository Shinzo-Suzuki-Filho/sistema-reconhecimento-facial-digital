import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Button } from '../components/Core';
import { theme } from '../theme';
import { Shield, Fingerprint, Eye } from 'lucide-react-native';

export const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');

  const handleBiometricAuth = () => {
    // Simulação de autenticação biométrica (Íris/Digital)
    Alert.alert(
      "Autenticação de Elite",
      "Escaneando íris e digital para acesso seguro...",
      [
        { 
          text: "Confirmar", 
          onPress: onLogin 
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Container style={styles.center}>
        <View style={styles.logoContainer}>
            <Image 
                source={require('../assets/logo.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>GUARDIAN EYE</Text>
            <Text style={styles.subtitle}>SISTEMA DE SEGURANÇA PÚBLICA DE ELITE</Text>
        </View>

        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <Shield color={theme.colors.primary} size={20} />
                <TextInput 
                    style={styles.input}
                    placeholder="SENHA DE ACESSO (CRIPTOGRAFADA)"
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Button title="ENTRAR COM SENHA" onPress={handleBiometricAuth} />
            
            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>OU USE RECURSOS DE ELITE</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.authButtons}>
                <TouchableOpacity 
                    style={styles.iconButton} 
                    onPress={handleBiometricAuth}
                >
                    <Eye color={theme.colors.accent} size={32} />
                    <Text style={styles.iconText}>ESCANEAMENTO DE ÍRIS</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.iconButton} 
                    onPress={handleBiometricAuth}
                >
                    <Fingerprint color={theme.colors.accent} size={32} />
                    <Text style={styles.iconText}>DADOS BIOMÉTRICOS</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Text style={styles.footer}>
            Em conformidade com a LGPD. Criptografia ponta a ponta ativa.
        </Text>
      </Container>
    </KeyboardAvoidingView>
  );
};

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 4,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 56,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    marginHorizontal: theme.spacing.md,
    fontWeight: '700',
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.xl,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    width: '45%',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconText: {
    color: theme.colors.text,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
    fontSize: 10,
    textAlign: 'center',
  }
});
