import axios from "axios";

export const useProductDetail = async (productId) => {
    const response = await axios.get(
        `https://dummyjson.com/products/${productId}`,
    );
    return response.data;
};