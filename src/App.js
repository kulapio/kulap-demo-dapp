import { createGlobalStyle } from 'styled-components'
import MainPanel from "./containers/main"


const GlobalStyle = createGlobalStyle`
  body {
     
  }
  &.main {
    height: 100vh;
    background: radial-gradient( #373B44 , #4286f4);
  }
`


function App() {
  return (
    <>
      <GlobalStyle />
      <div className="main">
        <MainPanel />
      </div>
    </>
  );
}

export default App;
