import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProducDetail from './Pages/ProducDetail'
import Login from './Pages/Login'
import Car from './Pages/Car'
import MyNavBar from './Components/MyNavBar'
import LoadingScreen from './Components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux';
import { getProductThunk } from './store/slices/NewProduct.scile'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './Components/ProtectedRouters'


function App() {
  const [count, setCount] = useState(0)
  const isLoading = useSelector(state => state.isLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductThunk());
  }, [])

  return (
    <HashRouter>
      <MyNavBar />
      {isLoading && <LoadingScreen />}

      <Container className='mt-5'>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProducDetail />} />
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/car' element={<Car />} />
          </Route>

        </Routes>
      </Container>

    </HashRouter>
  )
}

export default App
