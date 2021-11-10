import styled, { keyframes } from 'styled-components'

export const Container = styled.button`
  padding: 10px 16px;

  font: 600 1.5rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  border: 0;
  border-radius: 0.5rem;

  user-select: none;
  -webkit-user-select: none;

  cursor: pointer;
  outline: none;
  background-color: ${({ theme }) => theme.primary};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    cursor: default;
    background-color: ${({ theme }) => theme.secondary};

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.secondary};
    }
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const LoadingContainer = styled.span<{ fontSize?: string }>`
  margin-right: 8px;

  animation: ${rotate} 1s linear infinite;

  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: ${({ fontSize = '1.5rem' }) => `calc(${fontSize} * 1.4)`};
    height: ${({ fontSize = '1.5rem' }) => `calc(${fontSize} * 1.4)`};
  }
`
