import React from 'react';
import { Droplets, Shirt, Leaf, Ban } from 'lucide-react';

interface PreferencesProps {
    preferences: {
        detergent: 'scented' | 'eco' | 'none';
        folding: 'konmari' | 'standard';
    };
    onChange: (prefs: any) => void;
}

export const Preferences = ({ preferences, onChange }: PreferencesProps) => {
    return (
        <div className="space-y-6">
            {/* Detergent Selection */}
            <div>
                <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Droplets size={16} className="text-hive-accent" /> Detergent Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        type="button"
                        onClick={() => onChange({ ...preferences, detergent: 'scented' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preferences.detergent === 'scented'
                                ? 'border-hive-accent bg-hive-accent/5 text-hive-accent'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                    >
                        <Droplets size={24} />
                        <span className="text-sm font-medium">Scented</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange({ ...preferences, detergent: 'eco' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preferences.detergent === 'eco'
                                ? 'border-green-500 bg-green-50 text-green-600'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                    >
                        <Leaf size={24} />
                        <span className="text-sm font-medium">Eco-Friendly</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange({ ...preferences, detergent: 'none' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preferences.detergent === 'none'
                                ? 'border-slate-900 bg-slate-50 text-slate-900'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                    >
                        <Ban size={24} />
                        <span className="text-sm font-medium">Hypoallergenic</span>
                    </button>
                </div>
            </div>

            {/* Folding Style */}
            <div>
                <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Shirt size={16} className="text-hive-accent" /> Folding Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => onChange({ ...preferences, folding: 'standard' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preferences.folding === 'standard'
                                ? 'border-hive-accent bg-hive-accent/5 text-hive-accent'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                    >
                        <div className="w-12 h-8 border-2 border-current rounded-sm"></div>
                        <span className="text-sm font-medium">Standard Fold</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange({ ...preferences, folding: 'konmari' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${preferences.folding === 'konmari'
                                ? 'border-purple-500 bg-purple-50 text-purple-600'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                    >
                        <div className="w-8 h-8 border-2 border-current rounded-sm rotate-45"></div>
                        <span className="text-sm font-medium">KonMari (Compact)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
