import type { ValidationOptions } from 'class-validator';

type Message = ValidationOptions['message'];

export type Responses = {
  notEmpty: Message;
  string: Message;
  URL: Message;
  email: Message;
  password: Message;
  shortUrl: Message;
};
