export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface createUser {
  uid: string,
  email: string,
  first_name: string,
  last_name: string,
  number: string
}
