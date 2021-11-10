import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const Option = styled.button<{ selected?: boolean }>`
  font: 500 1.4rem/1.214 'Poppins', sans-serif;
  color: ${({ selected, theme }) =>
    selected ? theme.primary : theme.secondary};

  display: flex;
  align-items: center;
  flex-direction: row;

  cursor: pointer;
  outline: none;

  border: 0;
  background-color: transparent;

  & + & {
    margin-left: 10px;
  }
`

export const Radio = styled.span<{ selected?: boolean }>`
  width: 16px;
  height: 16px;

  padding: 2px;
  margin-right: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.15s ease-in-out;

  border-radius: 50%;
  border: 2px solid
    ${({ selected, theme }) => (selected ? theme.primary : theme.secondary)};

  &::after {
    content: '';

    width: 100%;
    height: 100%;
    transition: background-color 0.15s ease-in-out;

    border-radius: 50%;
    background-color: ${({ selected, theme }) =>
      selected ? theme.primary : 'transparent'};
  }
`
