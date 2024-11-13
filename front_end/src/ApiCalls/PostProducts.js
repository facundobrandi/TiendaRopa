import { useState, useEffect } from 'react';
import axios from 'axios';
const FormData = require('form-data');


const api = axios.create({
    baseURL: "https://localhost:7232",
    headers: { accept: "*/*" },
});

export const PostProducts = (values) => {

    console.log("dhwiahidw")

    const product = new FormData();
    product.append('Nombre',values.product);
    product.append('Descripcionlarga',values.descriptionLong);
    product.append('Descripcioncorta',values.descriptionShort);
    product.append('Precio',values.price);
    product.append('StockChico',values.stockChico);
    product.append('StockGrande',values.stockLargo);
    product.append('StockMedio',values.stockMedio);
    product.append('Categoriaid',values.categoriaId);
    product.append('file',values.image);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7232/Product/Create',
        headers: { 
          'accept': '*/*'
        },
        data : product
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
    
    // el ,[]); es SUPER IMPORTANTE POR QUE FRENA A EL CODIGO DE PEDIR EL LLAMADO POR INFINITO 
}
