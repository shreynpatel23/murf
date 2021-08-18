import { IChannel } from "./channel";

export interface IForum {
  forum_name: string;
  theme: string;
  channels: Array<IChannel>;
  users: Array<ICreatedBy>;
  createdBy: ICreatedBy;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface ICreatedBy {
  name: string;
  email: string;
  Id: string;
  imageUrl: string;
}
