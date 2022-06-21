import { Divider } from '@chakra-ui/react'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Divider />
      <main>{children}</main>
    </>
  )
}