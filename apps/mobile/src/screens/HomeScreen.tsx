import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.username}>Jason</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('DriverMode')}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={{ color: '#EAB308', fontSize: 20 }}>🚚</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions (3-Tap Booking) */}
                <Text style={styles.sectionTitle}>Start New Order</Text>
                <View style={styles.actionGrid}>
                    <TouchableOpacity
                        style={[styles.actionCard, styles.primaryCard]}
                        onPress={() => navigation.navigate('Booking', { service: 'wash_fold' })}
                    >
                        <Text style={styles.actionEmoji}>🧺</Text>
                        <Text style={styles.actionTitle}>Wash & Fold</Text>
                        <Text style={styles.actionSubtitle}>$1.75 / lb</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionCard, styles.secondaryCard]}
                        onPress={() => navigation.navigate('Booking', { service: 'dry_clean' })}
                    >
                        <Text style={styles.actionEmoji}>👔</Text>
                        <Text style={styles.actionTitle}>Dry Cleaning</Text>
                        <Text style={styles.actionSubtitle}>Per Item</Text>
                    </TouchableOpacity>
                </View>

                {/* Active Order Tracking */}
                <Text style={styles.sectionTitle}>Active Orders</Text>
                <View style={styles.trackingCard}>
                    <View style={styles.trackingHeader}>
                        <Text style={styles.orderId}>Order #2849</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>En Route</Text>
                        </View>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '60%' }]} />
                    </View>
                    <Text style={styles.etaText}>Driver arriving in 12 mins</Text>
                </View>

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Recent</Text>
                {[1, 2].map((i) => (
                    <View key={i} style={styles.historyItem}>
                        <View style={styles.historyIcon}>
                            <Text>✅</Text>
                        </View>
                        <View style={styles.historyInfo}>
                            <Text style={styles.historyDate}>Oct {20 - i}</Text>
                            <Text style={styles.historyService}>Wash & Fold (24lbs)</Text>
                        </View>
                        <Text style={styles.historyPrice}>$42.00</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', // Slate 900
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 12,
    },
    greeting: {
        color: '#94A3B8', // Slate 400
        fontSize: 16,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#334155', // Slate 700
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 8,
    },
    actionGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    actionCard: {
        flex: 1,
        padding: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
    },
    primaryCard: {
        backgroundColor: '#EAB308', // Yellow 500
    },
    secondaryCard: {
        backgroundColor: '#1E293B', // Slate 800
        borderWidth: 1,
        borderColor: '#334155',
    },
    actionEmoji: {
        fontSize: 40,
        marginBottom: 12,
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 14,
        color: '#0F172A',
        opacity: 0.7,
    },
    trackingCard: {
        backgroundColor: '#1E293B',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#334155',
        marginBottom: 32,
    },
    trackingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    orderId: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    statusBadge: {
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        color: '#EAB308',
        fontWeight: 'bold',
        fontSize: 12,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#334155',
        borderRadius: 3,
        marginBottom: 12,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#EAB308',
        borderRadius: 3,
    },
    etaText: {
        color: '#94A3B8',
        fontSize: 14,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    historyIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#334155',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    historyInfo: {
        flex: 1,
    },
    historyDate: {
        color: '#94A3B8',
        fontSize: 12,
        marginBottom: 2,
    },
    historyService: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    historyPrice: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
