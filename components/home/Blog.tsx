interface BlogProps {
  blog: any;
}
export const Blog = (props: BlogProps) => <section>{props.blog.title}</section>;
