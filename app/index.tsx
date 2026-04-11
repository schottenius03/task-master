import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function Index() {

  // state management
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);

  // Initialize app state from AsyncStorage
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  // create todo
  const addTodo = async () => {
    if (todoText.trim() === "") return;
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  // delete todo
  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  // status todo 
  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          // Fixat: Skapar ett nytt objekt för att följa React-standard
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  // search logic 
  const onSearch = (query: string) => {
    if (query == "") {
      setTodos(oldTodos);
    } else {
      const filteredTodos = oldTodos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* menu section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Under construction!")}>
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
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      {/* todo list */}
      <FlatList data={[...todos].reverse()} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
          <ToDoItem  todo={item} deleteTodo={deleteTodo}  handleDone={handleDone} />
        )}
      />

      {/* add new todo */}
      <KeyboardAvoidingView style={styles.footer} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} >
        <TextInput  placeholder="Task name" placeholderTextColor="#748E81" value={todoText} onChangeText={(text) => setTodoText(text)} style={styles.newTodoInput} autoCorrect={false} />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={"#FFF"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// add new to do logic
const ToDoItem = ({
  todo,
  deleteTodo,
  handleDone,
}: {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  handleDone: (id: number) => void;
}) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <Checkbox value={todo.isDone} onValueChange={() => handleDone(todo.id)} color={todo.isDone ? "#748E81" : undefined} />
      <Text style={[styles.todoText, todo.isDone && styles.strikeThrough]}>
        {todo.title}
      </Text>
    </View>
    <TouchableOpacity onPress={() => { deleteTodo(todo.id) }}>
      <Ionicons name="trash-outline" size={22} color={"#748E81"} />
    </TouchableOpacity>
  </View>
);

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
    color: "#2C3435",
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
    backgroundColor: "#748E81", 
    padding: 10,
    borderRadius: 12,
    marginLeft: 15,
  },
});