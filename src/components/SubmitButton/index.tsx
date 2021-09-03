import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import styles from './styles.module.scss'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  loading?: boolean
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button
      {...props}
      type="submit"
      className={`${styles.btnSubmit} ${props.loading ? styles.loading : ''} ${
        props.className ? props.className : ''
      }`}
    >
      {props.loading && (
        <div className={styles.loading}>
          <AiOutlineLoading3Quarters />
        </div>
      )}

      {props.children}
    </button>
  )
}

export default memo(SubmitButton)
