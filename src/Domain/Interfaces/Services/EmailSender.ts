import { Email } from '../../ValueObjects/Email';

export interface EmailSender {
  send(email: Email): Promise<void>;
}
