import { InputHTMLAttributes, useRef } from 'react'

import { Container, Input, Label } from './styles'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: boolean
  backgroundColor: string | undefined
}

export function SignInput({ backgroundColor, label, value, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function labelFocusForInput() {
    inputRef.current?.focus()
  }

  return (
    <Container background={backgroundColor}>
      <Input
        ref={inputRef}
        data-testid="signInput"
        value={value}
        background={backgroundColor}
        {...props}
      />

      <Label
        active={!!value}
        error={props.error}
        background={backgroundColor}
        onClick={labelFocusForInput}
      >
        {label}
      </Label>
    </Container>
  )
}
