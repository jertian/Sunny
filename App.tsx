import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import User from "./firebase/users";
import firebaseConfig from "./firebase/firebaseConfig";
import UserListTable from "./firebase/userListTable";

export default class App extends React.Component<{}, { text: string }> {
  db: firebase.firestore.Firestore;
  constructor(props: any) {
    super(props);
    this.state = { text: "Yellow" };
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();

  }

  eventHandlerExample() {
    if (this.state.text === "Yellow") {
      this.setState({
        text: "Hello there!",
      });
    } else {
      this.setState({
        text: "Yellow",
      });
    }
  }

  writeToDatabase() {
    this.setState({ text: "Writing to database..." });
  }

  async deleteDatabaseUsers() {
    this.db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.db.collection("users").doc(doc.id).delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      });
  });

   
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>

        <Button
          onPress={() => this.eventHandlerExample()}
          title="Event handler example"
          color="#841584"
        ></Button>
                <Button
          onPress={() => this.deleteDatabaseUsers()}
          title="Clear database"
          color="#841584"
        ></Button>

        <User />
        <UserListTable />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
