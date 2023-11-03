import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const url =
  'https://api.unsplash.com/search/photos?client_id=nTPGdSrrzICjf4xyV5E0ahVnsROBM4qSumwhIxX6NTU'

const Gallery = () => {
  const { searchTerm } = useGlobalContext()

  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const response = await axios.get(`${url}&query=${searchTerm}`)
      return response.data
    },
  })

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  const results = response.data.results
  console.log(results)

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular
        return (
          <img
            src={url}
            key={item.id}
            className="img"
            alt={item.alt_description}
          />
        )
      })}
    </section>
  )
}

export default Gallery
