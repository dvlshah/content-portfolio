import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Button,
  Heading,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Text,
  Icon,
  Flex,
  Divider,
  useColorModeValue,
  VisuallyHidden,
  IconButton,
  useColorMode,
  Collapse,
  Fade,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  CalendarIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons';
import { 
  FaLinkedin, 
  FaMedium, 
  FaBuilding, 
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import {
  logEvent, 
  trackEngagement 
} from '../utils/analytics';
import BlogCard from './BlogCard';
import CompaniesSection from './CompaniesSection';
import HeroSection from './HeroSection';
import FeaturedArticlesSection from './FeaturedArticleSection';
import SearchBar from './SearchBar';
import ContactForm from './ContactForm';
import useFetchBlogs from '../hooks/useFetchBlogs';

// Predefined topics
const TOPICS = ['All', 'Computer Vision', 'LLM', 'IoT', 'Others'];

const SORT_OPTIONS = {
  NEWEST: 'Newest First',
  OLDEST: 'Oldest First',
  COMPANY_ASC: 'Company (A-Z)',
  COMPANY_DESC: 'Company (Z-A)',
};

export default function ModernPortfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);
  const [searchResults, setSearchResults] = useState(null);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const INITIAL_BLOG_COUNT = 9;

  // Theme colors
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');

  // Get blogs data
  const { data: blogs, isLoading } = useFetchBlogs();
  const companies = useMemo(() => 
    [...new Set(blogs?.map(blog => blog.company) || [])],
    [blogs]
  );
  
  // Get featured and regular blogs
  const featuredBlogs = useMemo(() => 
    blogs?.filter(blog => blog.featured ?? false) || [],
    [blogs]
  );
  const regularBlogs = blogs;

  // Memoized handlers
  const handleSearch = useCallback((results) => {
    trackEngagement('Search', {
      query: results.searchTerm,
      resultsCount: results.length
    });
    setSearchResults(results);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    logEvent('Filter', 'Change', filter);
    setActiveFilter(filter);
  }, []);

  const handleSortChange = useCallback((option) => {
    logEvent('Sort', 'Change', option);
    setSortBy(option);
  }, []);

  // Memoized sorted and filtered blogs with performance optimization
  const filteredAndSortedBlogs = useMemo(() => {
    const filtered = searchResults || (activeFilter === 'All' 
      ? regularBlogs 
      : regularBlogs?.filter(blog => 
          blog.tags.some(tag => 
            tag.toLowerCase().includes(activeFilter.toLowerCase())
          )
        ) || []);

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case SORT_OPTIONS.NEWEST:
          return new Date(b.date) - new Date(a.date);
        case SORT_OPTIONS.OLDEST:
          return new Date(a.date) - new Date(b.date);
        case SORT_OPTIONS.COMPANY_ASC:
          return a.company.localeCompare(b.company);
        case SORT_OPTIONS.COMPANY_DESC:
          return b.company.localeCompare(a.company);
        default:
          return 0;
      }
    });
  }, [searchResults, activeFilter, regularBlogs, sortBy]);

  const displayedBlogs = useMemo(() => {
    const sortedAndFiltered = filteredAndSortedBlogs || [];
    return showAllBlogs 
      ? sortedAndFiltered 
      : sortedAndFiltered.slice(0, INITIAL_BLOG_COUNT);
  }, [filteredAndSortedBlogs, showAllBlogs]);

  const hasMoreBlogs = (filteredAndSortedBlogs?.length || 0) > INITIAL_BLOG_COUNT;

  // Track section views
  useEffect(() => {
    const sections = ['hero', 'featured', 'search', 'companies'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEngagement('Section View', entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box minH="100vh">
      <Box position="fixed" top={4} right={4} zIndex={2}>
        <IconButton
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          icon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} />}
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          colorScheme="blue"
          _hover={{
            transform: 'scale(1.1)',
          }}
          transition="all 0.2s"
        />
      </Box>

      <div id="hero">
        <HeroSection 
          totalArticles={blogs?.length || 0}
          totalCompanies={companies?.length || 0}
        />
      </div>

      <div id="featured">
        <FeaturedArticlesSection articles={featuredBlogs} />
      </div>

      <div id="search">
        <Container maxW="7xl" py={16}>
          <VStack spacing={12} align="stretch">
            {/* Search and Filter Section */}
            <Box 
              p={6}
              borderRadius="xl"
              bg={bgColor}
              borderWidth="1px"
              borderColor={borderColor}
              shadow="sm"
            >
              <VStack spacing={6}>
                {/* Search Bar */}
                <Box w="full">
                  <SearchBar 
                    blogs={blogs || []} 
                    onSearch={handleSearch} 
                  />
                </Box>

                <Divider />

                {/* Filter Controls */}
                <Flex 
                  w="full" 
                  justify="space-between" 
                  align="center"
                  flexWrap="wrap"
                  gap={4}
                >
                  {/* Topics */}
                  <HStack spacing={3} flexWrap="wrap">
                    {TOPICS.map((topic) => (
                      <Button
                        key={topic}
                        size="sm"
                        variant={activeFilter === topic ? 'solid' : 'outline'}
                        colorScheme="blue"
                        rounded="full"
                        onClick={() => handleFilterChange(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </HStack>

                  {/* Sort Menu */}
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="outline"
                      size="sm"
                      colorScheme="gray"
                    >
                      Sort: {sortBy}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        icon={<CalendarIcon />}
                        onClick={() => handleSortChange(SORT_OPTIONS.NEWEST)}
                      >
                        Newest First
                      </MenuItem>
                      <MenuItem
                        icon={<CalendarIcon />}
                        onClick={() => handleSortChange(SORT_OPTIONS.OLDEST)}
                      >
                        Oldest First
                      </MenuItem>
                      <MenuItem
                        icon={<FaBuilding />}
                        onClick={() => handleSortChange(SORT_OPTIONS.COMPANY_ASC)}
                      >
                        Company (A-Z)
                      </MenuItem>
                      <MenuItem
                        icon={<FaBuilding />}
                        onClick={() => handleSortChange(SORT_OPTIONS.COMPANY_DESC)}
                      >
                        Company (Z-A)
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </VStack>
            </Box>

            {/* Results Section */}
            <VStack spacing={8} align="stretch">
              <SimpleGrid 
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={8} 
                w="full"
              >
                {displayedBlogs.map((blog) => (
                  <Fade in key={blog.source_url}>
                    <BlogCard blog={blog} />
                  </Fade>
                ))}
              </SimpleGrid>

              {hasMoreBlogs && (
                <Box textAlign="center" pt={4}>
                  <Button
                    onClick={() => setShowAllBlogs(!showAllBlogs)}
                    variant="ghost"
                    colorScheme="blue"
                    size="lg"
                    rightIcon={showAllBlogs ? <FaChevronUp /> : <FaChevronDown />}
                    _hover={{
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s"
                  >
                    {showAllBlogs ? 'Show Less' : 'Show More'}
                  </Button>
                </Box>
              )}
            </VStack>
          </VStack>
        </Container>
      </div>

      <div id="companies">
        <CompaniesSection companies={companies} blogs={blogs} />
      </div>

      <div id="contact">
        <Container maxW="7xl" py={16}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg" textAlign="center">
            Get in Touch
          </Heading>
          <Text textAlign="center" color="gray.500">
            Want to discuss an exciting project or idea? Drop me a line and let's make it happen! ✨
          </Text>
          <ContactForm />
        </VStack>
      </Container>
    </div>

      {/* Footer */}
      <Box borderTop="1px" borderColor="gray.200">
        <Container maxW="7xl" py={12}>
          <VStack spacing={6}>
            <HStack spacing={4}>
              <Link 
                href="mailto:deval@neurink.ai" 
                color="gray.600"
                _hover={{ color: 'blue.500' }}
                aria-label="Send email to Deval"
                title="Send email"
                display="flex"
                alignItems="center"
              >
                <Icon as={FaEnvelope} w={6} h={6} aria-hidden="true" />
                <VisuallyHidden>Email</VisuallyHidden>
              </Link>
              <Link 
                href="https://medium.com/@devalshah1619" 
                isExternal
                color="gray.600"
                _hover={{ color: 'blue.500' }}
                aria-label="Visit Medium profile"
                title="Read articles on Medium"
                display="flex"
                alignItems="center"
              >
                <Icon as={FaMedium} w={6} h={6} aria-hidden="true" />
                <VisuallyHidden>Medium</VisuallyHidden>
              </Link>
              <Link
                href="https://www.linkedin.com/in/dvlshah/"
                isExternal
                color="gray.600"
                _hover={{ color: 'blue.500' }}
                aria-label="Visit LinkedIn profile"
                title="Connect on LinkedIn"
                display="flex"
                alignItems="center"
              >
                <Icon as={FaLinkedin} w={6} h={6} aria-hidden="true" />
                <VisuallyHidden>LinkedIn</VisuallyHidden>
              </Link>
            </HStack>
            <Text color="gray.500" fontSize="sm">
              Neurink. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}