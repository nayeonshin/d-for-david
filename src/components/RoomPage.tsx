"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getCreatorToken } from "@/lib/creator-token";
import { RoomCodeDisplay } from "./RoomCodeDisplay";
import { CopyButton } from "./CopyButton";
import { CountdownTimer } from "./CountdownTimer";
import { ExpirationNotice } from "./ExpirationNotice";
import { PrivacyWarning } from "./PrivacyWarning";
import { WriterPanel } from "./WriterPanel";
import { ViewerPanel } from "./ViewerPanel";
import { InvalidRoomState } from "./InvalidRoomState";
import { ExpiredRoomState } from "./ExpiredRoomState";

interface RoomPageProps {
  code: string;
}

export function RoomPage({ code }: RoomPageProps) {
  const normalizedCode = code.toUpperCase();
  const room = useQuery(api.rooms.getRoomByCode, { code: normalizedCode });
  const [creatorToken, setCreatorToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [forceExpired, setForceExpired] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCreatorToken(getCreatorToken(normalizedCode));
  }, [normalizedCode]);

  const roomUrl = useMemo(() => {
    if (typeof window === "undefined") return `/${normalizedCode}`;
    return `${window.location.origin}/${normalizedCode}`;
  }, [normalizedCode]);

  if (room === undefined || !mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-black/10 bg-white px-6 py-4 shadow-sm">
          <p className="text-lg font-medium text-ink">Loading room...</p>
        </div>
      </div>
    );
  }

  if (room.status === "not_found") {
    return <InvalidRoomState />;
  }

  if (room.status === "expired" || forceExpired) {
    return <ExpiredRoomState />;
  }

  const isCreator = creatorToken !== null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <RoomCodeDisplay code={room.code} />

        <div className="flex flex-wrap justify-center gap-3">
          <CopyButton label="Copy Room Link" value={roomUrl} />
          <CopyButton label="Copy Room Code" value={room.code} />
        </div>

        <ExpirationNotice code={room.code} />

        <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-center shadow-sm">
          <CountdownTimer
            expiresAt={room.expiresAt}
            onExpired={() => setForceExpired(true)}
          />
        </div>

        {isCreator && creatorToken ? (
          <WriterPanel
            code={room.code}
            initialText={room.text}
            creatorToken={creatorToken}
          />
        ) : (
          <ViewerPanel text={room.text} />
        )}

        <PrivacyWarning compact />
        <p className="text-center text-xs text-slate-500">
          Do not use for passwords, SSNs, full credit card numbers, or highly
          sensitive information.
        </p>
      </div>
    </main>
  );
}
