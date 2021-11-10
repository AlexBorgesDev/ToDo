import styled from 'styled-components'

export const FiltersContainer = styled.section`
  width: 100%;
  margin: 6px 0 14px;

  display: flex;
  align-items: center;
  flex-direction: row;
`

export const FilterLabel = styled.label`
  font: 600 1.4rem/1.214 'Poppins', sans-serif;
  color: ${({ theme }) => theme.primary};

  margin-right: 12px;
`
