import React, { useState } from 'react'
import { navigate } from 'gatsby'
import axios from 'axios'
import useAuth from "../../hooks/useAuth"
const apiURL = process.env.DISCODIARY_API_URL


async function saveListening(discogsId, score, token) {
  // Get discogs albums informations
  const album = await axios.get(`https://api.discogs.com/masters/`+discogsId);
  
  
  // Create album in discodiary
  const titleAlbum = album.data.title
  const yearAlbum = album.data.year
  const artistAlbum = album.data.artists[0].name
  const payloadAlbum = {"artist":artistAlbum, "title": titleAlbum, "year": yearAlbum, "discogsId" : discogsId}
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  
  try {
    await axios.post(`${apiURL}/albums`, payloadAlbum, config)
  } catch (error) {
  }
  
  // Get album in discodiary
  const albumDiscodiary = await axios.get(`${apiURL}/albums?discogsId=`+discogsId,config);

  // Add listening
  const albumId = albumDiscodiary.data[0]._id
  const dateListened = new Date()
  const payloadListening = {'date': dateListened , 'score': score, 'album' : albumId}
  const { data: payloadResult } = await axios.post(`${apiURL}/listenings`, payloadListening, config)

  return payloadResult;
}

const Listening = ({ redirect }) => {
    const { state } = useAuth()
    const [discogsId, setDiscogsId] = useState('')
    const [score, setScore] = useState('')
    const [error, setError] = useState('')    
    const [success, setSuccess] = useState('')    

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
          const result = await saveListening(discogsId, score, state.jwt)
          setSuccess('Saved !')
        } catch(e) {
          console.log("Error occurred during saving")
          const { response: { data: { message: [{ messages: [error]}] } } } = e
          const { message: msg } = error
          setError(msg)
        }
      }
    
    return (
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discogsId">
                Discogs Master Id
              </label>
              <input 
                onChange={ e => {
                  setDiscogsId(e.target.value)
                }}
                value={ discogsId }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="discogsId" type="text" placeholder="Discogs Id" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="score">
                Score
              </label>
              <input
                onChange={ e => {
                  setScore(e.target.value)
                }}
                value={ score }
                className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="score" type="text" placeholder="Score" />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
              </button>
            </div>
          </form>
          { (error.length > 1) && (
            <p className="text-center text-red-500 bg-red-200 border p-2">
              { error }
            </p>
          )}
          { (success.length > 0) && (
            <p className="text-center text-green-500 bg-green-200 border p-2">
              { success }
            </p>
          )}
        </div>
    )    
}
export default Listening