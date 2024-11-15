import { useState, useRef, useCallback, useMemo } from 'react'
import { Search } from 'lucide-react'
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
  VStack,
  useColorModeValue,
  Tag,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import debounce from 'lodash/debounce'

const SearchBar = ({ blogs, onSearch }) => {
  const [query, setQuery] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700')

  // Pre-process blogs for search
  const searchIndex = useMemo(() => {
    return blogs.map(blog => ({
      ...blog,
      searchText: [
        blog.title.toLowerCase(),
        blog.excerpt.toLowerCase(),
        ...(blog.tags || []).map(tag => tag.toLowerCase()),
        blog.company.toLowerCase()
      ].join(' ')
    }))
  }, [blogs])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim() === '') {
        onSearch(null)
        return
      }
      
      const terms = searchQuery.toLowerCase().split(' ')
      const results = searchIndex.filter(blog => 
        terms.every(term => blog.searchText.includes(term))
      )
      
      onSearch(results)
      if (results.length > 0) onOpen()
    }, 300),
    [searchIndex, onSearch, onOpen]
  )

  const handleSearch = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    debouncedSearch(newQuery)
  }

  const handleResultClick = useCallback((result) => {
    const blogCard = document.getElementById(`blog-${result.source_url}`)
    if (blogCard) {
      requestAnimationFrame(() => {
        blogCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
        blogCard.classList.add('highlight')
        setTimeout(() => blogCard.classList.remove('highlight'), 2000)
      })
    }
    
    setQuery('')
    onClose()
    onSearch(null)
  }, [onClose, onSearch])

  return (
    <Box position="relative" maxW="600px" mx="auto" w="full">
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Search className="text-gray-400" />
        </InputLeftElement>
        <Input
          placeholder="Search articles by title, topic, or company..."
          value={query}
          onChange={handleSearch}
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
          _hover={{ borderColor: 'blue.500' }}
          _focus={{ 
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
          }}
          rounded="full"
          pl="45px"
        />
      </InputGroup>

      {/* Search Results Dropdown */}
      {isOpen && searchIndex.filter(blog => 
        query.toLowerCase().split(' ').every(term => blog.searchText.includes(term))
      ).length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt={2}
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
          rounded="xl"
          shadow="lg"
          maxH="400px"
          overflowY="auto"
          spacing={0}
          zIndex={10}
        >
          {searchIndex.filter(blog => 
            query.toLowerCase().split(' ').every(term => blog.searchText.includes(term))
          ).map((result, index) => (
            <Box
              key={index}
              p={4}
              w="full"
              cursor="pointer"
              onClick={() => handleResultClick(result)}
              _hover={{ 
                bg: hoverBgColor,
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
              borderBottom={
                index !== searchIndex.filter(blog => 
                  query.toLowerCase().split(' ').every(term => blog.searchText.includes(term))
                ).length - 1 ? '1px' : '0'
              }
              borderColor={borderColor}
            >
              <Text fontSize="sm" color="gray.500" mb={1}>
                {result.company}
              </Text>
              <Text fontWeight="medium" noOfLines={1} mb={2}>
                {result.title}
              </Text>
              <Flex gap={2} flexWrap="wrap">
                {result.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Tag
                    key={tagIndex}
                    size="sm"
                    colorScheme="gray"
                    variant="subtle"
                  >
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}

export default SearchBar