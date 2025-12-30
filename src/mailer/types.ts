export type MailAddress = { email: string; name?: string };

export type MailMessage = {
  from: MailAddress;
  to: MailAddress[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: MailAddress;
};

export interface Mailer {
  send(message: MailMessage): Promise<{ id: string }>;
}
