import React, {useState, useEffect} from 'react'
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/blogs')
        const result = await response.json()
        setData(result)
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching data: ', error)
        setIsLoading(false)
      }
    }
    fetchData()
    return () => {}
  }, [])

  return (
    <div className="data-fetcher-container">
      <h1>Data Fetcher</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="blog-list">
          {data.map(item => (
            <li key={item.id} className="blog-item">
              <div className="blog-item-container">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="blog-image"
                />
                <div className="blog-item-info">
                  <p className="blog-item-topic">Topic : {item.topic}</p>
                  <h1 className="blog-item-title">Title : {item.title}</h1>
                  <div className="author-info">
                    <img
                      src={item.avatar_url}
                      alt={item.id}
                      className="avatar"
                    />
                    <p className="author-name">Author : {item.author}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
