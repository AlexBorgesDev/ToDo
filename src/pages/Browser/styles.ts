import styled from 'styled-components'

import { Button } from '../../components/Button'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`

export const Content = styled.main`
  width: 100%;
  max-width: 1080px;
  min-height: 100vh;

  margin: 0 auto;
  padding: 56px 16px 16px;
  position: relative;

  display: flex;
  flex-direction: column;

  @media (max-width: 520px) {
    padding: 56px 8px 16px;
  }
`

export const NewToDoButtonIcon = styled.span`
  margin-right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`

export const NewToDoButton = styled(Button)`
  margin: 16px 0;
`

export const NewToDoFloatButton = styled.button<{ positionX?: number }>`
  width: 48px;
  height: 48px;
  z-index: 5;

  left: ${({ positionX }) => `${positionX}px` || 'unset'};
  right: ${({ positionX }) => (positionX ? 'unset' : '16px')};
  bottom: 16px;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.15s ease-in-out, left 0.025s ease-in-out;

  border: 0;
  border-radius: 50%;

  cursor: pointer;
  outline: none;
  background-color: ${({ theme }) => theme.primary};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.secondary};
  }

  & > svg {
    width: 1.6rem;
    height: 1.6rem;

    fill: ${({ theme }) => theme.white};
  }
`
