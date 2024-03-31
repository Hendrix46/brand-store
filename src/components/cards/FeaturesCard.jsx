import {ActionIcon, Badge, Button, Card, Dialog, Group, Image, Notification, Text, Tooltip} from '@mantine/core';
import classes from './FeaturesCard.module.css';
import {IconCheck, IconExternalLink} from '@tabler/icons-react';
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/rotues.js";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../store/slices/cartSlice.js";
import {useDisclosure} from "@mantine/hooks";

export function FeaturesCard({id, title, description, price, discountPercentage, brand, category, stock, thumbnail}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [opened, { toggle, close }] = useDisclosure(false)
    const handleAddToCart = () => {
        // Check if the product is already in the cart
        const isProductInCart = cartItems.some(item => item.id === id);

        // If the product is not in the cart, add it
        if (!isProductInCart) {
            dispatch(addToCart({ id, title, price, thumbnail, description }));
            toggle()
        } else {
            // You can display a message or take other actions here
            alert('Product already in cart');
        }
    };

    return (
        <>
            <Card id={id} withBorder radius="md" className={classes.card}>
                <Card.Section className={classes.imageSection}>
                    <Image h={200} src={thumbnail} alt={title} />
                </Card.Section>

                <Group justify="space-between" mt="md" mb={12} h='100%'>
                    <Group>
                        <Text
                            className={classes.title}
                            fz="lg"
                            fw={500}
                            onClick={() => navigate(`${ROUTES.PRODUCT_DETAIL}/${id}`)}
                        >{title}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {description}
                        </Text>
                    </Group>
                    Discount Percentage
                    <Badge variant="outline">$ {discountPercentage}</Badge>
                </Group>

                <Card.Section className={classes.section}>
                    <Text fz="sm" c="dimmed" mb={8} className={classes.label}>
                        Tags
                    </Text>

                    <Group gap={8} mb={0}>
                        <Badge size="xs">{brand}</Badge>
                        <Badge size="xs">{category}</Badge>
                    </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Group justify="space-between">
                        <Text fz="lg" fw={700} style={{lineHeight: 1}}>
                            Price - ${price}
                        </Text>
                        <Text fz="sm" fw={500} style={{lineHeight: 1}}>
                            {stock} Available
                        </Text>
                    </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Group gap={12}>
                        <Button onClick={handleAddToCart} bg="purple" radius="md" style={{ flex: 1 }}>
                            Add to cart
                        </Button>
                        <Tooltip label="See Details">
                            <ActionIcon
                                size="md"
                                p={4}
                                onClick={() => navigate(`${ROUTES.PRODUCT_DETAIL}/${id}`)}
                            >
                                <IconExternalLink />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Card.Section>
            </Card>
            <Dialog opened={opened} withCloseButton onClose={close} p={0} size="lg" radius="md">
                <Notification icon={<IconCheck style={{ width: 20, height: 20 }} />} color="teal" onClose={close} title="Successfully added">
                    Product successfully added to cart
                </Notification>
            </Dialog>
        </>
    );
}