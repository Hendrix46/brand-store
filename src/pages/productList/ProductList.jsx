import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Drawer,
    Flex,
    Group,
    LoadingOverlay,
    Pagination,
    SimpleGrid,
    Text,
    Title,
    UnstyledButton
} from "@mantine/core";
import {useQuery} from "react-query";
import {useProductList} from "../../hooks/product/useProductList.js";
import SelectField from "../../components/fields/select/SelectField.jsx";
import {FeaturesCard} from "../../components/cards/FeaturesCard.jsx";
import {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {IconCheckupList, IconTrash} from '@tabler/icons-react';
import {useDispatch, useSelector} from "react-redux";
import classes from './styles.module.css'
import {clearCart, removeFromCart} from "../../store/slices/cartSlice.js";

export const ProductList = () => {
    const {
        data = { products: [] },
        error,
        isLoading,
    } = useQuery("products", useProductList);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [opened, { open, close }] = useDisclosure(false);
    const [products , setProducts] = useState([])
    const [sortByPrice, setSortByPrice] = useState(null);
    const [filterByStock, setFilterByStock] = useState(null);
    const [filterByName, setFilterByName] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        if (!isLoading && !error) {
            let filteredProducts = [...data.products];

            // Filter by name
            if (filterByName) {
                filteredProducts = filteredProducts.filter(product =>
                    product.title.toLowerCase().includes(filterByName.toLowerCase())
                );
            }

            // Sort by price
            if (sortByPrice) {
                filteredProducts.sort((a, b) => {
                    if (sortByPrice === 'Asc') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                });
            }

            // Sort by stock availability
            if (filterByStock) {
                filteredProducts = filteredProducts.filter(product => {
                    if (filterByStock === '50+') {
                        return product.stock >= 50;
                    } else if (filterByStock === '100+') {
                        return product.stock >= 100;
                    } else if (filterByStock === '150+') {
                        return product.stock >= 150;
                    }
                });
            }

            // Paginate products
            const indexOfLastProduct = currentPage * productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
            const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

            setProducts(currentProducts);
        }
    }, [data, isLoading, error, sortByPrice, filterByStock, filterByName, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) return (
        <Box>
            <LoadingOverlay visible={isLoading} zIndex={1000} />
        </Box>
    );
    if (error) return <Text fz={18} fw={500}>An error occurred: {error.message}</Text>;

    return (
        <>
            <Drawer
                position='right'
                opened={opened}
                onClose={close}
                title="Cart Items"
                classNames={{title: classes.cartTitle}}
            >
                {cartItems.length > 0 && cartItems?.map((item)=> (
                    <UnstyledButton key={item.id} className={classes.user}>
                        <Group>
                            <Avatar
                                src={item.thumbnail}
                                radius="md"
                            />

                            <div style={{ flex: 1 }}>
                                <Group justify='space-between'>
                                    <Text size="sm" fw={500}>
                                        {item.title}
                                    </Text>
                                    <Text size="sm" fw={500}>
                                        ${item.price}
                                    </Text>
                                </Group>

                                <Text c="dimmed" size="xs">
                                    {item.description}
                                </Text>
                            </div>

                            <Button bg='red' p={8} onClick={()=> dispatch(removeFromCart({id: item.id}))}>
                                <IconTrash
                                    style={{ width: 16, height: 16 }}
                                    stroke={1.5}
                                />
                            </Button>
                        </Group>
                    </UnstyledButton>
                ))}
                {cartItems.length ? (
                    <Button fullWidth onClick={() => dispatch(clearCart())} bg="red" radius="md" mt={12}>
                        Clear All
                    </Button>
                ) : (
                    <Center>
                        <Text> Cart is empty </Text>
                    </Center>
                )}
            </Drawer>
            <Container size={1280} p={32}>
                <Group justify='space-between'>
                    <Title order={1}>Product List</Title>
                    <Button onClick={open} bg='purple'  leftSection={<IconCheckupList size={18} />} >
                        Cart
                    </Button>
                </Group>
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
                        data={['50+', '100+', '150+']}
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
                <Flex justify="right" my={24}>
                    <Pagination
                        size='sm'
                        total={Math.ceil(data.total / productsPerPage)}
                        onChange={handlePageChange}
                    />
                </Flex>
            </Container>
        </>
    )
}