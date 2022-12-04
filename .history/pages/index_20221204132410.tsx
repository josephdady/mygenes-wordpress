import { gql } from '@apollo/client';

//MUI
import Box from '@mui/material/Box';
import { AppPreview } from '../components/home/AppPreview';
import { Blog } from '../components/home/Blog';
import { GeneVariables } from '../components/home/GeneVariables';
import { Goals } from '../components/home/Goals';
import { Hero } from '../components/home/Hero';
import { Research } from '../components/home/Research';
import { Team } from '../components/home/Team';
import { Statistics } from '../components/home/Statistics';
import { Testimonials } from '../components/home/Testimonials';
import { Videos } from '../components/home/Videos';
import Confetti from '../components/Confetti';
import { useState } from 'react';
import { Professionals } from '../components/home/Professionals';
import { extarctItemFromTranslations } from '../lib/utils';
import { ProItem } from '../interfaces/ProItem';
import { Video } from '../interfaces/Video';
import Footer from '../components/Footer';
import { initializeApollo } from '../lib/apollo-client';
interface HomeProps {
  page: any;
  testimonials: any;
  geneVariables: any;
  professionals: any;
  videos: any;
}

export default function Home(props: HomeProps) {
  const {
    page: { translation },
    testimonials: { nodes: testimonialItems },
    geneVariables: { nodes: geneVariablesItems },
    professionals: { nodes: professionalsItems },
    videos: { nodes: videosNodes },
  } = props;
  const [playConfettiAnimation, setPlayonfettiAnimation] = useState(false);
  const {
    homepage: {
      hero,
      goals,
      statistics,
      appPreview,
      geneVariables,
      testimonials,
      team,
      research,
      professionals,
      videos,
    },
  } = translation;

  const proItems: ProItem[] = extarctItemFromTranslations(
    professionalsItems as any[]
  );
  const videoItems: Video[] = extarctItemFromTranslations(videosNodes as any[]);

  const handleStartConfetti = (state: boolean) => {
    setPlayonfettiAnimation(state);
  };

  return (
    <Box>
      {hero && <Hero hero={hero} />}
      {goals && <Goals goals={goals} />}
      {statistics && <Statistics statistics={statistics} />}
      {appPreview && <AppPreview appPreview={appPreview} />}
      {geneVariables && (
        <GeneVariables
          geneVariables={geneVariables}
          items={geneVariablesItems}
        />
      )}
      {testimonials && <Testimonials testimonials={testimonials} />}
      {team && <Team data={team} startConfetti={handleStartConfetti} />}
      {research && <Research research={research} />}
      {professionals && proItems && (
        <Professionals
          title={professionals.title}
          subtitle={professionals.subtitle}
          slides={proItems}
        />
      )}
      {videos && videoItems && (
        <Videos
          title={videos.title}
          subtitle={videos.subtitle}
          videos={videoItems}
        />
      )}
      <Confetti playAnimation={playConfettiAnimation} />
    </Box>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const apolloClient = initializeApollo();

  const languageEnum = locale.toUpperCase();
  const languageFilterEnum = locale.toUpperCase();

  const data = await apolloClient.query({
    query: gql`
      query Home(
        $id: ID = "home"
        $languageEnum: LanguageCodeEnum!
        $languageFilterEnum: LanguageCodeFilterEnum!
      ) {
        page(id: $id, idType: URI) {
          id
          title
          content
          slug
          translation(language: $languageEnum) {
            id
            title
            content
            slug
            homepage {
              hero {
                heading1
                heading2
                text
                cta {
                  title
                  url
                }
                image {
                  title
                  sourceUrl
                }
              }
              goals {
                title
                cards {
                  title
                  description
                  colors {
                    color1
                    color2
                  }
                  animation {
                    mediaItemUrl
                  }
                }
              }
              statistics {
                title
                subtitle
                disclaimer
                cards {
                  persent {
                    mediaItemUrl
                  }
                  graph {
                    mediaItemUrl
                  }
                  text
                  colors {
                    color1
                    color2
                  }
                }
              }
              appPreview {
                title
                cta {
                  title
                  url
                }
                items {
                  slide {
                    sourceUrl
                    mediaDetails {
                      width
                      height
                    }
                  }
                  title
                  text
                }
              }
              geneVariables {
                title
                subtitle
              }
              testimonials {
                cta {
                  title
                  url
                }
                heroPost {
                  __typename
                  ... on Testimonial {
                    id
                    title
                    content
                    featuredImage {
                      node {
                        title
                        sourceUrl
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                    testimonialsCF {
                      age
                      location
                      progress
                      video
                      rating
                    }
                  }
                }
              }
              team {
                title
                subtitle
                cta {
                  title
                  url
                }
              }
              research {
                title
                items {
                  title
                  text
                  link {
                    title
                    url
                  }
                  colors {
                    color1
                    color2
                  }
                  bgImage {
                    sourceUrl
                  }
                }
              }
              professionals {
                title
                subtitle
              }
              videos {
                title
                subtitle
              }
            }
          }
        }
        testimonials(where: { language: $languageFilterEnum }) {
          nodes {
            translation(language: $languageEnum) {
              content
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
              testimonialsCF {
                progress
              }
            }
          }
        }
        geneVariables(where: { language: $languageFilterEnum }) {
          nodes {
            translation(language: $languageEnum) {
              id
              title
              content
              featuredImage {
                node {
                  title
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              geneVariablesCF {
                color
                icon {
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        professionals(where: { language: $languageFilterEnum }) {
          nodes {
            translation(language: $languageEnum) {
              id
              title
              content
              featuredImage {
                node {
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              professionalsCf {
                colors {
                  color1
                  color2
                }
              }
            }
          }
        }
        videos(where: { language: $languageFilterEnum }) {
          nodes {
            translation(language: $languageEnum) {
              title
              content
              featuredImage {
                node {
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              videosCf {
                videoUrl
                logo {
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      languageEnum,
      languageFilterEnum,
    },
  });

  const { page, testimonials, geneVariables, professionals, videos } =
    data?.data;

  return {
    props: {
      page,
      testimonials,
      geneVariables,
      professionals,
      videos,
    },
  };
}
