import React from 'react'
import WorkTools from './WorkTools'
import AppContextProvider from '../../components/hooks/context'

export default function WorkDesk() {
  return (

    <AppContextProvider>
      <WorkTools imgUrl="http://localhost:3000/assets/gallery/GettyImages-1207721867.jpg" embeddingUrl="http://localhost:3000/assets/gallery/GettyImages-1207721867.jpg.txt" />
    </AppContextProvider>
  )
}
