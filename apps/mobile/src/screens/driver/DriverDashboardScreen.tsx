import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDriverOrders } from '../../hooks/useDriverOrders';

type DriverStackParamList = {
    JobDetails: { jobId: string };
};

export default function DriverDashboardScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<DriverStackParamList>>();
    const { orders, loading, isOnline, toggleOnlineStatus, driverProfile } = useDriverOrders();
    const [activeTab, setActiveTab] = useState<'current' | 'upcoming'>('current');

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#EAB308" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, {driverProfile?.displayName?.split(' ')[0] || 'Driver'} 👋</Text>
                    <Text style={styles.subtext}>Ready to hit the road?</Text>
                </View>
                <TouchableOpacity
                    style={[styles.statusButton, isOnline ? styles.online : styles.offline]}
                    onPress={toggleOnlineStatus}
                >
                    <Text style={styles.statusText}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
                </TouchableOpacity>
            </View>

            {/* Stats Summary */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>${driverProfile?.walletBalance || 0}</Text>
                    <Text style={styles.statLabel}>Earnings</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>5.0</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'current' && styles.activeTab]}
                    onPress={() => setActiveTab('current')}
                >
                    <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>Current Job</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming ({orders.length})</Text>
                </TouchableOpacity>
            </View>

            {/* Job List */}
            <ScrollView style={styles.content}>
                {!isOnline ? (
                    <View style={styles.offlineState}>
                        <Text style={styles.offlineText}>You are currently offline.</Text>
                        <Text style={styles.offlineSubtext}>Go online to start receiving jobs.</Text>
                    </View>
                ) : orders.length === 0 ? (
                    <View style={styles.offlineState}>
                        <Text style={styles.offlineText}>No active jobs.</Text>
                        <Text style={styles.offlineSubtext}>Wait for dispatch...</Text>
                    </View>
                ) : (
                    orders.map(order => (
                        <View key={order.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.jobType}>PICKUP</Text>
                                <Text style={styles.time}>ASAP</Text>
                            </View>
                            <Text style={styles.customerName}>{order.customerName || 'Customer'}</Text>
                            <Text style={styles.address}>{order.pickupAddress.street}</Text>
                            <Text style={styles.items}>{order.items.length} Items</Text>

                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => navigation.navigate('JobDetails', { jobId: order.id })}
                                >
                                    <Text style={styles.actionButtonText}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A', paddingTop: 60, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    greeting: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    subtext: { color: '#94A3B8' },
    statusButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    online: { backgroundColor: '#10B981' },
    offline: { backgroundColor: '#64748B' },
    statusText: { color: 'white', fontWeight: 'bold', fontSize: 12 },

    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, backgroundColor: '#1E293B', borderRadius: 16, padding: 16 },
    statBox: { alignItems: 'center' },
    statValue: { fontSize: 20, fontWeight: 'bold', color: '#EAB308' },
    statLabel: { color: '#94A3B8', fontSize: 12 },

    tabs: { flexDirection: 'row', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
    tab: { marginRight: 24, paddingBottom: 12 },
    activeTab: { borderBottomWidth: 2, borderBottomColor: '#EAB308' },
    tabText: { color: '#94A3B8', fontWeight: '600' },
    activeTabText: { color: '#EAB308' },

    content: { flex: 1 },
    offlineState: { alignItems: 'center', marginTop: 60 },
    offlineText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    offlineSubtext: { color: '#94A3B8', marginTop: 8 },

    card: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16, marginBottom: 16 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    jobType: { backgroundColor: '#3B82F6', color: 'white', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, overflow: 'hidden' },
    time: { color: '#EAB308', fontSize: 12, fontWeight: '600' },
    customerName: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    address: { color: '#94A3B8', marginBottom: 8 },
    items: { color: '#CBD5E1', fontSize: 12, marginBottom: 16 },
    actions: { flexDirection: 'row' },
    actionButton: { backgroundColor: '#334155', flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
    actionButtonText: { color: 'white', fontWeight: 'bold' }
});
