
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './page/home'
import { Resume } from './page/resume'
import { Blog } from './page/blog'
import { Header } from './component/header'
import { Footer } from './component/footer'
import { Post } from './page/post'
import { Admin } from './page/admin'
import { PostEditor } from './page/postEditor'
import {ScrollToTop} from './component/scrollToTop'
function App() {
  return (
    <>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/resume' element={<Resume/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/blog/:id' element={<Post/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/new' element={<PostEditor/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
