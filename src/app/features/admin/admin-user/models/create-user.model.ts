import type { GenderType } from "@shared/models/gender.enum";

export interface createUser {
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  gender: GenderType;
  phoneNumber: string;
  password: string;
  imageProfile: string;
}
