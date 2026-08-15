export interface Joke {
  attachments: Attachment[];
  response_type?: string;
  username?: string;
}

export interface Attachment {
  fallback: string;
  footer: string;
  text: string;
}

/** Returns the first attachment's text, or "" when unavailable. */
export const getJokeText = (joke: Joke | null): string =>
  joke?.attachments?.[0]?.text ?? "";
