import { getCsrfToken } from "../sdk/next-auth/react"
import Navbar from '../src/components/navbar'
import {
  Input,
  Button,
  Stack,
  useColorModeValue,
  FormLabel,
  Checkbox,
  Box,
  Text,
} from '@chakra-ui/react'

//@ts-ignore
export default function SignIn({ csrfToken }) {
  return (
    <>
        <Navbar />
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          w={{ base: '90%', md: '60%', lg: '40%' }}
          ml="auto"
          mr="auto"
          mt="50px"
          borderRadius="10px"
        >
          <Stack spacing={4} p="3%">
            <Text fontWeight="bold" fontSize="22px" textAlign="center">
              Sign In or Sign up with Email
            </Text>
            <form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <Box w={{ base: '80%', md: '70%', lg: '60%' }} ml="auto" mr="auto">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  w="100%"
                />
                <Button
                  w="100%"
                  mt="20px"
                  type="submit"
                  bgGradient='linear(to-br, #0EA4FF, #0AB7AA)'
                  opacity="0.8"
                  color={'white'}
                  _hover={{
                    opacity: '1.0',
                  }}>
                  Continue
                </Button>
                </Box>
            </form>
          </Stack>
        </Box>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
