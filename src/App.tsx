import './App.css'
import {LoginPage} from './Pages/LoginPage.tsx';
import {LoginProvider} from "./app/LoginContext.tsx";

function App() {

    return (
        <LoginProvider>
            <LoginPage/>
        </LoginProvider>
    )
}

export default App
