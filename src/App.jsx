import './App.css'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import MainSection from './components/opencv/mainSection.jsx'
import ExplorerSection from './components/explorer/explorer.jsx'
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';

const MediaCenter = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Header/>
      <MainSection/>
      <Footer/>
    </div>
  )
}
const FileExplorer = () => {
  return (
    <div className='container'>
        <Header/>
        <ExplorerSection/>
        <Footer/>
    </div>
  )
}
const About = () => {
  return (
    <div className='container'>
        <Header/>
        <div className='container'>About</div>
        <Footer/>
    </div>
  )
}
const Home = () => {
  return (
    <div className='container'>
        <Header/>
        <div className='container'></div>
        <Footer/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/media" element={<MediaCenter/>} />
        <Route path="/file-explorer" element={<FileExplorer/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  )
}

export default App
