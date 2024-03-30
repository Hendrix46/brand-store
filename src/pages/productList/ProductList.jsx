import {Box, Container, Group, LoadingOverlay, SimpleGrid} from "@mantine/core";
import {useQuery} from "react-query";
import {useGetProductList} from "../../hooks/product/useGetProductList.js";
import SelectField from "../../components/fields/select/SelectField.jsx";
import {FeaturesCard} from "../../components/cards/FeaturesCard.jsx";
import {useEffect, useState} from "react";

export const ProductList = () => {

    const {
        data,
        error,
        isLoading,
    } = useQuery("products", useGetProductList);

    const [products , setProducts] = useState(null)

    const handleSortByPrice = (val) => {
        if (val === 'Asc') {
            setProducts(data.products.sort((a, b) => a.price - b.price))
        } else if (val === 'Desc') {
           setProducts(data.products.sort((a, b) => b.price - a.price))
        }
    }
    const handleFilterByName = (val) => {
        setProducts(data.products.filter(product => product.title.toLocaleLowerCase().includes(val.toLowerCase())))
    }

    const handleFilterByStockAvailable = (val) => {
        setProducts(data.products.filter(product => val === 'In Stock' ? product.stock > 0 : product.stock === 0))
    }

    useEffect(() => {
        if (!isLoading && data?.products.length){
            setProducts(data.products)
        }
    }, []);


    if (isLoading) return (
        <Box>
            <LoadingOverlay visible={isLoading} zIndex={1000} />
        </Box>
    );

    if (error) return <div>An error occurred: {error.message}</div>;
    console.log(products, 'PROD')
    return (
        <>
            <Container size={1280} p={32}>
                <Group justify="end" gap={24} py={24}>
                    <SelectField
                        data={['iPhone', 'Samsung', 'Huawei', 'Macbook']}
                        label={'Filter by name'}
                        placeholder="Select product name"
                        onChange={(val)=> handleFilterByName(val)}
                    />
                    <SelectField
                        data={['Asc', 'Desc']}
                        label={'Sort by price'}
                        defaultValue={'Asc'}
                        onChange={(val)=> handleSortByPrice(val)}
                    />
                    <SelectField
                        data={['In Stock', 'Out of Stock']}
                        label={'Sort by stock available'}
                        placeholder="Select option"
                        onChange={(val)=> handleFilterByStockAvailable(val)}
                    />
                </Group>
                <SimpleGrid cols={4}>
                    {data.products.map(product => (
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
