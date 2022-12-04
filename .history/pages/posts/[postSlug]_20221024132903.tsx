import { gql } from '@apollo/client';
import Container from '@mui/material/Container';
import { AppProps } from 'next/app';
import Link from '../../src/Link';
import { Post } from '../../interfaces/Post';

import { getApolloClient } from '../../lib/apollo-client';

interface PostProps extends AppProps {
  post: Post;
}

export default function Post(props: PostProps) {
  const { post } = props;
  return (
    <Container maxWidth="sm">
      <h1>{post.translation.title}</h1>

      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: post.translation.content,
          }}
        />
      </div>

      <p>
        <Link href="/">
          <a>&lt; Back To Home</a>
        </Link>
      </p>
    </Container>
  );
}

export async function getStaticProps({
  params,
  locale,
}: {
  params: { postSlug: string };
  locale: string;
}) {
  const { postSlug } = params;
  const language = locale.toUpperCase();

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($id: ID!, $language: LanguageCodeEnum!) {
        post(id: $id, idType: SLUG) {
          id
          title
          content
          slug
          translation(language: $language) {
            id
            title
            content
            slug
            language {
              locale
              slug
            }
          }
        }
      }
    `,
    variables: {
      id: postSlug,
      language,
    },
  });

  const post = data?.data.post;

  return {
    props: {
      post,
      language,
      path: `/posts/${post.slug}`,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }: any) => node);

  const paths = posts.map(({ slug }: { slug: string }) => {
    return {
      params: {
        postSlug: slug,
      },
    };
  });

  return {
    paths: [
      ...paths,
      ...paths.flatMap((path: { path: string }) => {
        return locales.map((locale) => {
          return {
            ...path,
            locale,
          };
        });
      }),
    ],
    //paths: [],
    fallback: 'blocking',
  };
}
