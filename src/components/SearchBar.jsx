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
      <InputGroup size={{ base: "md", md: "lg" }}>
        <InputLeftElement pointerEvents="none" h={{ base: "40px", md: "48px" }}>
          <Search className="text-gray-400" size={{ base: 18, md: 20 }} />
        </InputLeftElement>
        <Input
          placeholder="Search articles..."
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
          pl={{ base: "40px", md: "45px" }}
          h={{ base: "40px", md: "48px" }}
          fontSize={{ base: "sm", md: "md" }}
        />
      </InputGroup>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() !== '' && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          rounded="xl"
          shadow="lg"
          maxH={{ base: "60vh", md: "70vh" }}
          overflowY="auto"
          zIndex={10}
        >
          <VStack spacing={0} align="stretch" p={{ base: 2, md: 3 }}>
            {searchIndex
              .filter(blog => 
                blog.searchText.includes(query.toLowerCase())
              )
              .map(result => (
                <Box
                  key={result.id}
                  p={{ base: 2, md: 3 }}
                  cursor="pointer"
                  _hover={{ bg: hoverBgColor }}
                  onClick={() => handleResultClick(result)}
                  transition="background 0.2s"
                >
                  <Text 
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium" 
                    mb={2}
                    wordBreak="break-word"
                  >
                    {result.title}
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    {result.tags.slice(0, 2).map((tag, i) => (
                      <Tag 
                        key={i} 
                        size={{ base: "sm", md: "md" }}
                        colorScheme="blue" 
                        variant="subtle"
                        wordBreak="break-word"
                        maxW="100%"
                      >
                        <Text isTruncated maxW="100%">
                          {tag}
                        </Text>
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              ))}
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default SearchBar