import React, { useState, useEffect, useCallback } from 'react'
import { getStorageFileURL } from '../libs/supabase/storage';
import {
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Box,
  useColorModeValue,
  Text,
  Center,
  Image,
  Heading,
  Flex,
  Tooltip,
  Circle,
  Badge,
} from '@chakra-ui/react'
import axios from 'axios'

const ItemCard = (props: any) => {
  const [url, setUrl] = useState('')

  const handleRenderImage = useCallback(async () => {
    const src = "b1e3991d-7ed4-4d78-951e-d1258039eea8"
    if (!src) return;
    const path = await getStorageFileURL({
      bucketName: "itemimage",
      pathName: src,
    });
    if (!path) return;
    setUrl(path);
  }, []);

  const handlePublish = async (status: boolean) => {
    const data = {
      'id': props.item.id,
      'isPublished': status,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data);
    const resp = await axios.post('/api/company/publishItem', data, config)
    if(resp.status !== 200) {
      throw Error("Server error");
    }
  }

  useEffect(() => {
    handleRenderImage()
  }, [props])
  return (
    <>
      <Flex p="20px" w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">

          <Image
            src={url}
            alt={`Item Image ${props.item.title}`}
            roundedTop="lg"
          />

          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
              >
                {props.item.title}
              </Box>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                {props.item.price}
                <Box as="span" color={'gray.600'} fontSize="lg">
                  円
                </Box>
                <Text>
                  {props.item.quantity}
                  <Box as="span" color={'gray.600'} fontSize="lg">
                    台
                  </Box>
                </Text>
              </Box>
              <Button
                 onClick={() => {handlePublish(true)}}
                >
                  エントリー
                </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ItemCard
