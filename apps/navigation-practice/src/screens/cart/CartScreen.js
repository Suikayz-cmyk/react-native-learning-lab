import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useCart } from "../../context/CartContext";
import { formatRupiah } from "../../utils/formatRupiah";

export default function CartScreen() {

  const { cartItems, increaseQty, decreaseQty } = useCart();

  const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
  );
  
  const renderItem = ({ item }) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: "white",
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      alignItems: "center"
    }}
  >

    <Image
      source={item.image}
      style={{ width: 60, height: 60, marginRight: 10 }}
    />

    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "bold" }}>
        {item.name}
      </Text>

      <Text style={{ color: "orange" }}>
        Rp {formatRupiah(item.price)}
      </Text>
    </View>

    {/* Quantity */}
    <View style={{ flexDirection: "row", alignItems: "center" }}>

      <TouchableOpacity
        onPress={() => decreaseQty(item.id)}
      >
        <Text style={{ fontSize: 20 }}> - </Text>
      </TouchableOpacity>

      <Text style={{ marginHorizontal: 10 }}>
        {item.qty}
      </Text>

      <TouchableOpacity
        onPress={() => increaseQty(item.id)}
      >
        <Text style={{ fontSize: 20 }}> + </Text>
      </TouchableOpacity>

    </View>

  </View>
);

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#f5f5f5"
      }}
    >

      {cartItems.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Keranjang masih kosong
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id + index}
          />

          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 8,
              marginTop: 10
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
               Total: Rp {formatRupiah(total)}
            </Text>

             <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: "#007bff",
                padding: 14,
                borderRadius: 8,
                alignItems: "center"
              }}
              onPress={() => alert("Checkout berhasil")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Checkout
              </Text>
            </TouchableOpacity>

          </View>
        </>
      )}

    </View>
  );
}