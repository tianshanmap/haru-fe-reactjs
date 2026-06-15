import './App.css'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import MainSection from './components/opencv/mainSection.jsx'
import ExplorerSection from './components/explorer/explorer.jsx'
import VideoCreator from './components/video/video_creator_main.jsx'
import CanvasContainer from './components/common/CanvasContainer.jsx'
import DragAndDrop from './components/common/DragAndDrop.jsx'
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
const ConvasHome = () => {
  return (
    <div className='container'>
        <Header/>
        <CanvasContainer/>
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
const DragAndDropHome = () => {
  return (
    <div className='container'>
        <Header/>
        <DragAndDrop base_url="http://localhost:8080/filesystem/" name="/Users/developer/T9/travels/processed/174-alison/jpeg" />
        <Footer/>
    </div>
  )
}
const VideoCreatorHome = () => {
  return (
    <div className='container'>
        <Header/>
        <VideoCreator base_url="http://localhost:8080/filesystem/" />
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
        <Route path="/canvas" element={<ConvasHome/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/draganddrop" element={<DragAndDropHome/>} />
        <Route path="/videoman" element={<VideoCreatorHome/>} />
      </Routes>
    </Router>
  )
}

export default App
