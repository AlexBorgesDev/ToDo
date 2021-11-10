import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 56px;
  z-index: 10;

  top: 0;
  left: 0;
  position: fixed;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);

  background-color: ${({ theme }) => theme.surfaceBackground};
`

export const Nav = styled.nav`
  width: 100%;
  height: 100%;
  max-width: 1080px;

  margin: 0 auto;
  padding: 0 16px;
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: row;
`

export const UserButton = styled.button`
  max-width: 208px;

  margin-left: auto;
  padding-left: 10px;

  font: 500 1.4rem/1.5 'Poppins', sans-serif;

  display: flex;
  align-items: center;
  flex-direction: row;

  border: 0;
  border-radius: 32px;

  cursor: pointer;
  outline: none;
  overflow: hidden;
  text-overflow: clip;

  transition: background-color 0.15s ease-in-out;
  background-color: transparent;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.primaryBackgroundHoverOutline};

    & > span {
      background-color: ${({ theme }) => theme.surfaceBackground};
    }
  }
`

export const UserButtonIcon = styled.span`
  padding: 4px;
  margin: 4px 4px 4px 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.15s ease-in-out;

  border-radius: 50%;
  background-color: transparent;

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`

export const UserDropdownContainer = styled.div`
  width: 160px;
  padding: 2px 0;

  top: 48px;
  right: 17.5px;
  position: absolute;

  display: flex;
  flex-direction: column;

  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);

  border-radius: 4px;
  background-color: ${({ theme }) => theme.surfaceBackground};
`

export const UserDropdownItemIcon = styled.span`
  margin-left: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`

export const UserDropdownItem = styled.button<{ isLogOut?: boolean }>`
  height: 26px;
  padding: 0 8px;

  font: 400 1.5rem/1.5 'Poppins', sans-serif;
  color: ${({ isLogOut, theme }) => (isLogOut ? theme.red : theme.color)};

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-end;

  cursor: pointer;
  outline: none;

  border: 0;
  background-color: transparent;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.primaryBackgroundHoverOutline};
  }

  & > ${UserDropdownItemIcon} {
    & > svg {
      fill: ${({ isLogOut, theme }) => (isLogOut ? theme.red : theme.color)};
    }
  }
`
