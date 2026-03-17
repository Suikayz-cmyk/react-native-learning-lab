import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { products } from '../../data/products';
import { formatRupiah } from "../../utils/formatRupiah";

export default function HomeScreen({ navigation }) {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10
      }}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >

      <Image
        source={item.image}
        style={{ width: "100%", height: 130, borderRadius: 8 }}
      />

      <Text style={{ fontWeight: "bold", marginTop: 5 }}>
        {item.name}
      </Text>

      <Text style={{ color: "orange" }}>
        Rp {formatRupiah(item.price)}
      </Text>

    </TouchableOpacity>
  );

  return (
    <View style={{ flex:1, backgroundColor:"#f5f5f5", padding:10 }}>

      <FlatList
        data={products}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}