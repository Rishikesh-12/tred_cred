import React from 'react';
import {InputLabel} from '@material-ui/core';
import Logo from './logo.png';
import Error from './error.png'
import './Main.css'

const styles={
  hidden:{
  display:"none",
  },
  importLabel:{
  color: "white",
  },
};

const isEmpty = (ob) =>{
  for(var i in ob){
    return false;
  }
  return true;
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: '',
      condition: false,
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    fetch('https://tradecredback.herokuapp.com/api/upload', {
      mode: 'no-cors',
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "multipart/form-data; boundary=AaB03x" +
        "--AaB03x" +
        "Content-Disposition: file" +
        "Content-Type: png" +
        "Content-Transfer-Encoding: binary" +
        "...data... " +
        "--AaB03x--",
        "Accept": "application/json",
        "type": "formData"
      },
    });
    let proxy = "https://cors-anywhere.herokuapp.com/";
    let api = `${proxy}https://tradecredback.herokuapp.com/api/result`;
    fetch(api).then(res=>{ return res.json();}).then(data=>{
      this.setState({data:data,condition:true})
    });
  }
  render() {
    if(!this.state.condition)
    {
      return (
        <div>
          <p style={{
              fontSize:"18px"
          }}>Welcome To</p>
          <p>TredCred</p>
          <img src={Logo} alt="Upload" />
          <form onSubmit={this.handleUploadImage} className="form">
            <InputLabel style={styles.importLabel} className="uploadBtn">
              <input type='file' name='file' ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleUploadFile} style={styles.hidden} />
              <span className="button">Upload vendor list</span>
            </InputLabel>  
          </form>
        </div>
      );
    }
    else
    {
      if(isEmpty(this.state.data))
      {
        return (
          <div>
          <p style={{
              fontSize:"18px"
          }}>Welcome To</p>
            <p>TredCred</p>            
            <img src={Logo} alt="Upload" />
            <form onSubmit={this.handleUploadImage} className="form">
              <InputLabel style={styles.importLabel} className="uploadBtn">
                <input type='file' name='file' ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleUploadFile} style={styles.hidden} />
              </InputLabel>
            </form>
            <img src={Error} width="100px" alt="oops"/>
            <h1>Oops! Wrong file format or wrong data in file.</h1>
          </div>
        );
      }
      else
      {
        return (
          <div>
          <p style={{
              fontSize:"18px"
          }}>Welcome To</p>
            <p>TredCred</p>
            <img src={Logo} alt="Upload" />
            <form onSubmit={this.handleUploadImage} className="form">
              <InputLabel style={styles.importLabel} className="uploadBtn">
                <input type='file' name='file' ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleUploadFile} style={styles.hidden} />
              </InputLabel>
            </form>
            <span></span>
            <p className="title1">Here is the uploaded vendor list</p>
            <br />
            <span></span>
            <br />
            <div className="data">
              <span className="title">Number of Invoices Uploaded: </span>
              <span className="value">{this.state.data.Noi}</span>
              <br />
              <span className="title">Total Sum of Invoices Amount: </span>
              <span className="value">{this.state.data.Ts}</span>
              <br />
              <span className="title">Total Number of vendors: </span>
              <span className="value">{this.state.data.Nu}</span>
              <br/>
              <span className="title">Number of Invalid Invoices: </span>
              <span className="value">{this.state.data.I}</span>
            </div>
          </div>
        );
      }
    }
  }
}

export default Main;