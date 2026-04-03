import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./layouts/Layout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import { HomePage } from "./pages/HomePage";
import { PatternPage } from "./pages/PatternPage";
import { ScorePage } from "./pages/ScorePage";
import { CompliancePage } from "./pages/CompliancePage";
import { MaturityPage } from "./pages/MaturityPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ReportPage } from "./pages/ReportPage";
import { ConvincePage } from "./pages/ConvincePage";
import { SecurityDesignReviewPattern } from "./patterns/governance/SecurityDesignReviewPattern";
import { ChangeManagementPattern } from "./patterns/governance/ChangeManagementPattern";
import { ComplianceAuditPattern } from "./patterns/governance/ComplianceAuditPattern";
import { LoginPattern } from "./patterns/auth/LoginPattern";
import { MfaPattern } from "./patterns/auth/MfaPattern";
import { PasswordStrengthPattern } from "./patterns/auth/PasswordStrengthPattern";
import { SessionTimeoutPattern } from "./patterns/auth/SessionTimeoutPattern";
import { AccountRecoveryPattern } from "./patterns/auth/AccountRecoveryPattern";
import { PasskeysPattern } from "./patterns/auth/PasskeysPattern";
import { OAuthConsentPattern } from "./patterns/auth/OAuthConsentPattern";
import { AccessibleAuthPattern } from "./patterns/auth/AccessibleAuthPattern";
import { BreachNotificationPattern } from "./patterns/threat/BreachNotificationPattern";
import { PhishingWarningPattern } from "./patterns/threat/PhishingWarningPattern";
import { SuspiciousActivityPattern } from "./patterns/threat/SuspiciousActivityPattern";
import { ConfirmshamingPattern } from "./patterns/darkpatterns/ConfirmshamingPattern";
import { CookieConsentPattern } from "./patterns/darkpatterns/CookieConsentPattern";
import { HiddenUnsubscribePattern } from "./patterns/darkpatterns/HiddenUnsubscribePattern";
import { PrivacyZuckeringPattern } from "./patterns/darkpatterns/PrivacyZuckeringPattern";
import { BaitSwitchPattern } from "./patterns/darkpatterns/BaitSwitchPattern";
import { ForcedContinuityPattern } from "./patterns/darkpatterns/ForcedContinuityPattern";
import { EncryptionIndicatorPattern } from "./patterns/data/EncryptionIndicatorPattern";
import { SecureFileUploadPattern } from "./patterns/data/SecureFileUploadPattern";
import { DataDeletionPattern } from "./patterns/data/DataDeletionPattern";
import { ActivityLogPattern } from "./patterns/data/ActivityLogPattern";
import { BrokenAccessControlPattern } from "./patterns/owasp/BrokenAccessControlPattern";
import { SecurityMisconfigPattern } from "./patterns/owasp/SecurityMisconfigPattern";
import { LoggingMonitoringPattern } from "./patterns/owasp/LoggingMonitoringPattern";
import { AIDisclosurePattern } from "./patterns/ai/AIDisclosurePattern";
import { AIContentLabelingPattern } from "./patterns/ai/AIContentLabelingPattern";
import { AIDecisionExplanationPattern } from "./patterns/ai/AIDecisionExplanationPattern";
import { OperatorAuthPattern } from "./patterns/industrial/OperatorAuthPattern";
import { SafetyCriticalPattern } from "./patterns/industrial/SafetyCriticalPattern";
import { AlarmFatiguePattern } from "./patterns/industrial/AlarmFatiguePattern";
import { NavigationLevelsPattern } from "./patterns/industrial/NavigationLevelsPattern";
import { RipplePage } from "./pages/RipplePage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="score" element={<ScorePage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="maturity" element={<MaturityPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="convince" element={<ConvincePage />} />
          <Route path="ripple" element={<RipplePage />} />
          <Route path="patterns/governance/design-review" element={<PatternPage><SecurityDesignReviewPattern /></PatternPage>} />
          <Route path="patterns/governance/change-management" element={<PatternPage><ChangeManagementPattern /></PatternPage>} />
          <Route path="patterns/governance/compliance-audit" element={<PatternPage><ComplianceAuditPattern /></PatternPage>} />
          <Route path="patterns/auth/login" element={<PatternPage><LoginPattern /></PatternPage>} />
          <Route path="patterns/auth/mfa" element={<PatternPage><MfaPattern /></PatternPage>} />
          <Route path="patterns/auth/password-strength" element={<PatternPage><PasswordStrengthPattern /></PatternPage>} />
          <Route path="patterns/auth/session-timeout" element={<PatternPage><SessionTimeoutPattern /></PatternPage>} />
          <Route path="patterns/auth/account-recovery" element={<PatternPage><AccountRecoveryPattern /></PatternPage>} />
          <Route path="patterns/auth/passkeys" element={<PatternPage><PasskeysPattern /></PatternPage>} />
          <Route path="patterns/auth/oauth-consent" element={<PatternPage><OAuthConsentPattern /></PatternPage>} />
          <Route path="patterns/auth/accessible-auth" element={<PatternPage><AccessibleAuthPattern /></PatternPage>} />
          <Route path="patterns/threat/breach-notification" element={<PatternPage><BreachNotificationPattern /></PatternPage>} />
          <Route path="patterns/threat/phishing-warning" element={<PatternPage><PhishingWarningPattern /></PatternPage>} />
          <Route path="patterns/threat/suspicious-activity" element={<PatternPage><SuspiciousActivityPattern /></PatternPage>} />
          <Route path="patterns/dark/confirmshaming" element={<PatternPage><ConfirmshamingPattern /></PatternPage>} />
          <Route path="patterns/dark/cookie-consent" element={<PatternPage><CookieConsentPattern /></PatternPage>} />
          <Route path="patterns/dark/hidden-unsubscribe" element={<PatternPage><HiddenUnsubscribePattern /></PatternPage>} />
          <Route path="patterns/dark/privacy-zuckering" element={<PatternPage><PrivacyZuckeringPattern /></PatternPage>} />
          <Route path="patterns/dark/bait-switch" element={<PatternPage><BaitSwitchPattern /></PatternPage>} />
          <Route path="patterns/dark/forced-continuity" element={<PatternPage><ForcedContinuityPattern /></PatternPage>} />
          <Route path="patterns/data/encryption" element={<PatternPage><EncryptionIndicatorPattern /></PatternPage>} />
          <Route path="patterns/data/file-upload" element={<PatternPage><SecureFileUploadPattern /></PatternPage>} />
          <Route path="patterns/data/deletion" element={<PatternPage><DataDeletionPattern /></PatternPage>} />
          <Route path="patterns/data/activity-log" element={<PatternPage><ActivityLogPattern /></PatternPage>} />
          <Route path="patterns/owasp/broken-access-control" element={<PatternPage><BrokenAccessControlPattern /></PatternPage>} />
          <Route path="patterns/owasp/security-misconfiguration" element={<PatternPage><SecurityMisconfigPattern /></PatternPage>} />
          <Route path="patterns/owasp/logging-monitoring" element={<PatternPage><LoggingMonitoringPattern /></PatternPage>} />
          <Route path="patterns/ai/disclosure" element={<PatternPage><AIDisclosurePattern /></PatternPage>} />
          <Route path="patterns/ai/content-labeling" element={<PatternPage><AIContentLabelingPattern /></PatternPage>} />
          <Route path="patterns/ai/decision-explanation" element={<PatternPage><AIDecisionExplanationPattern /></PatternPage>} />
          <Route path="patterns/industrial/operator-auth" element={<PatternPage><OperatorAuthPattern /></PatternPage>} />
          <Route path="patterns/industrial/safety-critical" element={<PatternPage><SafetyCriticalPattern /></PatternPage>} />
          <Route path="patterns/industrial/alarm-fatigue" element={<PatternPage><AlarmFatiguePattern /></PatternPage>} />
          <Route path="patterns/industrial/navigation-levels" element={<PatternPage><NavigationLevelsPattern /></PatternPage>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
