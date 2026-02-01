import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container } from '../components/Core';
import { theme } from '../theme';
import { MapPin, AlertTriangle, ScanLine } from 'lucide-react-native';

const FORAGIDOS_MOCK = [
  { id: '1', nome: 'CARLOS "SOMBRA" SILVA', crime: 'TRÁFICO E HOMICÍDIO', periculosidade: 'ALTA', local: 'MACEIÓ, AL' },
  { id: '2', nome: 'ANA "VIÚVA" SANTOS', crime: 'ESTELIONATO QUALIFICADO', periculosidade: 'MÉDIA', local: 'ARAPIRACA, AL' },
  { id: '3', nome: 'MARCOS "FÊNIX" OLIVEIRA', crime: 'ROUBO A BANCO', periculosidade: 'MÁXIMA', local: 'RECIFE, PE' },
];

export const DashboardScreen = ({ onScan }: { onScan: () => void }) => {
  return (
    <Container>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Agente</Text>
          <Text style={styles.status}>SISTEMA 100% OPERACIONAL</Text>
        </View>
        <TouchableOpacity style={styles.scanButton} onPress={onScan}>
            <ScanLine color={theme.colors.accent} size={28} />
            <Text style={styles.scanButtonText}>SCAN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>PROCURADOS</Text>
        </View>
        <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>12</Text>
            <Text style={styles.statLabel}>CAPTURAS/MÊS</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ALERTAS EM TEMPO REAL</Text>

      <FlatList 
        data={FORAGIDOS_MOCK}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardIndicator} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{item.nome}</Text>
                <View style={[styles.badge, item.periculosidade === 'MÁXIMA' ? styles.badgeHigh : {}]}>
                    <Text style={styles.badgeText}>{item.periculosidade}</Text>
                </View>
              </View>
              <Text style={styles.cardCrime}>{item.crime}</Text>
              <View style={styles.cardFooter}>
                <MapPin size={12} color={theme.colors.textSecondary} />
                <Text style={styles.cardLocation}>{item.local}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.detailsButton}>
                <AlertTriangle size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  greeting: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  status: {
    color: theme.colors.success,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  scanButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  scanButtonText: {
    color: theme.colors.accent,
    fontSize: 8,
    fontWeight: '900',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statBox: {
    backgroundColor: theme.colors.surface,
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statValue: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionTitle: {
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: theme.spacing.md,
  },
  list: {
    paddingBottom: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  cardIndicator: {
    width: 4,
    backgroundColor: theme.colors.primary,
  },
  cardContent: {
    flex: 1,
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  badge: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeHigh: {
    backgroundColor: theme.colors.error,
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 8,
    fontWeight: '900',
  },
  cardCrime: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    marginLeft: 4,
  },
  detailsButton: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
  }
});
