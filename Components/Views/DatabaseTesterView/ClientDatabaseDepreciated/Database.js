/*




DEPRECIATED






import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import User from "../users";
import firebaseConfig from "../firebaseConfig";

class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Yellow",
      data: [],
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.db = firebase.firestore();

    this.getAllUsers();
    if (this.db == undefined) {
      console.error("Error could not connect to database");
      alert("Could not connect to database, check your internet connection");
    } else {
      this.db.collection("users").onSnapshot((collection) => {
        console.log("Current data: ", collection.docs);
        this.setState({ data: collection.docs.map((doc) => doc.data()) });
      });
    }
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

  async deleteDatabaseUsers() {
    this.db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.db
            .collection("users")
            .doc(doc.id)
            .delete()
            .then(function () {
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        });
      });
  }

  getAllUsers = async () => {
    if (typeof this.state.props != "undefined") {
      this.state.db.settings({});

      const users = await props.db.collection("users").get();
      this.setState({
        data: users.docs.map((doc) => doc.data()),
      });
      console.log("Current data: ", collection.docs);
    }
  };

  render() {
    return (
      <View>
        <Fragment>
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

          {<User />}
          <Text>Amount of users found: {this.state.data.length}</Text>
          {this.state.data.map((person, index) => {
            console.log(`User ${index}`);
            console.log(person);

            return (
              <Text key={index}>
                "User {index}: {person.e.firstName} {person.e.lastName}"
              </Text>
            );
          })}
        </Fragment>
      </View>
    );
  }
}
export default Database;
*/