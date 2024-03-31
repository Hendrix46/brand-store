import {Badge, Box, Button, Card, Container, Group, Image, LoadingOverlay, rem, Text, Title} from '@mantine/core';
import {Carousel} from '@mantine/carousel';
import {IconStar} from '@tabler/icons-react';
import classes from './CarouselCard.module.css';
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {useProductDetail} from "../../hooks/product/useProductDetail.js";

export function ProductDetail() {
    const { productId } = useParams();
    const {
        data,
        isLoading,
        error
    } = useQuery(
        ["productDetail", productId],
        () => useProductDetail(productId)
        )

    const slides = data?.images?.map((image) => (
        <Carousel.Slide key={image} mah={450}>
            <Image src={image} />
        </Carousel.Slide>
    ));
    if (isLoading) return (
        <Box>
            <LoadingOverlay visible={isLoading} zIndex={1000} />
        </Box>
    );
    if (error) return <Text fz={18} fw={500}>An error occurred: {error.message}</Text>;

    return (
        <Container size="md">
            <Title order={1} py={12}>Product Detail</Title>
            <Card radius="md" withBorder padding="xl">
                <Card.Section>
                    <Carousel
                        withIndicators
                        withControls
                        loop
                        classNames={{
                            root: classes.carousel,
                            controls: classes.carouselControls,
                            indicator: classes.carouselIndicator,
                        }}
                    >
                        {slides}
                    </Carousel>
                </Card.Section>

                <Group justify="space-between" mt="lg">
                    <Text fw={500} fz="xl">
                        {data.title}
                    </Text>


                    <Group gap={5}>
                        <IconStar style={{ width: rem(16), height: rem(16) }} />
                        <Text fz="sm" fw={500}>
                            {data.rating}
                        </Text>
                    </Group>
                </Group>

                <Group gap={30} my={12}>
                    <Group gap={8} mb={0}>
                        <Text  fz="sm">Category</Text>
                        <Badge size="xs">{data.category}</Badge>
                    </Group>
                    <Group gap={8} mb={0}>
                        <Text  fz="sm">Brand</Text>
                        <Badge size="xs">{data.brand}</Badge>
                    </Group>
                </Group>

                <Text fz="md" c="dimmed" mt="sm">
                    {data.description}
                </Text>

                <Group my={24}>
                    <Text>Discount Percentage </Text>
                    <Badge variant="outline">${data.discountPercentage}</Badge>
                </Group>

                <Group justify="space-between">
                    <div>
                        <Text fz="xl" span fw={500} className={classes.price}>
                            {data.price}$
                        </Text>
                        <Text span fz="sm" c="dimmed">
                            {' '}
                            / {data.stock} available
                        </Text>
                    </div>

                    <Button radius="md">Buy now</Button>
                </Group>
            </Card>
        </Container>
    );
}