export type CreateUserExpect = {
  email: string;
  password: string;
};

export type GetUserResponse = {
  id: string;
  password: string;
};

export type ValidatePasswordExpect = {
  inputPassword: string;
  userPassword: string;
};

export type TokenPayloadExpect = {
  uid: string;
};

export type TokenSubject = 'access' | 'refresh';
