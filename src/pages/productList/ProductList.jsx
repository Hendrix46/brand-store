import {Box, Container, Group, LoadingOverlay, SimpleGrid} from "@mantine/core";
import {useQuery} from "react-query";
import {useGetProductList} from "../../hooks/product/useGetProductList.js";
import SelectField from "../../components/fields/select/SelectField.jsx";
import {FeaturesCard} from "../../components/cards/FeaturesCard.jsx";
import {useEffect, useState} from "react";

export const ProductList = () => {
    const {
        data = { products: [] },
        error,
        isLoading,
    } = useQuery("products", useGetProductList);

    const [products , setProducts] = useState([])
    const [sortByPrice, setSortByPrice] = useState(null);
    const [filterByStock, setFilterByStock] = useState(null);
    const [filterByName, setFilterByName] = useState(null);

    useEffect(() => {
        let result = [...data.products];
        if (filterByName) {
            result = result.filter(product => product.title.toLocaleLowerCase().includes(filterByName.toLowerCase()));
        }
        if (filterByStock) {
            result = result.filter(product => filterByStock === 'In Stock' ? product.stock > 0 : product.stock === 0);
        }
        if (sortByPrice) {
            result.sort((a, b) => sortByPrice === 'Asc' ? a.price - b.price : b.price - a.price);
        }
        setProducts(result);
    }, [data, sortByPrice, filterByStock, filterByName]);

    if (isLoading) return (
        <Box>
            <LoadingOverlay visible={isLoading} zIndex={1000} />
        </Box>
    );
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <>
            <Container size={1280} p={32}>
                <Group justify="end" gap={24} py={24}>
                    <SelectField
                        data={['iPhone', 'Samsung', 'Huawei', 'Macbook']}
                        label={'Filter by name'}
                        placeholder="Select product name"
                        onChange={(val)=> setFilterByName(val)}
                    />
                    <SelectField
                        data={['Asc', 'Desc']}
                        label={'Sort by price'}
                        defaultValue={'Asc'}
                        onChange={(val)=> setSortByPrice(val)}
                    />
                    <SelectField
                        data={['In Stock', 'Out of Stock']}
                        label={'Sort by stock available'}
                        placeholder="Select option"
                        onChange={(val)=> setFilterByStock(val)}
                    />
                </Group>
                <SimpleGrid cols={4}>
                    {products.map(product => (
                        <FeaturesCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </>
    )
}