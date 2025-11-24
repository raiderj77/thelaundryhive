"use client";

export const useHaptic = () => {
    const vibrate = (pattern: number | number[] = 10) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const success = () => vibrate([10, 30, 10]);
    const error = () => vibrate([50, 30, 50, 30, 50]);
    const light = () => vibrate(5);

    return { vibrate, success, error, light };
};
