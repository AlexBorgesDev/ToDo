import styled from 'styled-components'
import { Button } from '../Button'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 100;

  top: 0;
  left: 0;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.modalBackgroundOverlay};
`

export const Content = styled.form`
  width: 100%;
  max-width: 720px;

  display: flex;
  flex-direction: column;

  margin: 0 16px;
  padding: 12px 16px;

  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px;
  background-color: ${({ theme }) => theme.surfaceBackground};
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h3`
  font: 600 1.8rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.color};
`

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  outline: none;

  border: 0;
  border-radius: 50%;

  transition: background-color 0.15s ease-in-out;
  background-color: ${({ theme }) => theme.bodyBackground};

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: ${({ theme }) => theme.color};
  }

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.primaryBackgroundHover};
  }
`

export const Input = styled.textarea`
  width: 100%;
  min-height: 8rem;

  margin: 12px 0;
  padding: 6px 8px;

  font: 400 1.4rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.color};

  resize: none;
  outline: none;
  overflow: hidden;
  transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out;

  border: 2.5px solid ${({ theme }) => theme.secondary};
  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`

export const Footer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-end;
`

export const SubmitButton = styled(Button)`
  padding: 8px 16px;
  margin-left: 12px;
`

export const CharacterCounter = styled.span<{ error?: boolean }>`
  font: 500 1.6rem/1.5 'Poppins', sans-serif;
  color: ${({ error, theme }) => (error ? theme.red : theme.secondary)};
`
