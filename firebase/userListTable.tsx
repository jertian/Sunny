import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


export default class UserListTable extends React.Component<{}, { data: firebase.firestore.DocumentData[] }> {
    db = firebase.firestore();

    constructor(props: any) {
        super(props);
        this.state = { data: [] };
        this.getAllUsers();
        this.db.collection("users").onSnapshot( (collection) => {
            console.log("Current data: ", collection.docs);
            this.setState ({ data: collection.docs.map(doc => doc.data())});
        });
      }
    
    getAllUsers = async () => {
        
        this.db.settings({
        });

        const users = await this.db.collection('users').get()
        this.setState ({
            data: users.docs.map(doc => doc.data())
        });
    }

    render() {
        return (
          <View >
            
            <Text>Amount of users found: {this.state.data.length}</Text>
                <View>
        {this.state.data.map((person, index) => (
            <p key={index}>User {index}: {person.firstName} {person.lastName}</p>
        ))}
        </View>

    
          </View>
        );
      }
};
