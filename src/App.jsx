import './output.css'
import Body from './components/Body'
import { Provider } from 'react-redux'
import { appStore } from '../src/utils/appStore'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>

      <Provider store={appStore}>
        <Body />
      </Provider>

    </>
  )
}

export default App
