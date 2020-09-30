import React, { ChangeEvent, Fragment } from "react";
import firebase from "firebase";
import { TextInput, Button, View, StyleSheet } from "react-native";
import { Formik, Form, Field } from "formik";

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
    };
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

  addUser = (e) => {
    /*
With firebase.firestore() we’re initialising Firestore through firebase and saving to a variable.
db.collection(“users”) is simply pointing to our database; the collection we created called users.
finally the .add() method is submitting our data object with the users full name and email taken from our updated state.
*/
    const db = firebase.firestore();
    db.settings({});
    const userRef = db.collection("users").add({
      e
    });
    console.log("Added");
    console.log(this.state);
    console.log(e);

    this.setState({
      firstName: "",
      lastName: "",
    });
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

export default User;
