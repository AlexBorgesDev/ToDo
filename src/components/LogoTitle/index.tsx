import { HTMLAttributes, memo } from 'react'
import { FaCheck } from 'react-icons/fa'

import { Container } from './styles'

type Props = HTMLAttributes<HTMLElement>

export const LogoTitle = memo(function LogoTitle(props: Props) {
  return (
    <Container {...props}>
      <FaCheck />
      ToDo
    </Container>
  )
})
