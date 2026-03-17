import { View, Text, Image, TouchableOpacity } from "react-native";
import { useCart } from "../../context/CartContext";
import { formatRupiah } from "../../utils/formatRupiah";

export default function ProductDetailScreen({ route }) {

  const { product } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={{ padding: 20 }}>

      <Image
        source={product.image}
        style={{ width: "100%", height: 250 }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        {product.name}
      </Text>

      <Text style={{ fontSize: 18, color: "orange", marginVertical: 10 }}>
        Rp {formatRupiah(product.price)}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {/* Tambah Keranjang */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#ff9800",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            marginRight: 10
          }}
          onPress={() => addToCart(product)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Tambah Keranjang
          </Text>
        </TouchableOpacity>

        {/* Beli Sekarang */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#28a745",
            padding: 14,
            borderRadius: 8,
            alignItems: "center"
          }}
          onPress={() => alert("Langsung checkout berhasil")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Beli Sekarang
          </Text>
        </TouchableOpacity>
        </View>

    </View>
  );
}