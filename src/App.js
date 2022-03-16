import './App.css';
import React, {useEffect} from 'react';
import { ethers } from "ethers";


let provider = new ethers.providers.JsonRpcProvider();

let abi = [
  "event ValueChanged(address indexed author, string oldValue, string newValue)",
  "constructor(string value)",
  "function getValue() view returns (string value)",
  "function setValue(string value)"
];

// The address from the above deployment example
let contractAddress = "0x32922361532da24bef7456111f5dd51C176CaD57";
let contract = new ethers.Contract(contractAddress, abi, provider);

function DisplayResult() {
  // const photos = [];
  const [result, setResult] = React.useState('');



  const getContract = async () => {    

    // console.log('contract ' + contract.outputs);
    let currentValue = await contract.getValue();
    console.log("getContract: " + currentValue.toString());

    setResult(currentValue.toString());
    // return currentValue.toString();
    }

    useEffect(() => {
      getContract();
    });

  return (
    <div className="myDiv">
      <h1>Result of Contract Execution</h1>
      <p> {result}</p>
    </div>
  );
}



function Intake(props) {
  const [phrase, setPhrase] = React.useState('');

  const handleTextChange = (event) => {
    const value = event.target.value;
    //setTextTitle(value);
    setPhrase(value);
    console.log("value: " + value);
  };

  const setContract = async (newPhrase) => {  
  
    let privateKey = '0x1e867e710b420a9e4e5e16d192185c6b240ff54a522d2059d99947bcaa21928e';
    let wallet = new ethers.Wallet(privateKey, provider);
  
    // Create a new instance of the Contract with a Signer, which allows
    // update methods
    let contractWithSigner = contract.connect(wallet);
  
    // Set a new Value, which returns the transaction
    let tx = await contractWithSigner.setValue(newPhrase);
  
    // See: https://ropsten.etherscan.io/tx/0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364
    console.log(tx.hash);
    // "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"
  
    // The operation is NOT complete yet; we must wait until it is mined
    await tx.wait();
  
    // Call the Contract's getValue() method again
    let newValue = await contract.getValue();
  
    console.log("newValue: " + newValue);

    ;
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    setContract(phrase).then(() => props.onIntake("succeeded"));

    
  };

  return (
    <div className="myDiv">
      <h1>Execute Smart Contract</h1>
      <form className = "form-c" action="/action_page.php" onSubmit={handleSubmit}>
        <p> Phrase: <input type="text" onChange={handleTextChange}/> First Number: <input type="text"/> Second Number: <input type="text"/> </p>
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
