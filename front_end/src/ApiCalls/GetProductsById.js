import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7232",
    headers: { accept: "*/*" },
});

export const GetProductsById = (IdFilter) => {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(`/Product/GetById?id=${IdFilter}`);
                setProducts(res.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [IdFilter]);

    // el ,[]); es SUPER IMPORTANTE POR QUE FRENA A EL CODIGO DE PEDIR EL LLAMADO POR INFINITO 

    return { product, loading, error };
}
