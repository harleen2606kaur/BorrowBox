import { Routes ,Route } from "react-router-dom"
import { LogIn } from "./components/LogIn"
import { SignUp } from "./components/SignUp"
export default function App()
{
  return(
    <>
      <Routes>
        <Route path="/" element={<LogIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}