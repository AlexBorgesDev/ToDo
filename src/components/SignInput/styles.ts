import styled from 'styled-components'

export const Container = styled.div<{ background?: string }>`
  margin-top: 12px;
  position: relative;
  padding-top: 0.5rem;

  display: flex;
  align-items: center;

  background-color: ${({ background }) => background || '#ffffff'};
`

export const Input = styled.input<{ background?: string; error?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  position: relative;

  font: 400 1.6rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.secondary};

  border-radius: 0.5rem;
  border: 0.25rem solid
    ${({ error, theme }) => (error ? theme.red : theme.secondary)};

  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  outline: none;
  background-color: transparent;

  &:hover {
    color: ${({ error, theme }) => (error ? theme.redHover : theme.primary)};
    border-color: ${({ error, theme }) =>
      error ? theme.redHover : theme.primary};

    & + label {
      color: ${({ error, theme }) => (error ? theme.redHover : theme.primary)};
    }
  }

  &:focus,
  &:focus-visible {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};

    & + label {
      color: ${({ theme }) => theme.primary};
      font-size: 1.25rem;
      transform: translateY(calc(1.5rem * -1.5));
      background-color: ${({ background }) => background};
    }
  }
`

export const Label = styled.label<{
  active?: boolean
  background?: string
  error?: boolean
}>`
  padding: 0rem 0.5rem;

  left: 1rem;
  position: absolute;

  font: 500 1.6rem/1.5 'Poppins', sans-serif;
  color: ${({ error, theme }) => (error ? theme.red : theme.secondary)};

  transition: transform 0.15s ease-in-out, font-size 0.15s ease-in-out,
    color 0.15s ease-in-out;

  cursor: text;
  user-select: none;
  -webkit-user-select: none;

  ${({ active, background }) =>
    active &&
    `font-size: 1.25rem;
      transform: translateY(calc(1.5rem * -1.5));
      background-color: ${background};`}
`
