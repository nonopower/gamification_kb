import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import GameHome from './pages/GameHome'
import Login from './components/game/Login'
import CreateRole from './components/game/CreateRole'
import Lobby from './components/game/Lobby'
import User from './components/game/User'
import Battle from './components/game/Battle'
import About from './pages/About'
import Footer from './components/Footer'
import Index from './pages/Index'
import IndexOfTeacher from './pages/teacher/index'
import Forum from './pages/Forum'
import Dashboard from './pages/Dashboard'
import PrepareLessons from './pages/teacher/PrepareLessons'
import { RequireAuth } from 'react-auth-kit'

export default function App() {
   return (
      <Router className="App">
         <Routes>
            <Route path="/" element={[<Home />, <About />, <Footer />]}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
               path="/index"
               element={
                  <RequireAuth loginPath="/">
                     <Index />
                  </RequireAuth>
               }
            ></Route>
            <Route
               path="/teacher/index"
               element={
                  <RequireAuth loginPath="/">
                     <IndexOfTeacher />
                  </RequireAuth>
               }
            ></Route>
            <Route
               path="/forum"
               element={
                  <RequireAuth loginPath="/">
                     <Forum />
                  </RequireAuth>
               }
            ></Route>
            <Route
               path="/dashboard"
               element={
                  <RequireAuth loginPath="/">
                     <Dashboard />
                  </RequireAuth>
               }
            ></Route>
            <Route
               path="/teacher/pageOfPrepareLesson"
               element={
                  <RequireAuth loginPath="/">
                     <PrepareLessons />
                  </RequireAuth>
               }
            ></Route>
            <Route path="/game" element={<Navigate to="login" />} />
            <Route path="/game" element={<GameHome />}>
               <Route path="login" element={<Login />} />
               <Route path="create-role" element={<CreateRole />} />
               <Route
                  path="lobby"
                  element={
                     <RequireAuth loginPath="/game/login">
                        <Lobby />
                     </RequireAuth>
                  }
               />
               <Route
                  path="user"
                  element={
                     <RequireAuth loginPath="/game/login">
                        <User />
                     </RequireAuth>
                  }
               />
               <Route
                  path="battle-lobby"
                  element={
                     <RequireAuth loginPath="/game/login">
                        <Battle />
                     </RequireAuth>
                  }
               />
            </Route>
         </Routes>
      </Router>
   )
}
