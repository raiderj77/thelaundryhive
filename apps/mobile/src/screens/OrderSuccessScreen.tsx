import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function OrderSuccessScreen({ navigation }: any) {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.content}>
                <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.successEmoji}>🎉</Text>
                </Animated.View>

                <Text style={styles.title}>Order Placed!</Text>
                <Text style={styles.subtitle}>
                    Your laundry is in good hands. A driver has been notified and will be with you shortly.
                </Text>

                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Order ID</Text>
                        <Text style={styles.detailValue}>#2850</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Est. Pickup</Text>
                        <Text style={styles.detailValue}>Today, 2:00 PM</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.trackButtonText}>Track Order</Text>
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
    content: {
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 32,
        transform: [{ scale: 1.2 }],
    },
    successEmoji: {
        fontSize: 80,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8',
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 24,
    },
    detailsCard: {
        width: '100%',
        backgroundColor: '#1E293B',
        borderRadius: 16,
        padding: 24,
        marginBottom: 48,
        borderWidth: 1,
        borderColor: '#334155',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        color: '#94A3B8',
        fontSize: 14,
    },
    detailValue: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    trackButton: {
        width: '100%',
        backgroundColor: '#EAB308',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#EAB308',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    trackButtonText: {
        color: '#0F172A',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
