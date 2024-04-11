import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './components/game/Login'
import CreateRole from './components/game/CreateRole'
import Lobby from './components/game/Lobby'
import User from './components/game/User'
import Battle from './components/game/Battle'

export default function App() {
   return (
      <Router className="App">
         <Routes>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/" element={<Home />}>
               <Route path="login" element={<Login />} />
               <Route path="create-role" element={<CreateRole />} />
               <Route path="lobby" element={<Lobby />} />
               <Route path="user" element={<User />} />
               <Route path="battle-lobby" element={<Battle />} />
            </Route>
         </Routes>
      </Router>
   )
}
