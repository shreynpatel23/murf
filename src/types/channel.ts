export interface IChannel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  channel_name: string;
  forumId: string;
  postIds: Array<string>;
}
