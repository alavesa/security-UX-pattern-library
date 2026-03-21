import { useState, useRef, useEffect } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Trash2, Download, CheckCircle2, AlertTriangle, Clock, Shield, Loader2 } from "lucide-react";

function DataDeletionDemo() {
  const [step, setStep] = useState<"overview" | "export" | "confirm" | "processing" | "done">("overview");
  const [exportDone, setExportDone] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [returnToConfirm, setReturnToConfirm] = useState(false);
  const [deletionRef] = useState(() => `DEL-${Date.now()}`);
  const exportTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const deleteTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      clearTimeout(exportTimerRef.current);
      clearTimeout(deleteTimerRef.current);
    };
  }, []);

  const reset = () => {
    setStep("overview");
    setExportDone(false);
    setConfirmText("");
    setReturnToConfirm(false);
  };

  const handleExport = () => {
    if (exportDone || step === "export") return;
    setStep("export");
    exportTimerRef.current = setTimeout(() => setExportDone(true), 2000);
  };

  const handleExportFromConfirm = () => {
    setReturnToConfirm(true);
    handleExport();
  };

  const handleDelete = () => {
    if (confirmText.trim() !== "DELETE MY ACCOUNT") return;
    setStep("processing");
    deleteTimerRef.current = setTimeout(() => setStep("done"), 3000);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl border p-6" aria-live="polite">

        {step === "overview" && (
          <div>
            <h3 className="font-bold mb-1">Your data</h3>
            <p className="text-sm mb-6">Review, export, or delete your personal data.</p>

            {/* Data summary */}
            <div className="space-y-3 mb-6">
              {[
                { category: "Profile", items: "Name, email, avatar, bio", size: "2 KB" },
                { category: "Content", items: "42 posts, 128 comments, 15 uploads", size: "156 MB" },
                { category: "Activity", items: "Login history, preferences, analytics", size: "12 KB" },
                { category: "Messages", items: "3 conversations, 89 messages", size: "45 KB" },
              ].map(({ category, items, size }) => (
                <div key={category} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="text-sm font-medium">{category}</p>
                    <p className="text-xs">{items}</p>
                  </div>
                  <span className="text-xs">{size}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:">
                <Download className="w-4 h-4" /> Export all my data
              </button>
              <button onClick={() => setStep("confirm")} className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:">
                <Trash2 className="w-4 h-4" /> Delete all my data
              </button>
            </div>

            <p className="text-xs mt-3 text-center">
              Data export complies with GDPR Article 20 (Right to Data Portability)
            </p>
          </div>
        )}

        {step === "export" && (
          <div className="text-center">
            {!exportDone ? (
              <>
                <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin" />
                <h3 className="font-bold mb-1">Preparing your data export</h3>
                <p className="text-sm">This may take a moment...</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-bold mb-1">Export ready</h3>
                <p className="text-sm mb-4">Your data has been packaged as a ZIP file.</p>

                <div className="border rounded-lg p-4 mb-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-medium">Export details</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>Format: JSON + media files in ZIP</li>
                    <li>Size: 156 MB</li>
                    <li>Download link expires in 48 hours</li>
                    <li>Encrypted with your account password</li>
                  </ul>
                </div>

                <button className="w-full text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download export (156 MB)
                </button>
                {returnToConfirm && (
                  <button onClick={() => { setReturnToConfirm(false); setStep("confirm"); }} className="mt-3 w-full border py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:">
                    Continue to deletion
                  </button>
                )}
                <button onClick={() => { setReturnToConfirm(false); setStep("overview"); }} className="mt-3 text-xs bg-transparent border-none cursor-pointer hover:">
                  Back to data overview
                </button>
              </>
            )}
          </div>
        )}

        {step === "confirm" && (
          <div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Delete all data permanently?</h3>
                <p className="text-sm">This action cannot be undone.</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 mb-4">
              <h4 className="text-xs font-semibold mb-2">What will be permanently deleted:</h4>
              <ul className="text-xs space-y-1">
                <li>Your profile and account credentials</li>
                <li>42 posts and 128 comments</li>
                <li>15 uploaded files (156 MB)</li>
                <li>3 conversations and 89 messages</li>
                <li>All activity history and preferences</li>
              </ul>
            </div>

            {!exportDone && (
              <div className="border rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <strong>Recommended:</strong> Export your data before deleting.
                  <button onClick={handleExportFromConfirm} className="underline ml-1 bg-transparent border-none cursor-pointer">Download my data first</button>
                </div>
              </div>
            )}

            {exportDone && (
              <div className="border rounded-lg p-3 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-xs">Data export downloaded</span>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-medium mb-1">
                Type <strong>DELETE MY ACCOUNT</strong> to confirm
              </label>
              <input
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                placeholder="DELETE MY ACCOUNT"
                autoComplete="off"
                className="w-full px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2"
              />
            </div>

            <div className="border rounded-lg p-3 mb-4 flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="text-xs">
                <strong>30-day grace period:</strong> After confirming, your account will be deactivated immediately but data is retained for 30 days. You can recover your account during this period by signing in.
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleDelete}
                disabled={confirmText.trim() !== "DELETE MY ACCOUNT"}
                className="w-full text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Permanently delete my account
              </button>
              <button onClick={() => setStep("overview")} className="w-full border py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:">
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-8">
            <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin" />
            <h3 className="font-bold mb-1">Deleting your data</h3>
            <p className="text-sm">This is being processed securely...</p>
          </div>
        )}

        {step === "done" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Account deletion initiated</h3>
            <p className="text-sm mb-4">Your account has been deactivated and data deletion has been scheduled.</p>

            <div className="border rounded-lg p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5" />
                30-day grace period started — sign in to cancel
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmation email sent to your address
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-3.5 h-3.5" />
                Data will be permanently erased after grace period
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-3.5 h-3.5" />
                GDPR deletion reference: {deletionRef}
              </div>
            </div>
          </div>
        )}
      </div>

      {step !== "overview" && (
        <button onClick={reset} className="mt-4 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
          Reset demo
        </button>
      )}
    </div>
  );
}

export function DataDeletionPattern() {
  return (
    <div>
      <PatternHeader
        title="Data Deletion"
        description="GDPR-compliant data deletion with export, typed confirmation, grace period, and audit trail. Respects the right to erasure while preventing accidental data loss."
        severity="critical"
        tags={["Data Protection", "GDPR Art. 17", "CWE-212"]}
      />

      <DemoContainer label="data deletion flow">
        <DataDeletionDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Show a data overview before deletion — let users see what they're deleting",
          "Offer data export BEFORE deletion (GDPR Article 20 — Right to Data Portability)",
          "Require typed confirmation for destructive actions ('DELETE MY ACCOUNT')",
          "Implement a 30-day grace period for account recovery",
          "Send a confirmation email with a deletion reference number",
          "Actually delete the data after the grace period — don't just mark it as deleted",
          "Show a clear timeline of what happens next",
          "Provide a GDPR deletion reference for compliance records",
        ]}
        donts={[
          "Don't delete immediately without confirmation — accidents happen",
          "Don't skip the export option — users have a legal right to their data",
          "Don't make deletion a 5-step process with retention offers (see Hidden Unsubscribe dark pattern)",
          "Don't 'soft delete' forever — GDPR requires actual erasure",
          "Don't delete shared data (conversations) without notifying other participants",
          "Don't forget backups — deletion must propagate to all storage systems",
          "Don't require users to contact support to delete their account",
        ]}
        securityRationale="GDPR Article 17 (Right to Erasure) requires organizations to delete personal data upon request 'without undue delay.' CWE-212 (Improper Removal of Sensitive Data) covers failures to properly erase data. The typed confirmation prevents accidental deletion. The grace period prevents social engineering attacks where someone gains temporary access and deletes the victim's account. The export-before-delete flow respects Article 20 (Data Portability) and reduces support tickets from users who deleted prematurely."
        accessibilityNotes={[
          "Typed confirmation field must have a visible label, not just placeholder",
          "The data summary table should be screen reader navigable",
          "Destructive buttons use red to signal danger but also include warning icons",
          "Progress/processing states use both animation and text description",
          "Grace period information is in visible text, not tooltip-only",
        ]}
      />
    </div>
  );
}
