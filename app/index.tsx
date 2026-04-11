import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* menu section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color={"#2C3435"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/user.png")} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* search bar section */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={"#748E81"} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#748E81"
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      {/* todo list */}
      <FlatList
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <View style={styles.todoInfoContainer}>
              <Checkbox value={item.isDone} color={item.isDone ? "#1D352B" : "#748E81"} />
              <Text style={[styles.todoText, item.isDone && styles.strikeThrough]}>
                {item.title}
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={22} color={"#748E81"} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* add new todo */}
      <KeyboardAvoidingView
        style={styles.footer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TextInput placeholder="Task name" placeholderTextColor="#748E81" style={styles.newTodoInput} />
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={34} color={"#FFF"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F9F9F9", 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#748E81",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 8,
    borderRadius: 12,
    gap: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#2C3435",
    fontWeight: "500",
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    color: "#748E81",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingTop: 10,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#2C3435",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  addButton: {
    backgroundColor: "#1D352B", 
    padding: 10,
    borderRadius: 12,
    marginLeft: 15,
  },
});