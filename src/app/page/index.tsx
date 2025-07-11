import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    setLoading(true)
    const res = await fetch('/api/proxy-search', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    })
    const { data } = await res.json()
    setResults(data || [])
    setLoading(false)
  }

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="검색어 입력"
      />
      <button onClick={handleSearch}>검색</button>
      {loading && <div>로딩중...</div>}
      <ul>
        {results.map((row: any, i) => (
          <li key={i}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  )
}
