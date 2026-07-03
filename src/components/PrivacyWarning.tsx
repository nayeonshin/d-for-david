export function PrivacyWarning({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-center text-sm text-slate-600">
        Temporary rooms. No login. Auto-deletes after 30 minutes.
      </p>
    );
  }

  return (
    <div className="space-y-2 text-center text-sm text-slate-600">
      <p>Temporary rooms. No login. Auto-deletes after 30 minutes.</p>
      <p className="text-slate-700">
        Do not use for passwords, SSNs, full credit card numbers, or highly
        sensitive information.
      </p>
    </div>
  );
}
