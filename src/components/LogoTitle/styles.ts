import styled from 'styled-components'

export const Container = styled.div`
  font: 700 3.2rem/1.5 'Poppins', sans-serif;
  color: ${({ theme }) => theme.color};

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  -webkit-user-select: none;
  user-select: none;

  & > svg {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 8px;

    fill: ${({ theme }) => theme.primary};
  }

  @media (max-width: 520px) {
    font: 700 2.6rem/1.5 'Poppins', sans-serif;

    & > svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`
