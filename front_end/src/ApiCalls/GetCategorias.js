import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7235",
    headers: { accept: "*/*" },
});

export const useGetCategoria = () => {
    const [categoria, setProducts] = useState([]);
    const [loading_2, setLoading] = useState(true);
    const [error_2, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(`/Categoria/Lista`);
                setProducts(res.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // el ,[]); es SUPER IMPORTANTE POR QUE FRENA A EL CODIGO DE PEDIR EL LLAMADO POR INFINITO 

    return { categoria, loading_2, error_2 };
};