import React from 'react';
import styles from './app.css';
import Form from "react-jsonschema-form";
import ReactDom from 'react-dom';
import GeoPosition from './GeoPosition'

const fields = {geo: GeoPosition};

const schema =  {
    //title: "Nanoobject",
    // description: "A simple form example.",
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
        type: "string",
        title: "Age",
        pattern: "\d*",
      },
      bio: {
        type: "string", 
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3
      },
      retype: {
        type: "string",
        title: "Retype password",
        minLength: 3
      },
      lat: {type: "number"},
      lon: {type: "number"},
      needG: {
          "type": "boolean",
          "title": "Do you need a guardian?"
        }
  }
}

const guardianSchema={
    type: "object",
    required: ["gname"],
    properties:{
      gname: {
        type: "string",
        title: "Guardian Name",
      }

    }

}

 const uiSchema =  {
    firstName: {
      "ui:autofocus": true,
      classNames: "app",
    },
    lastName: {
      classNames: "app",
    },
    age: {
      classNames: "app",
    },  
    bio: {
      "ui:widget": "textarea",
      classNames: "app",
    },
    password: {
      "ui:widget": "password",
      classNames: "app",
    },
    retype: {
      "ui:widget": "password",
      classNames: "app",
    },
    date: {
      "ui:widget": "alt-datetime",
      classNames: "app",
    },
    geoloc:{
      "ui:field": "geo",
      classNames: "app",
    },
    needG: { 
      "ui:widget": "radio" 
    }
  }



// Validations
  function validate(formData, errors) {
  if (formData.password !== formData.retype) {
    errors.retype.addError("Passwords don't match");
  }
  return errors;


}

function addGuardianDetailsOnDomainModel(){
  var newSchema = JSON.parse(JSON.stringify(schema))
  newSchema.required.push(guardianSchema.required)
  newSchema.properties.gname = guardianSchema.properties.gname
  return newSchema;
}


// On change of main form
function onAlter(formData) {
  console.log("here",formData)
  var dataSchema=schema
  
  if (formData.formData.needG) {
      var dataSchema=addGuardianDetailsOnDomainModel()
  }
  else if(formData.formData.needG == false){
    debugger;
    delete formData.formData.gname
  }  
  ReactDom.render(renderForm(dataSchema,formData.formData), document.getElementById("root"));

}

function onSubmit(formData) {
    console.log("HI")
    ReactDom.render(<div><h1>Summary</h1><pre>{JSON.stringify(formData.formData, null, 2) }</pre></div>,
             document.getElementById("root2"));

   
 }

 function renderForm(schema,formData){
  return <Form schema={schema} 
              uiSchema={uiSchema} validate={validate} fields={fields} onChange={onAlter} onSubmit={onSubmit} formData={formData}
             />
 }


//Main method
export default class App extends React.Component {
  render() {
    return (
     renderForm(schema,{}) )
        }
}