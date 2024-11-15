import { Box, Container, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react';
import SectionHeading from './SectionHeading';
import BlogCard from './BlogCard';

const FeaturedArticlesSection = ({ articles }) => {
  return (
    <Box py={24}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          <SectionHeading 
            // tag="Featured Articles"
            title="Featured"
            // subtitle="In-depth analyses and perspectives on artificial intelligence and emerging technologies"
          />

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={8}
            w="full"
          >
            {articles.map(article => (
              <BlogCard
                key={article.id}
                blog={article}
                featured
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeaturedArticlesSection;