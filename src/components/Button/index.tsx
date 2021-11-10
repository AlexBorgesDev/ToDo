import { ButtonHTMLAttributes, memo } from 'react'
import { RiLoader4Line } from 'react-icons/ri'

import { Container, LoadingContainer } from './styles'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button = memo(function Button({ loading, ...rest }: Props) {
  return (
    <Container {...rest} disabled={rest.disabled || loading}>
      {loading && (
        <LoadingContainer data-testid="buttonLoading">
          <RiLoader4Line />
        </LoadingContainer>
      )}

      {rest.children}
    </Container>
  )
})
