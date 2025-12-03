import AppContext from '../utils/context';
import Home from '../components/Home/Homed';
import './globals.css'


export default function Page() {
  return (
    <AppContext>
      <Home />

    </AppContext>
  )
}
