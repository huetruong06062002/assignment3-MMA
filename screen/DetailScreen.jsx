import axios from "axios";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

function DetailScreen({ route, navigation }) {
  const { productTypeId } = route.params || {};
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://663b458ffee6744a6ea103a0.mockapi.io/product/${productTypeId}`
      );
      setProductDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productTypeId) {
      fetchProductDetail();
    }
  }, [productTypeId]);

  if (!productTypeId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No product available</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        source={{ uri: productDetail.image }}
        style={{ resizeMode: "contain" }}
        className="w-full h-[450px] bg-white rounded-b-2xl "
      />
      <View className="px-6 mt-5">
        <Text>{productDetail.artName}</Text>
        {/* Add other product details here */}
      </View>
    </ScrollView>
  );
}

export default DetailScreen;