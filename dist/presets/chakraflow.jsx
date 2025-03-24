import { Box, Container, Heading, Text, Button, Link } from '@chakra-ui/react';

function App() {
  return (
    <Box
      bgGradient="radial(teal.500, blue.500)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Container centerContent py={16}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to ChakraFlow
        </Heading>
        <Text fontSize="lg" mb={6}>
          Build stunning UIs with Chakra UI.
        </Text>
        <div>
          <Button colorScheme="teal" size="lg" shadow="md" mr={4}>
            Get Started
          </Button>
          <Link
            href="https://chakra-ui.com/docs"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Button colorScheme="blue" size="lg" shadow="md">
              Chakra Docs
            </Button>
          </Link>
        </div>
      </Container>
    </Box>
  );
}

export default App;
