export enum RoleType {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
  PARENT = "parent",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface IUser {
  fullName: string;

  email: string;

  mobileNumber: string;

  roleType: RoleType;

  profilePicture?: string;

  gender: Gender;

  dateOfBirth: Date;

  address: string;

  password: string;
  confirmPassword: string;

  isEmailVerified: boolean;

  isMobileVerified: boolean;

  isActive: boolean;

  lastLogin?: Date;

  refreshToken?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
