import { GenderType } from "@shared/models/gender.enum";

export interface User{
  id :number;
  firstName :string;
  lastName :string;
  birthday : string;
  email:string;
  gender:GenderType;
  phoneNumber:string;
  password:string;
  imageProfile:string;
}


