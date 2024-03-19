import "server-only"

import { cookies } from "next/headers"
import { kv } from "@vercel/kv"

type SessionId = string;

export function getSessionId(): SessionId | undefined {
    const cookieStore = cookies();
    return cookieStore.get("session-id")?.value;
}

async function setSessionId(sessionId: SessionId) {
    'use server'
    const cookieStore = cookies();
    cookieStore.set("session-id", sessionId);
}

export function getSessionIdAndCreateIfMissing() {
    const sessionId = getSessionId();
    if (!sessionId) {
        const newSessionId = crypto.randomUUID();
        setSessionId(newSessionId);

        return newSessionId;
    }

    return sessionId;
}

export function getSession(key: string, namespace: string = "") {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    return kv.hget(`session-${namespace}-${sessionId}`, key);
}

export function getAll(namespace: string = "") {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    return kv.hgetall(`session-${namespace}-${sessionId}`);
}

export function setSession(key: string, value: string, namespace: string = "") {
    const sessionId = getSessionIdAndCreateIfMissing();
    return kv.hset(`session-${namespace}-${sessionId}`, { [key]: value });
}