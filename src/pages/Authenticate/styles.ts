import styled from 'styled-components'

import { Button } from '../../components/Button'
import { LogoTitle } from '../../components/LogoTitle'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 520px) {
    background-color: ${({ theme }) => theme.surfaceBackground};
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 480px;

  margin: 0 auto;
  padding: 14px 16px;

  display: flex;
  flex-direction: column;

  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px;
  background-color: ${({ theme }) => theme.surfaceBackground};

  @media (max-width: 520px) {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
`

export const Logo = styled(LogoTitle)`
  margin-bottom: 4px;
`

export const InfoMessage = styled.p<{ success?: boolean }>`
  margin-top: 10px;

  font: 500 1.4rem/1.5 'Poppins', sans-serif;
  color: ${({ success, theme }) => (success ? theme.primary : theme.red)};
  text-align: center;
`

export const SubmitButton = styled(Button)`
  margin-top: 32px;
`

export const Separator = styled.span`
  margin: 8px 0;

  font: 600 1.25rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.secondary};

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  &::after,
  &::before {
    content: '';

    flex: 1;
    height: 2px;
    border-radius: 8px;

    filter: brightness(125%);
    background-color: ${({ theme }) => theme.secondary};
  }

  &::after {
    margin-left: 8px;
  }

  &::before {
    margin-right: 8px;
  }
`

export const OutlineButton = styled(Button)`
  padding: 7.5px 13.5px;

  color: ${({ theme }) => theme.primary};

  border: 2.5px solid;
  background-color: transparent;

  &:disabled {
    color: ${({ theme }) => theme.secondary};
    background-color: transparent;

    &:hover,
    &:focus-visible {
      background-color: transparent;
    }
  }

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.primaryBackgroundHoverOutline};
  }
`
