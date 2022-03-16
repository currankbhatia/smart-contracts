import './App.css';
import React from 'react';


function DisplayResult() {
  // const photos = [];


  return (
    <div className="myDiv">
      <h1>Result of Contract Execution</h1>
    </div>
  );
}

function Intake(props) {


  const handleTextChange = (event) => {
    const value = event.target.value;
    //setTextTitle(value);
    console.log("value: " + value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("handleSubmit");
    // console.log("text: " + textTitle);
    // console.log("imgTitle: " + imgTitle);

    props.onIntake("succeeded");
  };

  return (
    <div className="myDiv">
      <h1>Execute Smart Contract</h1>
      <form className = "form-c" action="/action_page.php" onSubmit={handleSubmit}>
        <p> Name: <input type="text" onChange={handleTextChange}/> First Number: <input type="text" onChange={handleTextChange}/> Second Number: <input type="text" onChange={handleTextChange}/> </p>
        <input type="submit" value="Submit"/>        
      </form>
    </div>
  );
}


function App(props) {

  const [showIntake, setShowIntake] = React.useState(true); //Setting this to False for now

  const handleIntake = (text) => {
    console.log("text: " + text);
    if (text === "succeeded") {
      setShowIntake(false)
    }
  };

  return (
    <div>
    {showIntake &&
      <Intake onIntake={handleIntake}/>
    }
    {!showIntake &&
      <DisplayResult />
    }
    </div>
  );
}

export default App;
