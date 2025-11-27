import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function BookingScreen({ route, navigation }: any) {
    const { service } = route.params;
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDetergent, setSelectedDetergent] = useState('standard');

    const handlePlaceOrder = () => {
        // In a real app, this would send data to Firestore
        navigation.navigate('OrderSuccess');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Order</Text>
                    <View style={{ width: 40 }} />
                </View>

                <Text style={styles.sectionTitle}>Service Type</Text>
                <View style={styles.serviceCard}>
                    <Text style={styles.serviceEmoji}>{service === 'wash_fold' ? '🧺' : '👔'}</Text>
                    <View>
                        <Text style={styles.serviceName}>{service === 'wash_fold' ? 'Wash & Fold' : 'Dry Cleaning'}</Text>
                        <Text style={styles.servicePrice}>{service === 'wash_fold' ? '$1.75 / lb' : 'Per Item Pricing'}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Pickup Time</Text>
                <View style={styles.timeGrid}>
                    {['Today, 2-4pm', 'Today, 6-8pm', 'Tmrw, 8-10am', 'Tmrw, 6-8pm'].map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[styles.timeOption, selectedTime === time && styles.timeOptionSelected]}
                            onPress={() => setSelectedTime(time)}
                        >
                            <Text style={[styles.timeText, selectedTime === time && styles.timeTextSelected]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.prefContainer}>
                    <Text style={styles.prefLabel}>Detergent</Text>
                    <View style={styles.prefOptions}>
                        {['Standard', 'Hypoallergenic', 'Lavender'].map((opt) => (
                            <TouchableOpacity
                                key={opt}
                                style={[styles.prefChip, selectedDetergent === opt.toLowerCase() && styles.prefChipSelected]}
                                onPress={() => setSelectedDetergent(opt.toLowerCase())}
                            >
                                <Text style={[styles.prefText, selectedDetergent === opt.toLowerCase() && styles.prefTextSelected]}>
                                    {opt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Est. Total</Text>
                        <Text style={styles.summaryValue}>~ $35.00</Text>
                    </View>
                    <Text style={styles.summaryNote}>Final price based on weight/count upon pickup.</Text>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.placeOrderButton, !selectedTime && styles.disabledButton]}
                    onPress={handlePlaceOrder}
                    disabled={!selectedTime}
                >
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        borderRadius: 20,
    },
    backText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    sectionTitle: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 12,
        marginTop: 24,
    },
    serviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EAB308',
    },
    serviceEmoji: {
        fontSize: 32,
        marginRight: 16,
    },
    serviceName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    servicePrice: {
        color: '#EAB308',
        fontSize: 14,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    timeOption: {
        width: '48%',
        paddingVertical: 16,
        backgroundColor: '#1E293B',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    timeOptionSelected: {
        backgroundColor: '#EAB308',
        borderColor: '#EAB308',
    },
    timeText: {
        color: '#94A3B8',
        fontWeight: 'bold',
    },
    timeTextSelected: {
        color: '#0F172A',
    },
    prefContainer: {
        marginBottom: 16,
    },
    prefLabel: {
        color: '#FFFFFF',
        marginBottom: 12,
        fontSize: 16,
    },
    prefOptions: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    prefChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1E293B',
        borderWidth: 1,
        borderColor: '#334155',
    },
    prefChipSelected: {
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        borderColor: '#EAB308',
    },
    prefText: {
        color: '#94A3B8',
    },
    prefTextSelected: {
        color: '#EAB308',
        fontWeight: 'bold',
    },
    summaryCard: {
        marginTop: 32,
        backgroundColor: '#1E293B',
        padding: 24,
        borderRadius: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryValue: {
        color: '#EAB308',
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryNote: {
        color: '#94A3B8',
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: '#0F172A',
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
    },
    placeOrderButton: {
        backgroundColor: '#EAB308',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#EAB308',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#334155',
        shadowOpacity: 0,
    },
    placeOrderText: {
        color: '#0F172A',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
