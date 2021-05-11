import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import styles from './styles'

import { icons, COLORS, SIZES, FONTS } from '../../constants'

const Recipe = () => {

    const [recipe, setRecipe] = React.useState(null);

    React.useEffect(() => {
        let {item} = route.params;

        setRecipe(item)
    })

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.touch}
                    onPress={() => navigation.goBack()}
                >
                    <Image style={styles.img}
                        source={icons.back}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Recipe Name Section */}
                <View style={styles.title}>
                    <View style={styles.subtitle}>
                        <Text style={{ ...FONTS.h3 }}>{recipe?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.touch}
                >
                    <Image
                        source={icons.list}
                        resizeMode="contain"
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
        </SafeAreaView>
    )
    
}

export default Recipe;