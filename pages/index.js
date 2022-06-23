import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Home from '../components/home';

export default function Index() {
  return (
    <div>
      <Head>
        <title>Highlightify: Text highlight on image</title>
        <meta name="description" content="A simple text highlighter for images. Highlight text on images before sharing on social media. " />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <Flex>
        <Home />
      </Flex>
    </div>
  )
}
