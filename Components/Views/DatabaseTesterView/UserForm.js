import React, { ChangeEvent, Fragment } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
import { Formik, Form, Field } from "formik";
import serverInfo from '../../Common/ServerInfo.js';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
    };
  }

  getAllUsers() {
    this.props.getAllUsers();
  }
  updateInput(e, param) {
    const target = e.target;
    var name = param;
    this.setState({
      [param]: e.target.value,
    });
    console.log("updating " + param);
    console.log(this.state);
  }

   async addUser(e) {

    await fetch(serverInfo.path + "/add", {
      method: "POST",
      cache: "no-cache",

      //mode: 'no-cors', // no-cors, *cors, same-origin, cors
      headers:{
        "Content-Type":"application/json",
    },
      body: JSON.stringify({user:e})
    }).then(response => {
      console.log( response.json());
    });
    console.log("Added");
    console.log(this.state);
    console.log(e);

    this.setState({
      firstName: "",
      lastName: "",
    });
    this.getAllUsers();
  };
  handleFocus = (event) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  render() {
    const { isFocused } = this.state;

    return (
      <Fragment>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.addUser(values);
            resetForm({ values: "" });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                placeholder="First Name"
                selectionColor={BLUE}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                style={testInputStyle.textInput}
                onFocus={this.handleFocus}
                underlineColorAndroid={this.state.isFocused ? BLUE : LIGHT_GRAY}
              />
              <TextInput
                placeholder="Last Name"
                selectionColor={BLUE}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                style={testInputStyle.textInput}
                onFocus={this.handleFocus}
                underlineColorAndroid={this.state.isFocused ? BLUE : LIGHT_GRAY}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
        {/*
        <TextInput
                style={{height: 40}}

          placeholder="First Name"
          onChange={(e) => this.updateInput(e, "firstName")}
          text={this.state.firstName}
        />
        <TextInput
                style={{height: 40}}

          placeholder="Last Name"
          onChange={(e) => this.updateInput(e, "lastName")}
          text={this.state.lastName}
        />
        <Button title={"Save to database"} onPress = {()=>this.addUser()}></Button>
*/}
      </Fragment>
    );
  }
}

const testInputStyle = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
});

export default UserForm;
