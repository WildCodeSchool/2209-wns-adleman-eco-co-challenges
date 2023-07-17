import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Divider } from '@ui-kitten/components';
interface IndexProps {
    title: string;
    description: string;
    image: string;
}

const picture = (image: string | null): string => {
    if (typeof (image) === 'string' && image.length > 7) {
        return image;
    }
    return "https://api.dicebear.com/6.x/adventurer/png?seed=Angel15";
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

const Index = ({ title, description, image }: IndexProps): React.ReactElement => (
    <>
        <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Image
            style={styles.logo}
            source={{
                uri: picture(image)
            }}
        />
        </View>
        <Divider/>
    </>
);

export default Index;