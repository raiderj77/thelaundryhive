import React, { useState } from 'react';
import { Camera, CheckCircle, Upload } from 'lucide-react';

interface ProofOfDeliveryProps {
    type: 'pickup' | 'dropoff';
    onComplete: (proof: { photoUrl?: string; signature?: string }) => void;
}

export const ProofOfDelivery = ({ type, onComplete }: ProofOfDeliveryProps) => {
    const [step, setStep] = useState<'camera' | 'review' | 'done'>('camera');
    const [photo, setPhoto] = useState<string | null>(null);

    const handleCapture = () => {
        // Simulate camera capture
        setPhoto("https://placehold.co/600x400/png?text=Proof+of+Delivery");
        setStep('review');
    };

    const handleConfirm = () => {
        setStep('done');
        onComplete({ photoUrl: photo! });
    };

    if (step === 'done') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-green-600 animate-in zoom-in duration-300">
                <CheckCircle size={48} className="mb-4" />
                <h3 className="text-xl font-bold">Proof Verified</h3>
                <p className="text-sm opacity-80">Order updated successfully.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-2xl max-w-md mx-auto">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                    <Camera size={18} className="text-hive-accent" />
                    {type === 'pickup' ? 'Verify Pickup' : 'Confirm Delivery'}
                </h3>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Step {step === 'camera' ? '1/2' : '2/2'}</span>
            </div>

            <div className="relative aspect-[3/4] bg-black flex flex-col items-center justify-center">
                {photo ? (
                    <img src={photo} alt="Proof" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center p-8">
                        <div className="w-16 h-16 border-2 border-dashed border-slate-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <Upload size={24} className="text-slate-600" />
                        </div>
                        <p className="text-slate-400 text-sm mb-8">Align bags within the frame</p>
                    </div>
                )}

                {/* Camera Overlay UI */}
                {!photo && (
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                        <button
                            onClick={handleCapture}
                            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            <div className="w-12 h-12 bg-white rounded-full"></div>
                        </button>
                    </div>
                )}
            </div>

            {step === 'review' && (
                <div className="p-4 flex gap-3">
                    <button
                        onClick={() => { setPhoto(null); setStep('camera'); }}
                        className="flex-1 py-3 rounded-lg font-bold text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                        Retake
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 bg-hive-accent text-white rounded-lg font-bold hover:brightness-110 transition-all shadow-lg shadow-hive-accent/20"
                    >
                        Submit Proof
                    </button>
                </div>
            )}
        </div>
    );
};
