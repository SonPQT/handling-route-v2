export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: {
    name: string;
    expertise: string;
  };
  category: string;
  comment: string;
}

export type BlogPosts = BlogPost[];