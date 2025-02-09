import { Box, Container, Grid, VStack, useColorModeValue } from '@chakra-ui/react';
import SectionHeading from './SectionHeading';
import BlogCard from './BlogCard';

const FeaturedArticlesSection = ({ articles }) => {
  return (
    <Box py={{ base: 12, md: 24 }}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 8, md: 16 }}>
          <SectionHeading 
            title="Featured"
          />

          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
            gap={{ base: 6, md: 8 }}
            w="full"
            autoRows="1fr"
          >
            {articles.map(article => (
              <Box key={article.id} height="100%">
                <BlogCard
                  blog={article}
                  featured
                />
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeaturedArticlesSection;