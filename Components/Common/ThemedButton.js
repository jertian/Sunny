import React, {useState, useEffect } from 'react';
import { Button, Component } from "react-native";
const ThemeContext = React.createContext("light");

export default class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return (
      <Button
        theme={this.context}
        title={this.props.title}
        onPress={() => this.props.onPress()}
      />
    );
  }
}