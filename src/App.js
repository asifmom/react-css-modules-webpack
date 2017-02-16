import React from 'react';
import styles from './app.css';
import Form from "react-jsonschema-form";



 const schema =  {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age"
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3
      }
    }
  }
  const uiSchema =  {
    firstName: {
      "ui:autofocus": true,
      classNames: "app"
    },
    age: {
      "ui:widget": "updown"
    },
    bio: {
      "ui:widget": "textarea"
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!"
    },
    date: {
      "ui:widget": "alt-datetime"
    }
  }

  export default class App extends React.Component {
 
  render() {

    return (
     
 <Form schema={schema} className={styles.app}
        uiSchema={uiSchema}
       />    )
  }
}
