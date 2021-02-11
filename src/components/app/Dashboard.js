import React, { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"

const Dashboard = () => {
  const { state } = useAuth()
  const accessToken = state.jwt; 
  const [countAlbum, setCountAlbum] = useState(null);
  const [countListening, setCountListening] = useState(null);
  const apiURL = process.env.DISCODIARY_API_URL

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+accessToken);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(apiURL+'/albums/count', requestOptions)
      .then(response => response.text())
      .then(result => setCountAlbum(result))
      .catch(error => console.log('error', error));

    fetch(apiURL+'/listenings/count', requestOptions)
      .then(response => response.text())
      .then(result => setCountListening(result))
      .catch(error => console.log('error', error));

  });

  return (
      <>      
      <h1>Dashboard</h1>
      <p>This is a protected Dashboard</p>
      <div className="-m-2 text-center">
        <div className="p-2">
          <div className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
            <span className="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center">{countAlbum}</span>
            <span className="inline-flex px-2">Albums</span>
          </div>
        </div>      
      </div>
      <div className="-m-2 text-center">
        <div className="p-2">
          <div className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
            <span className="inline-flex bg-purple-600 text-white rounded-full h-6 px-3 justify-center items-center">{countListening}</span>
            <span className="inline-flex px-2">Ecoutes</span>
          </div>
        </div>      
      </div>      
      </>
    )
}

export default Dashboard