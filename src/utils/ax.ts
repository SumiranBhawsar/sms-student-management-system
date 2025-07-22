import axios from "axios";

export function getAxiosErrorMessage(
  error: unknown,
  defaultMessage = "An unknown error occurred."
): string {
  // Axios-specific error handling
  if (axios.isAxiosError(error)) {
    const { response, request, message } = error;

    // Server responded with an error (status outside 2xx)
    if (response) {
      const { data, status, statusText } = response;

      if (data && typeof data === "object") {
        const messageFromData =
          (data as any).message || (data as any).error || null;

        if (typeof messageFromData === "string") return messageFromData;

        return JSON.stringify(data); // Fallback: full data object
      }

      return `HTTP ${status}: ${statusText}`;
    }

    // No response from server (e.g., network issue or timeout)
    if (request) {
      return "Network error: No response received from the server.";
    }

    // Axios failed before request was sent
    return `Axios error: ${message}`;
  }

  // Native JS error
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback: unknown error type
  return defaultMessage;
}
