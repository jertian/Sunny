import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "firebase/auth";
import "firebase/firestore";
import UserForm from "./UserForm.js";
import serverInfo from './../../Common/ServerInfo.js';


class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getAllUsers();
  }



  async deleteDatabaseUsers() {
    try {
        let res = await fetch(serverInfo.path + "/deleteAllUsers", {
          method: "GET",
          //mode: 'no-cors', // no-cors, *cors, same-origin, cors
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
        res = await res.json();
        console.log(res);
        debugger;
        this.getAllUsers();
      } catch (e) {
        console.error(e);
      }
  }

  getAllUsers = async () => {
    try {
        let res = await fetch(serverInfo.path + "/getAllUsers", {
          method: "GET",
          //mode: 'no-cors', // no-cors, *cors, same-origin, cors
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        });
        res = await res.json();
        console.log(res);
        this.setState({data:res})
      } catch (e) {
        console.error(e);
      }
      
  };

  
  render() {
    return (
      <View>
        <Fragment>


          <Button
            onPress={() => this.deleteDatabaseUsers()}
            title="Clear database"
            color="#841584"
          ></Button>

          {<UserForm getAllUsers={this.getAllUsers}/>}
          <Text>Amount of users found: {this.state.data.length}</Text>
          {this.state.data.map((person, index) => {
            console.log(`User ${index}`);
            console.log(person);

            return (
              <Text key={index}>
                "User {index}: {person.firstName} {person.lastName}"
              </Text>
            );
          })}
        </Fragment>
      </View>
    );
  }
}
export default Database;
