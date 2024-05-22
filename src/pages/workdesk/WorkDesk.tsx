import React from 'react'
import WorkTools from './WorkTools'
import AppContextProvider from '../../components/hooks/context'

export default function WorkDesk() {
  return (

    <AppContextProvider>
      <WorkTools imgUrl={window.location.origin + "/assets/gallery/GettyImages-1207721867.jpg"} embeddingUrl={window.location.origin + "/assets/gallery/GettyImages-1207721867.jpg.txt"} />
    </AppContextProvider>
  )
}
