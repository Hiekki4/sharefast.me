"use client"

import { createContext, useState, useContext } from "react";

type SettingsContextType = {
    settings: {
        code: string;
        expiresAfter: string;
        password: boolean;
    };
    updateSettings: (newData: { code?: string; expiresAfter?: string; password?: boolean }) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsWrapper({ data, children }: { data: any; children: React.ReactNode }) {
    const [settings, setSettings] = useState<{ code: string; expiresAfter: string; password: boolean }>({
        code: data.code,
        expiresAfter: data.expiresAfter,
        password: data.password
    })

    const updateSettings = (newData: { code?: string; expiresAfter?: string; password?: boolean }) => {
        setSettings((prevData) => ({
            code: newData.code || prevData.code,
            expiresAfter: newData.expiresAfter || prevData.expiresAfter,
            password: newData.password || prevData.password
        }))
    }

    const contextValue: SettingsContextType = {
        settings,
        updateSettings
    }

    return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
}

export function useSettingsContext() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error("useProfileContext must be used within an SettingsWrapper")
    }
    return context
}