import React, { useState } from 'react';
import { Settings, Timer, AlertTriangle, CheckCircle, Power } from 'lucide-react';

type MachineStatus = 'available' | 'running' | 'maintenance' | 'offline';

interface Machine {
    id: string;
    name: string;
    type: 'washer' | 'dryer';
    status: MachineStatus;
    timeLeft?: number; // minutes
    cycle?: string;
}

const MOCK_MACHINES: Machine[] = [
    { id: 'W1', name: 'Washer 1', type: 'washer', status: 'running', timeLeft: 24, cycle: 'Heavy Duty' },
    { id: 'W2', name: 'Washer 2', type: 'washer', status: 'available' },
    { id: 'W3', name: 'Washer 3', type: 'washer', status: 'maintenance' },
    { id: 'W4', name: 'Washer 4', type: 'washer', status: 'running', timeLeft: 12, cycle: 'Quick Wash' },
    { id: 'D1', name: 'Dryer 1', type: 'dryer', status: 'available' },
    { id: 'D2', name: 'Dryer 2', type: 'dryer', status: 'running', timeLeft: 45, cycle: 'High Heat' },
    { id: 'D3', name: 'Dryer 3', type: 'dryer', status: 'offline' },
    { id: 'D4', name: 'Dryer 4', type: 'dryer', status: 'available' },
];

export const MachineGrid = () => {
    const [machines, setMachines] = useState(MOCK_MACHINES);

    const getStatusColor = (status: MachineStatus) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-700 border-green-200';
            case 'running': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'maintenance': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'offline': return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {machines.map(machine => (
                <div
                    key={machine.id}
                    className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-md ${machine.status === 'running' ? 'border-blue-500 shadow-blue-100' : 'border-slate-100 bg-white'
                        }`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{machine.type}</span>
                            <h3 className="text-lg font-bold text-slate-900">{machine.name}</h3>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1 ${getStatusColor(machine.status)}`}>
                            {machine.status === 'running' && <Timer size={12} className="animate-pulse" />}
                            {machine.status === 'maintenance' && <Settings size={12} />}
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

                    {/* Quick Actions Overlay (Hover) */}
                    <div className="absolute inset-0 bg-white/90 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-xl backdrop-blur-sm">
                        <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600" title="Settings">
                            <Settings size={20} />
                        </button>
                        {machine.status === 'available' && (
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-200">
                                Start Cycle
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
