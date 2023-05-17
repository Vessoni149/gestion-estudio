import { CrudApi } from './components/CrudApi';
import logo from '../src/assets/Logo_files/clock.png';


function App() {
  return (
    <>
      <h1 style={{textAlign: "center", textShadow:"5px 5px 5px #000"}}>Gestiona tu estudio</h1>
      <div style={{display:"flex", justifyContent:"center"}}>
        <img src={logo} style={{width:"20%",borderRadius:"100px",border:"3px solid #grey", boxShadow:"0 12px 0 #2f2f2f",}} ></img>
      </div>
      <CrudApi></CrudApi>
      <br></br>
      <hr></hr>
    </>
  );
}

export default App;
