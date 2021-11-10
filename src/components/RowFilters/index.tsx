import { Container, Option, Radio } from './styles'

type Props<T extends string> = {
  options: { label?: string; value: T }[]
  selected: T
  onSelected: (selected: T) => void
}

export function RowFilters<T extends string>(props: Props<T>) {
  return (
    <Container>
      {props.options.map((option, index) => (
        <Option
          key={index}
          type="button"
          value={option.value}
          selected={option.value === props.selected}
          onClick={() => props.onSelected(option.value)}
        >
          <Radio selected={option.value === props.selected} />
          {option.label || option.value}
        </Option>
      ))}
    </Container>
  )
}

// export const RowFilters = memo(CRowFilters)
