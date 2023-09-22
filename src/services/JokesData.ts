import React from "react";

export interface Joke {
  attachments: Attachment[];
  response_type: string;
  username: string;
}

export interface Attachment {
  fallback: string;
  footer: string;
  text: string;
}
