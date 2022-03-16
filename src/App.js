import './App.css';
import React, {useEffect} from 'react';
import { ethers } from "ethers";


let provider = new ethers.providers.JsonRpcProvider();


// Numbers.Sol
let abiJson = '[{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
let abi = JSON.parse(abiJson);

let contractAddress = "0x42267ef0e0c1f1dae6541d638b1c69561e33cd59";
let contract = new ethers.Contract(contractAddress, abi, provider);

function DisplayResult() {
  const [result, setResult] = React.useState('');
  const getContract = async () => {    

    let currentValue = await contract.get();
    console.log("getContract: " + currentValue.toString());

    setResult(currentValue.toString());
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
  const [firstNumber, setFirstNumber] = React.useState('');
  const [secondNumber, setSecondNumber] = React.useState('');

  // TODO condense handle methods into one
  const handleTextChange = (event) => {
    const value = event.target.value;
    setPhrase(value);
  };

  const handleFirstNumber = (event) => {
    const value = event.target.value;
    setFirstNumber(value);
  };

  const handleSecondNumber = (event) => {
    const value = event.target.value;
    setSecondNumber(value);
  };

  const setContract = async (x,y) => {  
  
    let privateKey = '0x3f0b5a65799d85a728e6a6c95e689ba90d75bace5f3be73bf7bb99f222df169a';
    let wallet = new ethers.Wallet(privateKey, provider);
  
    // Create a new instance of the Contract with a Signer, which allows
    // update methods
    let contractWithSigner = contract.connect(wallet);
  
    // Set a new Value, which returns the transaction
    let tx = await contractWithSigner.add(x, y);
  
    // See: https://ropsten.etherscan.io/tx/0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364
    console.log(tx.hash);
    // "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"
  
    // The operation is NOT complete yet; we must wait until it is mined
    await tx.wait();
  
    // Call the Contract's getValue() method again
    let newValue = await contract.get();
  
    console.log("newValue: " + newValue);

    ;
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    setContract(firstNumber, secondNumber).then(() => props.onIntake("succeeded"));

    
  };

  return (
    <div className="myDiv">
      <h1>Execute Smart Contract</h1>
      <form className = "form-c" action="/action_page.php" onSubmit={handleSubmit}>
        <p> Phrase: <input type="text" onChange={handleTextChange}/> First Number: <input type="text" onChange={handleFirstNumber}/> Second Number: <input type="text" onChange={handleSecondNumber}/> </p>
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
