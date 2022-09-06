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
import { UserContext } from '../../contexts/userContext';
import { uploadStorage } from '../../../src/libs/supabase/storage';
import { getStorageFileURL } from '../../../src/libs/supabase/storage';

const AddItems = () => {
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
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
    console.log(data);
    const resp = fetch('/api/company/postItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(resp);
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

  const handleRenderImage = useCallback(async () => {
    const src = "141662c0-fa6a-4b05-8d90-b38afa29d132"
    if (!src) return;
    const path = await getStorageFileURL({
      bucketName: "itemimage",
      pathName: src,
    });
    if (!path) return;
    setUrl(path);
  }, []);

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
          新規商品登録
        </Text>
        <Stack spacing={4} p="3%">
          <FormControl id="title">
            <FormLabel>商品名</FormLabel>
            <Input
              type="text"
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel>販売価格</FormLabel>
            <Input
              type="number"
              onChange={(e) => {setPrice(e.target.value)}}
            />
          </FormControl>
          <FormControl id="quantity">
            <FormLabel>販売予定数量</FormLabel>
            <Input
              type="number"
              onChange={(e) => {setQuantity(e.target.value)}}
            />
          </FormControl>
          <FormControl id="image">
            <FormLabel>商品画像</FormLabel>
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
              登録
            </Button>
            <Button
              onClick={handleRenderImage}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              登録
            </Button>
            <img src={url} alt="ps5"/>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default AddItems