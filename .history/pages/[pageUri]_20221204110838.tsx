import { gql } from '@apollo/client';
import { AppProps } from 'next/app';
import Link from '../components/Link';
import { Post } from '../interfaces/Post';

import Container from '@mui/material/Container';
import { initializeApollo } from '../lib/apollo-client';

interface PageProps extends AppProps {
  page: Post;
}

export default function Page(props: PageProps) {
  const { page } = props;
  return (
    <Container maxWidth="lg">
      <h1>{page.translation.title}</h1>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: page.translation.content,
          }}
        />
      </div>
    </Container>
  );
}

export async function getStaticProps({
  params,
  locale,
}: {
  params: { pageUri: string };
  locale: string;
}) {
  const { pageUri } = params;
  const language = locale.toUpperCase();

  const apolloClient = initializeApollo();

  const data = await apolloClient.query({
    query: gql`
      query PageByUri($id: ID!, $language: LanguageCodeEnum!) {
        page(id: $id, idType: URI) {
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
      id: pageUri,
      language,
    },
  });

  let page = data?.data.page;

  return {
    props: {
      page,
      language,
      path: `/${page.slug}`,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const apolloClient = initializeApollo();

  const data = await apolloClient.query({
    query: gql`
      {
        pages(first: 10000) {
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

  const pages = data?.data.pages.edges.map(({ node }: any) => node);

  const paths = pages.map(({ slug }: { slug: string }) => {
    return {
      params: {
        pageUri: slug,
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
