import { useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Tag,
  HStack,
  VStack,
  useColorMode,
  Icon,
  SimpleGrid,
  Link,
  Divider
} from '@chakra-ui/react'
import { Search, TrendingUp, Award, Mail, ExternalLinkIcon } from 'lucide-react'
import { FaLinkedin, FaMedium } from 'react-icons/fa'
import useFetchBlogs from '../hooks/useFetchBlogs'
import BlogCard from './BlogCard'
import CompaniesSection from './CompaniesSection';
import HeroSection from './HeroSection';
import FeaturedArticlesSection from './FeaturedArticleSection';
import SearchBar from './SearchBar'

// Predefined topics
const TOPICS = ['All', 'Computer Vision', 'LLM', 'IoT', 'Others']

export default function ModernPortfolio() {
  const { colorMode } = useColorMode()
  const { data: blogs, isLoading } = useFetchBlogs()
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchResults, setSearchResults] = useState(null)
  // Extract unique companies from all blogs with case normalization
  const companies = [...new Set(blogs?.map(blog => blog.company?.toLowerCase()) || [])].map(company => {
    // Find the first occurrence of the company to get its original casing
    return blogs?.find(blog => blog.company?.toLowerCase() === company)?.company || company;
  });
  console.log("Total companies: ", companies)
  // Get featured and regular blogs
  const featuredBlogs = blogs?.filter(blog => blog.featured ?? false) || []
  const regularBlogs = blogs

  const handleSearch = (results) => {
    setSearchResults(results)
  }

   // Filter logic combining search results and topic filter
  const filteredBlogs = searchResults || (activeFilter === 'All' 
    ? regularBlogs 
    : regularBlogs.filter(blog => 
        blog.tags.some(tag => 
          tag.toLowerCase().includes(activeFilter.toLowerCase())
        )
      )
  )

  return (
    <Box minH="100vh">
      <HeroSection 
        totalArticles={blogs?.length || 0}
        totalCompanies={companies?.length || 0}
      />

      {/* Featured Articles */}
      <FeaturedArticlesSection articles={featuredBlogs} />

    {/* Search Bar Section */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={12}>
          <SearchBar blogs={blogs || []} onSearch={handleSearch} />

        {/* Topic Filter */}
        <Container maxW="7xl" py={16}>
            <VStack spacing={8}>
            <Heading size="lg">Explore by Topic</Heading>
            <HStack spacing={4} flexWrap="wrap" justify="center">
                {TOPICS.map((topic) => (
                <Button
                    key={topic}
                    variant={activeFilter === topic ? 'solid' : 'outline'}
                    colorScheme="blue"
                    rounded="full"
                    onClick={() => setActiveFilter(topic)}
                >
                    {topic}
                </Button>
                ))}
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
                {(activeFilter === 'All' ? regularBlogs : regularBlogs.filter(blog => 
                blog.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
                )).map((blog) => (
                <BlogCard key={blog.source_url} blog={blog} />
                ))}
            </SimpleGrid>
            </VStack>
        </Container>

        </VStack>
      </Container>

      {/* Companies Section */}
      <CompaniesSection companies={companies} blogs={blogs} />

      {/* Footer */}
      <Box borderTop="1px" borderColor="gray.200">
        <Container maxW="7xl" py={12}>
          <VStack spacing={6}>
            <HStack spacing={6}>
              <Link 
                href="https://linkedin.com/in/dvlshah" 
                isExternal
                color="gray.600"
                _hover={{ color: 'blue.500' }}
              >
                <Icon as={FaLinkedin} w={6} h={6} />
              </Link>
              <Link 
                href="mailto:deval@neurink.ai" 
                color="gray.600"
                _hover={{ color: 'blue.500' }}
              >
                <Icon as={Mail} w={6} h={6} />
              </Link>
              <Link 
                href="https://medium.com/@devalshah1619" 
                isExternal
                color="gray.600"
                _hover={{ color: 'blue.500' }}
              >
                <Icon as={FaMedium} w={6} h={6} />
              </Link>
            </HStack>
            <Divider />
            <Text color="gray.500" fontSize="sm">
              2024 Neurink. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}