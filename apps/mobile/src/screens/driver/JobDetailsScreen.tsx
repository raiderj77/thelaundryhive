import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, onSnapshot, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Order } from '../../types/schema';

export default function JobDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { jobId } = route.params as { jobId: string };
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'orders', jobId), (docSnap) => {
            if (docSnap.exists()) {
                setOrder({ id: docSnap.id, ...docSnap.data() } as Order);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [jobId]);

    const handleNavigate = () => {
        if (!order) return;
        // Determine target address based on status (pickup vs delivery)
        // For MVP assuming pickup flow
        const address = order.pickupAddress;
        const query = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        Linking.openURL(url);
    };

    const handleStatusUpdate = async () => {
        if (!order) return;
        let nextStatus = '';
        let buttonText = '';

        // Simple state machine for MVP
        if (order.status === 'driver_assigned_pickup') {
            nextStatus = 'en_route_pickup';
        } else if (order.status === 'en_route_pickup') {
            nextStatus = 'picked_up'; // Skip "at_facility" for MVP simplicity
        }

        if (nextStatus) {
            try {
                await updateDoc(doc(db, 'orders', jobId), {
                    status: nextStatus,
                    updatedAt: Timestamp.now()
                });
                Alert.alert("Status Updated", `Order is now ${nextStatus.replace(/_/g, ' ')}`);
            } catch (err) {
                Alert.alert("Error", "Failed to update status");
            }
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#EAB308" />
            </View>
        );
    }

    if (!order) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>Job not found</Text>
            </View>
        );
    }

    const isPickup = ['driver_assigned_pickup', 'en_route_pickup'].includes(order.status);
    const address = isPickup ? order.pickupAddress : order.deliveryAddress;
    const actionLabel = order.status === 'driver_assigned_pickup' ? 'Start Trip' :
        order.status === 'en_route_pickup' ? 'Confirm Pickup' : 'View Status';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Job #{order.id.slice(0, 8)}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content}>
                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapText}>Map View Placeholder</Text>
                    <Text style={styles.mapSubtext}>{address.street}</Text>
                </View>

                {/* Customer Info */}
                <View style={styles.section}>
                    <Text style={styles.label}>CUSTOMER</Text>
                    <Text style={styles.value}>{order.customerName || 'Customer'}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(`tel:${order.customerPhone}`)}>
                            <Text style={styles.contactText}>📞 Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(`sms:${order.customerPhone}`)}>
                            <Text style={styles.contactText}>💬 Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Address */}
                <View style={styles.section}>
                    <Text style={styles.label}>{isPickup ? 'PICKUP' : 'DELIVERY'} ADDRESS</Text>
                    <Text style={styles.value}>{address.street}</Text>
                    <Text style={styles.subtext}>{address.city}, {address.state} {address.zip}</Text>
                    {address.instructions && <Text style={[styles.subtext, { color: '#EAB308', marginTop: 4 }]}>Note: {address.instructions}</Text>}

                    <TouchableOpacity style={styles.navButton} onPress={handleNavigate}>
                        <Text style={styles.navText}>Navigate (Google Maps)</Text>
                    </TouchableOpacity>
                </View>

                {/* Order Details */}
                <View style={styles.section}>
                    <Text style={styles.label}>ORDER DETAILS</Text>
                    {order.items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={styles.itemText}>{item.quantity}x {item.name}</Text>
                            <Text style={styles.itemText}>{item.unit === 'lb' ? `${item.quantity} lbs` : ''}</Text>
                        </View>
                    ))}
                    <View style={[styles.itemRow, { marginTop: 8, borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 8 }]}>
                        <Text style={[styles.itemText, { fontWeight: 'bold', color: 'white' }]}>Total Payout</Text>
                        <Text style={[styles.itemText, { fontWeight: 'bold', color: '#EAB308' }]}>$15.00</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Actions */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.primaryButton, { opacity: actionLabel === 'View Status' ? 0.5 : 1 }]}
                    onPress={handleStatusUpdate}
                    disabled={actionLabel === 'View Status'}
                >
                    <Text style={styles.primaryButtonText}>{actionLabel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
    backButton: { padding: 8 },
    backText: { color: '#EAB308', fontSize: 16, fontWeight: '600' },
    title: { color: 'white', fontSize: 18, fontWeight: 'bold' },

    content: { flex: 1 },
    mapPlaceholder: { height: 200, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    mapText: { color: '#64748B', fontWeight: 'bold' },
    mapSubtext: { color: '#475569', fontSize: 12, marginTop: 4 },

    section: { paddingHorizontal: 20, marginBottom: 32 },
    label: { color: '#64748B', fontSize: 12, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
    value: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 8 },
    subtext: { color: '#94A3B8', fontSize: 14 },

    row: { flexDirection: 'row', gap: 12, marginTop: 12 },
    contactButton: { backgroundColor: '#334155', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
    contactText: { color: 'white', fontWeight: '600' },

    navButton: { backgroundColor: '#3B82F6', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
    navText: { color: 'white', fontWeight: 'bold' },

    itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    itemText: { color: '#CBD5E1' },

    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#1E293B', backgroundColor: '#0F172A' },
    primaryButton: { backgroundColor: '#EAB308', padding: 16, borderRadius: 12, alignItems: 'center' },
    primaryButtonText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});
