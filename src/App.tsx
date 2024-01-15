import './Style.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Metas from './pages/metas'
import Datas from './pages/datas'
import Cronograma from './pages/cronograma'
import Tarefas from './pages/tarefas'
import Anotacoes from './pages/anotacoes'

export default function App() {
  return (
    <div className='App'>
      <Router>

        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/cronograma' element={<Cronograma/>}/>
          <Route path='/tarefas' element={<Tarefas/>}/>
          <Route path='/metas' element={<Metas/>}/>
          <Route path='/datas' element={<Datas/>}/>
          <Route path='/anotacoes' element={<Anotacoes/>}/>

        </Routes>

      </Router>
    </div>
  )
}