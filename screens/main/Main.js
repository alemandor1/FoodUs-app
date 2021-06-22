/* import React from 'react';
import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import firebaseService from '../../services/firebase';
import styles from './styles'
import { icons, SIZES, COLORS, FONTS } from '../../constants'

const Main = () => {
  const [name, setName] = useState('')
  useEffect(() => {
   (
     async () => {
       try {
         const userData = await firebaseService.getUser()
         setName(userData)
       } catch (e) {
         alert(e)
       }
     }
     )()
  }, [])

  const categoryData = [
    {
        id: 1,
        name: "Rice",
        icon: icons.rice_bowl,
    },
    {
        id: 2,
        name: "Noodles",
        icon: icons.noodle,
    },
    {
        id: 3,
        name: "Hot Dogs",
        icon: icons.hotdog,
    },
    {
        id: 4,
        name: "Salads",
        icon: icons.salad,
    },
    {
        id: 5,
        name: "Burgers",
        icon: icons.hamburger,
    },
    {
        id: 6,
        name: "Pizza",
        icon: icons.pizza,
    },
    {
        id: 7,
        name: "Snacks",
        icon: icons.fries,
    },
    {
        id: 8,
        name: "Sushi",
        icon: icons.sushi,
    },
    {
        id: 9,
        name: "Desserts",
        icon: icons.donut,
    },
    {
        id: 10,
        name: "Drinks",
        icon: icons.drink,
    },

  ]

  const recipeData = [
    {
        id: 1,
        name: "Arroz a la cubana",
        categories: [1],
        photo: 'https://recetasdecocina.elmundo.es/wp-content/uploads/2016/11/receta-arroz-a-la-cubana.jpg',
        duration: "30 - 45 min",
    },
    {
      id: 1,
      name: "Tinto de verano",
      categories: [10],
      photo: 'https://t1.uc.ltmcdn.com/images/2/3/8/como_hacer_tinto_de_verano_19832_600_square.jpg',
      duration: "10 - 20 min",
    },
    {
      id: 1,
      name: "Ensalada césar",
      categories: [4],
      photo: 'https://www.ecestaticos.com/image/clipping/7e21b991db215ff4e625699b2366444c/todos-los-trucos-para-hacer-la-autentica-ensalada-cesar.jpg',
      duration: "20 - 30 min",
    }
  ]

  const [categories, setCategories] = React.useState(categoryData)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [recipes, setRecipes] = React.useState(recipeData)

  function onSelectCategory(category) {
    //filter recipe
    let recipeList = recipeData.filter(a => a.categories.includes(category.id))

    setRecipes(recipeList)

    setSelectedCategory(category)
  }

  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id)

    if (category.length > 0)
        return category[0].name

    return ""
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    padding: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: SIZES.padding,
                    ...styles.shadow
                }}
                onPress={() => onSelectCategory(item)}
            >
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </View>

                <Text
                    style={{
                        marginTop: SIZES.padding,
                        color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                        ...FONTS.body5
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ padding: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h1 }}>Categorías</Text>
            <Text style={{ ...FONTS.h1 }}>Principales</Text>

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            />
        </View>
    )
  }

  function renderRecipeList() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2 }}
            onPress={() => navigation.navigate("Recipe", {
                item
            })}
        >
            
            <View
                style={{
                    marginBottom: SIZES.padding
                }}
            >
                <Image
                    source={item.photo}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: SIZES.radius
                    }}
                />

                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: 50,
                        width: SIZES.width * 0.3,
                        backgroundColor: COLORS.white,
                        borderTopRightRadius: SIZES.radius,
                        borderBottomLeftRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...styles.shadow
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                </View>
            </View>

            
            <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

            <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: 'row'
                }}
            >
                
                <View
                    style={{
                        flexDirection: 'row',
                        marginLeft: 10
                    }}
                >
                    {
                        item.categories.map((categoryId) => {
                            return (
                                <View
                                    style={{ flexDirection: 'row' }}
                                    key={categoryId}
                                >
                                    <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                    <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <FlatList
            data={recipes}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: SIZES.padding * 2,
                paddingBottom: 30
            }}
        />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        {renderMainCategories()}
        {renderRecipeList()}
    </SafeAreaView>
  )
}

export default Main */