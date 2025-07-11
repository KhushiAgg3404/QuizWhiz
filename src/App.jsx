import React from 'react'
import Quiz1 from './components/Quiz1'
import { Provider } from 'react-redux'
import { store } from './store/store'

const App = () => {
  return (
    <div>
      <Provider store={store} >
      <Quiz1/>
      </Provider>
    </div>
  )
}

export default App

