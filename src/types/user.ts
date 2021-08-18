export interface IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  forumId: Array<string>;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  isEmailVerified: boolean;
}
