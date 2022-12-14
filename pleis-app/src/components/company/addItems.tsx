import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Box,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { UserContext } from '../../contexts/userContext';
import { uploadStorage } from '../../../src/libs/supabase/storage';
import { getStorageFileURL } from '../../../src/libs/supabase/storage';

const AddItems = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState('PS5')
  const [price, setPrice] = useState('55000')
  const [quantity, setQuantity] = useState('100')
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState<string>();

  const handleImage = useCallback((e: any) => {
    const file = e.target?.files;
    setImage(file)
  }, [])

  const handleSubmit = async () => {
    const pathname = await handleUploadStorage(image)
    const data = {
      'userId': currentUser.id,
      'title': title,
      'price': price,
      'quantity': quantity,
      'imagePath': pathname,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data);
    return new Promise((resolve, reject) => {
      axios.post('/api/company/postItem', data, config)
      .then(response => {
        if(response.status !== 200) {
          throw Error("Server error");
        }
        console.log('reload');
        router.reload();
        resolve(response);
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e);
      })
    });
  }

  const handleUploadStorage = async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    const { pathname } = await uploadStorage({
      fileList,
      bucketName: "itemimage",
    });
    if (pathname) console.debug({ pathname });
    return pathname;
  };

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        w={{ base: '90%', md: '60%', lg: '40%' }}
        ml="auto"
        mr="auto"
        mt="50px"
        borderRadius="10px"
      >
        <Text pt="20px" fontWeight="bold" fontSize="22px" textAlign="center">
          ??????????????????
        </Text>
        <Stack spacing={4} p="3%">
          <FormControl id="title">
            <FormLabel>?????????</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel>????????????</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => {setPrice(e.target.value)}}
            />
          </FormControl>
          <FormControl id="quantity">
            <FormLabel>??????????????????</FormLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {setQuantity(e.target.value)}}
            />
          </FormControl>
          <FormControl id="image">
            <FormLabel>????????????</FormLabel>
            <Input
              type="file"
              onChange={(e) => {handleImage(e)}}
            />
          </FormControl>
          <Stack spacing={10} pb="20px">
            <Button
              disabled={!title || !price || !quantity || !image }
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              ??????
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default AddItems
