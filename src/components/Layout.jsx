import React from 'react'
import { Header } from '.'

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default layout
