import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  let msg = data.message;
  return (
    <div>
      <h1>React + .NET</h1>
      <pre>{msg}</pre>
      
    </div>
  )
}

export default App