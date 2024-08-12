"use client"

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  
  return <div className='mt-16 prompt_layout'>

    
      


    {data.map((post) => (
      <PromptCard 
      key={post._id}
      post = {post}
      handleTagClick={handleTagClick}
      
      />
    ))}


  </div>



}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  // const [filterData, setFilterData] = useState([])

  // const filterDataOnSearch =() => {
  //   const filteredData = posts.filter(post => post.prompt.includes(searchText) || post.tag.includes(searchText))
  //   setFilterData(filteredData)
  // }

  const handleSearchChange = (e) => {
    const searchValue = e.target.value
    setSearchText(searchValue)
    // filterDataOnSearch()
  }

  const handleTagClick = (tag) => {
    setSearchText(tag.replace(/^#/, '').trim()); // Remove leading '#' from tag if present
};



  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt?search_by=${searchText}`)
      const data = await response.json()
      // console.log(data)

      setPosts(data)
      // setFilterData(data)

    }

    fetchPost()

  },[searchText])



  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type="text"
        placeholder='Search for prompts'
        value={searchText}
        onChange = {handleSearchChange}
        required
        className='search_input peer'
        
        />

      </form>

      <PromptCardList
      data = {posts}
      handleTagClick = {handleTagClick}
      />

    </section>
  )
}

export default Feed