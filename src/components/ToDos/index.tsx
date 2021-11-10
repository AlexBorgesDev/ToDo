import { memo, useEffect, useState } from 'react'

// Components
import { ToDo, ToDoItem } from '../ToDoItem'
import { RowFilters } from '../RowFilters'

import { api } from '../../services/api'

import { FilterLabel, FiltersContainer } from './styles'

type Props = {
  newToDo?: ToDo
}

export const ToDos = memo(function ToDos({ newToDo }: Props) {
  const [toDos, setToDos] = useState<ToDo[]>([])

  const [filterSelected, setFilterSelected] = useState<
    'All' | 'Completed' | 'Not completed'
  >('All')

  function handleDeleteToDo(id: string) {
    setToDos(oldState => oldState.filter(toDo => toDo.id !== id))
  }

  function onCompleted(newToDo: ToDo) {
    setToDos(
      toDos.map(currentToDo =>
        currentToDo.id === newToDo.id ? newToDo : currentToDo
      )
    )
  }

  useEffect(() => {
    api.get<ToDo[]>('toDos').then(({ data }) => setToDos(data))
  }, [])

  useEffect(() => {
    newToDo && setToDos(oldState => [newToDo, ...oldState])
  }, [newToDo])

  return (
    <>
      <FiltersContainer>
        <FilterLabel>Show:</FilterLabel>

        <RowFilters
          options={[
            { value: 'All' },
            { value: 'Completed' },
            { value: 'Not completed' },
          ]}
          selected={filterSelected}
          onSelected={setFilterSelected}
        />
      </FiltersContainer>

      {toDos
        .filter(toDo => {
          if (filterSelected === 'All') return true
          else if (filterSelected === 'Completed') return toDo.completed
          else if (filterSelected === 'Not completed') return !toDo.completed
        })
        .map(toDo => (
          <ToDoItem
            key={toDo.id}
            data={toDo}
            onDeleted={handleDeleteToDo}
            onCompleted={onCompleted}
          />
        ))}
    </>
  )
})
