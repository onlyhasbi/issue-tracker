import { Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'


function ErrorMessage({children}: PropsWithChildren) {
  if(!children)return null

  return (
    <Text as="p" size="2" color="red">{children}</Text>
  )
}

export default ErrorMessage