import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from 'styled-components'

import { Routes } from './Routes'

import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import { AuthProvider } from './providers/auth'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
