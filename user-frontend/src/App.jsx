import MapExplorer from './components/MapExplorer'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <MapExplorer/>
    <h2 className='mt-[100vh] text-2xl font-bold'>Report fire</h2>
    <input className='p-4 border-2 rounded-md' type="text" placeholder='Location' />
      <br />
    <textarea className='p-4 border-2 rounded-md' type="text" placeholder='Add details' />
    <br />
    <button className='mb-96 bg-teal-600 p-5 text=white text-lg text-white'>Submit</button>
    </>
  )
}

export default App
