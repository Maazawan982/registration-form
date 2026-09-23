export type AuthMode = 'login' | 'signup' | 'forgot';

export type ForgotStep = 'email' | 'code' | 'new-password' | 'success';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
}

export interface PasswordRequirements {
  minLength: boolean;
  hasNumber: boolean;
  hasUpper: boolean;
  hasSpecial: boolean;
}
