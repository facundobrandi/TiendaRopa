import React from 'react'
import axios from 'axios';

export const CreateCategori = (NameCategory) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7235/Categoria/Create',
        headers: { 
          'accept': '*/*', 
          'Content-Type': 'application/json'
        },
        data : NameCategory
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });


  return (<></>
  )
}
