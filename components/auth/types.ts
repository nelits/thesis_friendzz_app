export type AuthValues = {
  email: string;
  password: string;
};

export interface AuthFormValues extends AuthValues {
  repeatPassword?: string;
}
