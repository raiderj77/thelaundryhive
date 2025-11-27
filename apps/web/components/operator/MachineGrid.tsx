import React, { useState } from 'react';
import { Settings, Timer, AlertTriangle, CheckCircle, Power, Plus, X, Play } from 'lucide-react';
import { useRealtimeMachines } from '@/hooks/use-realtime-machines';
import { Machine, MachineStatus } from '@/types';

export const MachineGrid = () => {
    // Hardcoded store ID for demo
    const { machines, loading, addMachine, updateMachineStatus } = useRealtimeMachines("1");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMachine, setNewMachine] = useState<Partial<Machine>>({ type: 'washer', status: 'available', name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getStatusColor = (status: MachineStatus) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-700 border-green-200';
            case 'running': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'maintenance': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'offline': return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    const handleAddMachine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMachine.name) return;

        setIsSubmitting(true);
        try {
            await addMachine({
                name: newMachine.name,
                type: newMachine.type as 'washer' | 'dryer',
                status: 'available',
                tenantId: '1'
            });
            setShowAddModal(false);
            setNewMachine({ type: 'washer', status: 'available', name: '' });
        } catch (error) {
            console.error("Error adding machine:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStartCycle = async (machineId: string) => {
        // Demo: Start a 30 min cycle
        await updateMachineStatus(machineId, 'running', 30, 'Standard Wash');
    };

    const handleStopCycle = async (machineId: string) => {
        await updateMachineStatus(machineId, 'available', 0, '');
    };

    if (loading) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading fleet status...</div>;

    return (
        <>
            {/* Mobile-friendly Header Action */}
            <div className="md:hidden mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full py-3 bg-hive-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                    <Plus size={20} /> Add Machine
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Add Card (Desktop) */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className="hidden md:flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-hive-primary hover:text-hive-primary hover:bg-hive-primary/5 transition-all min-h-[160px]"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 group-hover:bg-white">
                        <Plus size={24} />
                    </div>
                    <span className="font-bold">Add Machine</span>
                </button>

                {machines.map(machine => (
                    <div
                        key={machine.id}
                        className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-md ${machine.status === 'running' ? 'border-blue-500 shadow-blue-100' : 'border-slate-100 bg-white'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{machine.type}</span>
                                <h3 className="text-lg font-bold text-slate-900">{machine.name}</h3>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1 ${getStatusColor(machine.status)}`}>
                                {machine.status === 'running' && <Timer size={12} className="animate-pulse" />}
                                {machine.status === 'maintenance' && <AlertTriangle size={12} />}
                                {machine.status === 'available' && <CheckCircle size={12} />}
                                {machine.status === 'offline' && <Power size={12} />}
                                {machine.status}
                            </div>
                        </div>

                        {machine.status === 'running' ? (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">{machine.cycle}</span>
                                    <span className="font-bold text-blue-600">{machine.timeLeft}m left</span>
                                </div>
                                <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${100 - ((machine.timeLeft || 0) / 60 * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-12 flex items-center justify-center text-slate-300 text-sm italic">
                                {machine.status === 'available' ? 'Ready for load' : 'Unavailable'}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-4 flex gap-2">
                            {machine.status === 'available' && (
                                <button
                                    onClick={() => handleStartCycle(machine.id)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1"
                                >
                                    <Play size={14} /> Start
                                </button>
                            )}
                            {machine.status === 'running' && (
                                <button
                                    onClick={() => handleStopCycle(machine.id)}
                                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 rounded-lg font-bold text-xs"
                                >
                                    Stop
                                </button>
                            )}
                            <button
                                onClick={() => alert("Machine settings coming soon!")}
                                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-400"
                            >
                                <Settings size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Machine Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Add New Machine</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddMachine} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Machine Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="e.g. Washer 5"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hive-primary"
                                    value={newMachine.name}
                                    onChange={e => setNewMachine({ ...newMachine, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setNewMachine({ ...newMachine, type: 'washer' })}
                                        className={`py-3 rounded-xl font-bold border-2 transition-all ${newMachine.type === 'washer' ? 'border-hive-primary bg-hive-primary/5 text-hive-primary' : 'border-slate-100 text-slate-400'}`}
                                    >
                                        Washer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewMachine({ ...newMachine, type: 'dryer' })}
                                        className={`py-3 rounded-xl font-bold border-2 transition-all ${newMachine.type === 'dryer' ? 'border-hive-primary bg-hive-primary/5 text-hive-primary' : 'border-slate-100 text-slate-400'}`}
                                    >
                                        Dryer
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!newMachine.name || isSubmitting}
                                className="w-full bg-hive-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    "Add Machine"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
