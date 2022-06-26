import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Home from '../components/home';

export default function Index() {
  return (
    <div>
      <Head>
        <title>Highlightify: Text highlight on image</title>
        <meta name="description" content="A simple text highlighter for images. Highlight text on images before sharing on social media. " />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <meta property="twitter:url" content="highlightify.vercel.app" />
        <meta property="twitter:title" content="Highlight Text in Images" />
        <meta property="twitter:description" content="A simple text highlighter for images. Highlight text on images before sharing on Twitter. " />
        <meta property="twitter:image" content="https://github.com/Nithur-M/PubImages/blob/main/Highlight%20Text%20in%20Images.png"/>
      </Head>

      <Flex>
        <Home />
      </Flex>
    </div>
  )
}
