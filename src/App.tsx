import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import SideNav from "./components/SideNav/SideNav";

function App() {
  const [overlay , setOverlay] = useState(false) 

  useEffect(() => {
    document.body.style.overflow =  overlay ?'hidden' : ''
  } , [overlay])


  

  return (
    <div className="wrapper" >
      <SideNav setOverlay={setOverlay}/>
      <Main overlay={overlay}/>
    </div>
  );
}

export default App;
