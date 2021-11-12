import './App.css'
import Tasks from './components/Tasks/Tasks'

function App() {
  return (
    <div className="container-fluid mt-2">
      <h5 className="bg-primary text-white p-2">Aplikacja zlecenia</h5>
      <Tasks />
    </div>
  )
}

export default App