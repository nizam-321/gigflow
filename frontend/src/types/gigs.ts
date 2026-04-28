export interface GigGraphType {
  _id: string;
  title: string;
  description: string;
  budget: number;
  category?: string;
  skills?: string[];
  createdAt: string;
  deadline?: string;
  postedByName?: string;
}
