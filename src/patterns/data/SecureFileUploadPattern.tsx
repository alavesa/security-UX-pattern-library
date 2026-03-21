import { useState, useCallback, useRef } from "react";
import { PatternHeader } from "../../components/PatternHeader";
import { DemoContainer } from "../../components/DemoContainer";
import { GuidelineSection } from "../../components/GuidelineSection";
import { Upload, FileText, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Loader2, Lock } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  size: string;
  status: "scanning" | "safe" | "infected" | "rejected";
  type: string;
}

function SecureFileUploadDemo() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((fileName: string) => {
    const id = crypto.randomUUID();
    const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
    const dangerousExts = ["exe", "bat", "cmd", "scr", "ps1", "vbs"];
    const size = `${(Math.random() * 5 + 0.1).toFixed(1)} MB`;

    if (dangerousExts.includes(ext)) {
      setFiles(f => [...f, { id, name: fileName, size, status: "rejected", type: ext }]);
      return;
    }

    setFiles(f => [...f, { id, name: fileName, size, status: "scanning", type: ext }]);

    setTimeout(() => {
      const isMalware = fileName.toLowerCase().includes("virus") || fileName.toLowerCase().includes("malware");
      setFiles(f => f.map(file =>
        file.id === id ? { ...file, status: isMalware ? "infected" : "safe" } : file
      ));
    }, 2000);
  }, []);

  const handleDemoFiles = () => {
    simulateUpload("quarterly-report.pdf");
    setTimeout(() => simulateUpload("budget.xlsx"), 500);
    setTimeout(() => simulateUpload("virus-payload.zip"), 1000);
    setTimeout(() => simulateUpload("setup.exe"), 1500);
  };

  const reset = () => setFiles([]);

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false); }}
          onDrop={e => { e.preventDefault(); setDragOver(false); Array.from(e.dataTransfer.files).forEach(f => simulateUpload(f.name)); }}
          onClick={() => inputRef.current?.click()}
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        >
          <input ref={inputRef} type="file" multiple className="sr-only" onChange={e => { Array.from(e.target.files ?? []).forEach(f => simulateUpload(f.name)); e.target.value = ""; }} />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 mb-1">Drop files here or click to browse</p>
          <p className="text-xs text-gray-400 mb-3">PDF, DOCX, XLSX, PNG, JPG up to 10 MB</p>
          <div className="flex items-center justify-center gap-2 text-xs text-green-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            All uploads are scanned for malware and encrypted in transit
          </div>
        </div>

        {/* Blocked types notice */}
        <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Executable files (.exe, .bat, .cmd, .scr, .ps1, .vbs) are blocked for security.</span>
        </div>

        <button onClick={handleDemoFiles} disabled={files.some(f => f.status === "scanning")} className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Simulate uploading 4 files
        </button>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2" aria-live="polite" aria-atomic="false">
            {files.map((file) => (
              <div key={file.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                file.status === "safe" ? "border-green-200 bg-green-50" :
                file.status === "infected" ? "border-red-200 bg-red-50" :
                file.status === "rejected" ? "border-red-200 bg-red-50" :
                "border-gray-200 bg-gray-50"
              }`}>
                <FileText className={`w-5 h-5 shrink-0 ${
                  file.status === "safe" ? "text-green-500" :
                  file.status === "infected" || file.status === "rejected" ? "text-red-500" :
                  "text-gray-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size} • .{file.type}</p>
                </div>
                <div className="shrink-0">
                  {file.status === "scanning" && (
                    <span className="flex items-center gap-1 text-xs text-blue-600"><Loader2 aria-hidden="true" className="w-3.5 h-3.5 animate-spin" /> Scanning</span>
                  )}
                  {file.status === "safe" && (
                    <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5" /> Safe</span>
                  )}
                  {file.status === "infected" && (
                    <span className="flex items-center gap-1 text-xs text-red-600"><XCircle aria-hidden="true" className="w-3.5 h-3.5" /> Malware detected</span>
                  )}
                  {file.status === "rejected" && (
                    <span className="flex items-center gap-1 text-xs text-red-600"><XCircle aria-hidden="true" className="w-3.5 h-3.5" /> Blocked filetype</span>
                  )}
                </div>
              </div>
            ))}

            {files.some(f => f.status === "safe") && (
              <div className="flex items-center gap-2 text-xs text-green-600 pt-2">
                <Lock className="w-3.5 h-3.5" />
                Safe files encrypted with AES-256 and uploaded successfully
              </div>
            )}
          </div>
        )}
      </div>

      {/* Demo hints */}
      <div className="mt-4 p-3 rounded-lg text-xs space-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--green)" }}>Demo simulates 4 files:</p>
        <p style={{ color: "var(--text)" }}><span style={{ color: "var(--green)" }}>quarterly-report.pdf</span> → scanned → safe</p>
        <p style={{ color: "var(--text)" }}><span style={{ color: "var(--green)" }}>budget.xlsx</span> → scanned → safe</p>
        <p style={{ color: "var(--text)" }}><span style={{ color: "var(--red)" }}>virus-payload.zip</span> → scanned → malware detected</p>
        <p style={{ color: "var(--text)" }}><span style={{ color: "var(--red)" }}>setup.exe</span> → blocked immediately (dangerous extension)</p>
      </div>

      {files.length > 0 && (
        <button onClick={reset} className="mt-2 text-xs hover:underline mx-auto block bg-transparent border-none cursor-pointer" style={{ color: "var(--text)" }}>
          Reset demo
        </button>
      )}
    </div>
  );
}

export function SecureFileUploadPattern() {
  return (
    <div>
      <PatternHeader
        title="Secure File Upload"
        description="How to design file uploads that protect users from malware — file type restrictions, real-time scanning, encryption indicators, and clear status feedback."
        severity="high"
        tags={["Data Protection", "OWASP A03", "CWE-434"]}
      />

      <DemoContainer label="secure file upload">
        <SecureFileUploadDemo />
      </DemoContainer>

      <GuidelineSection
        dos={[
          "Block dangerous file types (exe, bat, cmd, scr) BEFORE upload starts",
          "Scan every uploaded file for malware and show real-time scan status",
          "Show allowed file types and size limits BEFORE the user selects a file",
          "Encrypt files in transit (TLS) and at rest (AES-256)",
          "Display per-file status: scanning → safe/infected → uploaded",
          "Provide clear feedback when a file is blocked and explain why",
          "Show the encryption status after successful upload",
        ]}
        donts={[
          "Don't accept files without scanning — even from trusted users (CWE-434)",
          "Don't rely only on file extension checking — validate MIME types and magic bytes server-side",
          "Don't show 'Upload complete' before the malware scan finishes",
          "Don't silently reject files — always explain why something was blocked",
          "Don't allow unlimited file sizes — it enables denial-of-service",
          "Don't store uploaded files in a publicly accessible directory",
          "Don't execute or render uploaded files without sandboxing",
        ]}
        securityRationale="Unrestricted file upload (CWE-434) is OWASP A03 (Injection). Uploaded files are the #1 vector for malware delivery to internal systems. The UX must make security measures visible: show the scan happening (builds confidence), block dangerous types upfront (prevents wasted time), and confirm encryption (builds trust). The key insight: if the security process is invisible, users either assume it's not there or try to bypass visible restrictions."
        accessibilityNotes={[
          "File status changes announced via aria-live regions",
          "Drag and drop zone has a keyboard-accessible 'browse' alternative",
          "Status icons paired with text labels — not color alone",
          "Scanning animation includes text ('Scanning...') for screen readers",
          "Error messages explain what to do ('blocked filetype' → which types are allowed)",
        ]}
      />
    </div>
  );
}
