import ReactDOM from 'react-dom'

import { ReactNode } from 'react'

export function Portal({ children }: { children: ReactNode }) {
  const modalRoot = document.getElementById('modal-root')

  if (!modalRoot) return <></>

  return ReactDOM.createPortal(children, modalRoot)
}
