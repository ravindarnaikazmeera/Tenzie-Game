import React from "react";
import Die from "./Die";

export default function App(){
  

  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allDie = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSame = dice.every(die => die.value === firstValue)
    if(allDie && allSame){
      setTenzies(true)
      console.log("you won")
    }
  },[dice])

  function generate(){
    return{
      value : Math.ceil(Math.random()*6),
        isHeld : false,
        id : crypto.randomUUID()

    }
  }
  

  function allNewDice(){
    const newDice = []

    for(let i=0;i<10;i++){
      newDice.push(generate())
    }
    return newDice
  }

  function rollDie(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generate()
      }))  
    }else{
      setTenzies(false)
      setDice(allNewDice)
    }
    
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld : !die.isHeld} : die
      })
    )
  }

  // console.log(allNewDice())

  const diceElements = dice.map( die => <Die value={die.value}  isHeld = {die.isHeld}  holdDice={() => holdDice(die.id)}/>)



  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll untill all dice are same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>

      <button onClick = {rollDie} className="roll-button">{tenzies ? "New Game" : "Roll" }</button>
     
    </main>
  );
}