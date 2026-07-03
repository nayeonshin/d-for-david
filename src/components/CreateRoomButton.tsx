"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { saveCreatorToken } from "@/lib/creator-token";

export function CreateRoomButton() {
  const router = useRouter();
  const createRoom = useMutation(api.rooms.createRoom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const { code, creatorToken } = await createRoom();
      saveCreatorToken(code, creatorToken);
      router.push(`/r/${code}`);
    } catch (err) {
      console.error("Failed to create room:", err);
      setError(
        err instanceof Error && err.message !== "Internal Server Error"
          ? err.message
          : "Could not create a room right now. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="flex min-h-14 w-full items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating room..." : "Create Room"}
      </button>
      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
