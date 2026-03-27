import { useCallback } from "react";

/**
 * Basic email validation (lightweight, not RFC-complete by design)
 */
export function useFormSubmit(
  onSuccess: () => void,
  onError: (msg: string) => void,
  onSending: () => void
) {
  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);

      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const question = String(data.get("question") ?? "").trim();

      /**
       * Basic email validation (lightweight, not RFC-complete by design)
       */
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) return onError("form.error.invalidEmail");
      if (name.length < 2) return onError("form.error.shortName");
      if (question.length < 1) return onError("form.error.emptyQuestion");

      onSending();

      /**
       * Payload sent to external form service
       */
      const payload = {
        access_key: "b348d75e-6d01-409a-80c8-2f8e6ae0c4ad",
        name,
        email,
        question,
      };

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        if (json.success) onSuccess();
        else onError("Something went wrong.");
      } catch {
        /**
         * Handles form submission with validation and async request.
         * Encapsulates form logic to keep components clean.
         */
        onError("Cannot reach the Oracle.");
      }
    },
    [onSuccess, onError, onSending]
  );

  return { submitHandler };
}
