export interface Contact {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  termsOfService?: boolean;
  captchaToken?: string;
  createdDate?: Date;
  lastModified?: Date;
}