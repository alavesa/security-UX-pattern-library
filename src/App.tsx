import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { HomePage } from "./pages/HomePage";
import { PatternPage } from "./pages/PatternPage";
import { LoginPattern } from "./patterns/auth/LoginPattern";
import { MfaPattern } from "./patterns/auth/MfaPattern";
import { PasswordStrengthPattern } from "./patterns/auth/PasswordStrengthPattern";
import { SessionTimeoutPattern } from "./patterns/auth/SessionTimeoutPattern";
import { AccountRecoveryPattern } from "./patterns/auth/AccountRecoveryPattern";
import { BreachNotificationPattern } from "./patterns/threat/BreachNotificationPattern";
import { PhishingWarningPattern } from "./patterns/threat/PhishingWarningPattern";
import { SuspiciousActivityPattern } from "./patterns/threat/SuspiciousActivityPattern";
import { ConfirmshamingPattern } from "./patterns/darkpatterns/ConfirmshamingPattern";
import { CookieConsentPattern } from "./patterns/darkpatterns/CookieConsentPattern";
import { HiddenUnsubscribePattern } from "./patterns/darkpatterns/HiddenUnsubscribePattern";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="patterns/auth/login" element={<PatternPage><LoginPattern /></PatternPage>} />
          <Route path="patterns/auth/mfa" element={<PatternPage><MfaPattern /></PatternPage>} />
          <Route path="patterns/auth/password-strength" element={<PatternPage><PasswordStrengthPattern /></PatternPage>} />
          <Route path="patterns/auth/session-timeout" element={<PatternPage><SessionTimeoutPattern /></PatternPage>} />
          <Route path="patterns/auth/account-recovery" element={<PatternPage><AccountRecoveryPattern /></PatternPage>} />
          <Route path="patterns/threat/breach-notification" element={<PatternPage><BreachNotificationPattern /></PatternPage>} />
          <Route path="patterns/threat/phishing-warning" element={<PatternPage><PhishingWarningPattern /></PatternPage>} />
          <Route path="patterns/threat/suspicious-activity" element={<PatternPage><SuspiciousActivityPattern /></PatternPage>} />
          <Route path="patterns/dark/confirmshaming" element={<PatternPage><ConfirmshamingPattern /></PatternPage>} />
          <Route path="patterns/dark/cookie-consent" element={<PatternPage><CookieConsentPattern /></PatternPage>} />
          <Route path="patterns/dark/hidden-unsubscribe" element={<PatternPage><HiddenUnsubscribePattern /></PatternPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
