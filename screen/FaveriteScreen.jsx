import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons"; // Ensure you have installed @expo/vector-icons
import { Rating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


function FaveriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleProductClick = (product) => {
    console.log("navigate to detail product", product.id);
    navigation.navigate("Home", {
      screen: "Detail Product",
      params: { productTypeId: product.id },
    });
  };

  const fetchFavorites = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );


  const handleRemoveFavorite = async (item) => {
    let favoritesList = favorites.filter((favItem) => favItem.id !== item.id);
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesList));
    setFavorites(favoritesList);
    ToastAndroid.show("Removed product from favorite", ToastAndroid.SHORT);
  };

  const handleRemoveAllFavorites = async () => {
    await AsyncStorage.removeItem("favorites");
    setFavorites([]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const oldPrice = item.price / (1 - item.limitedTimeDeal);
    const formattedOldPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(oldPrice);
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(item.price);

    const totalRating = item.comments.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    const averageRating = (totalRating / item.comments.length).toFixed(1);

    return (
      <TouchableOpacity
        onPress={() => handleProductClick(item)}
        className="w-[180px] h-[250px] m-[15px] flex flex-col"
      >
        <View style={{ position: "relative", width: "100%", height: "66%" }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 3,
              backgroundColor: "#E4E4E4",
            }}
            resizeMode="cover"
          />
          {item.limitedTimeDeal > 0 && (
            <View
              style={{
                position: "absolute",
                top: 5,
                left: 5,
                backgroundColor: "#e91e63",
                padding: 5,
                borderRadius: 3,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {item.limitedTimeDeal * 100}% OFF
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            height: "40%",
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: "white",
          }}
          className="shadow-inner"
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 16 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.artName}
          </Text>
          {item.limitedTimeDeal > 0 ? (
            <View className="flex flex-row items-center mt-1">
              <Text className="font-bold text-gray-500 line-through mr-2">
                {formattedOldPrice}
              </Text>
              <Text className="font-bold text-pink-500 text-[16px]">
                {formattedPrice}
              </Text>
            </View>
          ) : (
            <Text className="font-bold text-pink-500 mt-1 text-[16px]">
              {formattedPrice}
            </Text>
          )}
          <View className="flex flex-row items-center justify-between my-4">
            <View className="lex flex-row items-center">
              <Rating
                ratingCount={1}
                readonly={false}
                imageSize={15}
                startingValue={1}
              />
              <Text className="ml-1">{averageRating} Rating</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View className="flex flex-row justify-between px-3 overflow-hidden py-2">
      <Text className="text-xl font-bold">You have {favorites.length} item</Text>
      <TouchableOpacity onPress={handleRemoveAllFavorites}>
        <Text className="text-lg text-red-500">{favorites.length > 0 && "Remove all"}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 300 }}>
      <Text className="font-bold text-2xl">No items added to list yet.</Text>
    </View>
  );

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString()}
      numColumns={2}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={true}
      bounces={true}
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyComponent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}

export default FaveriteScreen;