import React from 'react';
import styles from './app.css';
import Form from "react-jsonschema-form";
import ReactDom from 'react-dom';

// Custom widget 
class GeoPosition extends React.Component {
  constructor(props) {
    super(props);
  }

 onChange(name) {
    return (event) => {
      this.setState({
        [name]: parseFloat(event.target.value)
      }, () => this.props.onChange(this.state));
    };
  }

 render() {
    const {lat, lon} = this.state;
    return (
      <div>
        <input type="number" value={lat} onChange={this.onChange("lat")} />
        <input type="number" value={lon} onChange={this.onChange("lon")} />
      </div>
    );
  }
}
