export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: {
    name: string;
    expertise: string;
  };
  comment: string;
  category: string;
}

export type BlogPosts = BlogPost[];