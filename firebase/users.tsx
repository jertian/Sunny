import React, { ChangeEvent } from "react";
import firestore from "./firestore";
import firebase from "firebase";
interface IState {
  email: string;
  fullname: string;
}

class User extends React.Component<{}, { email: string; fullname: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      email:"",
      fullname: ""
    };
    
  }


  updateInput(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    var name: string = e.target.name as string;
    this.setState({
      [e.target.name]: e.target.value,
    } as Pick<IState, keyof IState>);
    console.log(this.state);
  }

  addUser = (e) => {
    e.preventDefault();

    /*
With firebase.firestore() we’re initialising Firestore through firebase and saving to a variable.
db.collection(“users”) is simply pointing to our database; the collection we created called users.
finally the .add() method is submitting our data object with the users full name and email taken from our updated state.
*/
    const db = firebase.firestore();
    db.settings({
    });
    const userRef = db.collection("users").add({
      firstName: this.state.fullname,
      lastName: this.state.email,
    });

    this.setState({
      fullname: "",
      email: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.addUser}>
        <input
          type="text"
          name="fullname"
          placeholder="First Name"
          onChange={(e) => this.updateInput(e)}
          value={this.state.fullname}
        />
        <input
          type="text" //Change this to email for final
          name="email"
          placeholder="Last Name"
          onChange={(e) => this.updateInput(e)}
          value={this.state.email}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default User;
