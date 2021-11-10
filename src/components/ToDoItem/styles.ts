import styled from 'styled-components'

export const Container = styled.div<{ completed?: boolean; hide?: boolean }>`
  width: 100%;
  padding: 12px 16px;

  display: ${({ hide }) => (hide ? 'none' : 'grid')};
  grid-template-columns: 24px 1fr 24px;
  grid-template-rows: ${({ completed }) => (completed ? 'auto auto' : 'auto')};

  row-gap: 4px;
  column-gap: 16px;

  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  opacity: ${({ completed }) => (completed ? 0.75 : 1)};
  transition: opacity 0.15s ease-in-out;

  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px;
  background-color: ${({ theme }) => theme.surfaceBackground};

  & + & {
    margin-top: 12px;
  }
`

export const CompletedContainer = styled.div`
  grid-column: 1/4;
  padding-left: 40px;

  display: flex;
  align-items: center;
  flex-direction: row;
`

export const CompletedText = styled.p`
  max-height: calc(1.1rem * 1.5);

  font: 500 1.1rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.primary};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const CheckButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2.5px solid
    ${({ selected, theme }) => (selected ? theme.primary : theme.secondary)};
  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px;

  cursor: pointer;
  outline: none;

  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  background-color: ${({ selected, theme }) =>
    selected ? theme.primary : 'transparent'};

  & > svg {
    width: 1.2rem;
    height: 1.2rem;

    fill: ${({ theme }) => theme.white};
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    transition: opacity 0.15s ease-in-out, fill 0.15s ease-in-out;
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ selected, theme }) =>
      selected ? theme.secondary : theme.primary};

    background-color: ${({ selected, theme }) =>
      selected ? theme.secondary : theme.primaryBackgroundHover};

    & > svg {
      opacity: ${({ selected }) => (selected ? 1 : 0.5)};
      fill: ${({ selected, theme }) =>
        selected ? theme.white : theme.primary};
    }
  }
`

export const TaskTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const TaskText = styled.p`
  width: 100%;

  color: ${({ theme }) => theme.color};
  font: 400 1.4rem/1.5 'Poppins', sans-serif;
`

export const TrashButton = styled.button`
  width: 100%;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 50%;

  cursor: pointer;
  outline: none;
  position: relative;

  background-color: transparent;

  & > svg {
    width: 1.8rem;
    height: 1.8rem;
    z-index: 1;

    fill: ${({ theme }) => theme.red};
  }

  &::before {
    content: '';

    width: 32px;
    height: 32px;
    position: absolute;

    border-radius: 50%;
    transition: background-color 0.15s ease-in-out;
    background-color: transparent;
  }

  &:hover,
  &:focus-visible {
    &::before {
      background-color: ${({ theme }) => theme.redBackgroundHover};
    }
  }
`
