import { useNavigate } from 'react-router-dom';
function Header(){
  const navigate = useNavigate();
    return(
        <div className="header">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/about")}>About</button>
            <button onClick={() => navigate("/media")}>Media Center</button>
            <button onClick={() => navigate("/file-explorer")}>File Explorer</button>
        </div>
    )
}
export default Header