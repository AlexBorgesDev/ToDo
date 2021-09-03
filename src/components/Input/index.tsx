import {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  memo,
  useState,
} from 'react'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  containerStyle?: CSSProperties
  containerClass?: string
}

const Input = (props: InputProps) => {
  const [hasContent, setHasContent] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasContent(event.target.value.length > 0)

    props.onChange && props.onChange(event)
  }

  return (
    <div
      className={`${styles.container} ${props.error ? styles.error : ''}  ${
        props.containerClass ? props.containerClass : ''
      }`}
      style={props.containerStyle}
    >
      <input
        type="text"
        {...props}
        className={`${styles.input} ${props.className ? props.className : ''}`}
        placeholder=""
        onChange={onChange}
      />

      {props.placeholder && (
        <label className={`${styles.label} ${hasContent ? styles.active : ''}`}>
          {props.placeholder}
        </label>
      )}
    </div>
  )
}

export default memo(Input)
