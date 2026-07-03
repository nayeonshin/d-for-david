import { CreateRoomButton } from "./CreateRoomButton";
import { JoinRoomForm } from "./JoinRoomForm";
import { PrivacyWarning } from "./PrivacyWarning";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <header className="space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm">
            <span className="text-3xl text-ink">D</span>
          </div>
          <p className="mx-auto inline-flex rounded-full border border-black/10 bg-white px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
            Temporary phone-call helper
          </p>
          <div className="space-y-3">
            <h1 className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              D for David
            </h1>
            <p className="text-2xl font-medium text-slate-700 sm:text-3xl">
              Stop spelling things over the phone.
            </p>
          </div>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Create a temporary room, share a short code, and type what the
            other person needs to see live.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
          <CreateRoomButton />

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-sm font-medium text-slate-400">or</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <JoinRoomForm />

          <PrivacyWarning />
        </section>
      </div>
    </main>
  );
}
