import {Badge, Button, Card, Group, Image, Text} from '@mantine/core';
import classes from './FeaturesCard.module.css';

export function FeaturesCard({id, title, description, price, discountPercentage, brand, category, stock, thumbnail}) {

    return (
        <Card id={id} withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image h={200} src={thumbnail} alt={title} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb={12} h='100%'>
                <Group>
                    <Text fz="lg" fw={500}>{title}</Text>
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
                        ${stock} Available
                    </Text>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={30}>

                    <Button radius="xl" style={{ flex: 1 }}>
                        Buy now
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}