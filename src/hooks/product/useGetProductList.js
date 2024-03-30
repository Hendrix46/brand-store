import axios from "axios";

export const useGetProductList = async () => {
    const response = await axios.get(
        `https://dummyjson.com/products?limit=100`,
    );
    return response.data;
};