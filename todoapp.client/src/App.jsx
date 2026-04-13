import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <div>
      <h1>React + .NET</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App