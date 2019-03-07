import { Comment } from './comment';

export class Post {
  id?: number;
  userId?: number;
  title: string;
  html: string;
  dateOfCreation?: Date;
  dateOfModification?: Date;
  comments?: Comment[];
}