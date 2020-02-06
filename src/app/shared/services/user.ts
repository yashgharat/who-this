export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface updateUser {
  uid: string,
  email: string,
  first_name: string,
  last_name: string,
  number: string
}
