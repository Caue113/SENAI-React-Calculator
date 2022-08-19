import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';


export default function App() {

  const buttons = [
    "AC", "DEL", "%",  "/",
    "7" , "8",   "9",  "*",
    "4" , "5",   "6",  "-",
    "1" , "2",   "3",  "+",
    "." , "0", "+/-",  "="
  ];

  const [currentNumber, setCurrentNumber] = useState("");

  const [lastNumber, setLastNumber] = useState("");

  function HandleInput(buttonPressed){
    if(buttonPressed === "+" | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/")
    {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }

    switch(buttonPressed){
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
      return;

      case "AC":
        setLastNumber("");
        setCurrentNumber("");
      return;

      case "=":
        setLastNumber(currentNumber + " = ");
        Calculator();
      return;

      case "+/-":
      return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  function Calculator(){
    
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];
    
    switch(operator){
      case "+":
        setCurrentNumber((firstNumber + lastNumber).toString());
      return;

      case "-":
        setCurrentNumber((firstNumber - lastNumber).toString());
      return;

      case "*":
        setCurrentNumber((firstNumber * lastNumber).toString());
      return;

      case "/":

        try {
          setCurrentNumber((firstNumber / lastNumber).toString());
          
          if(lastNumber == 0) throw "division by 0";

        } catch (error) {
          console.log("ERROR LOG: " + error);
        }

      return;
    }
  }



  return (
    <View>
      <View style={styles.result}>
        <Text style={styles.historyText}> {lastNumber} </Text>
        <Text style={styles.resultText}> {currentNumber} </Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button) =>
          <TouchableOpacity onPress={() => HandleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton]}>
              {button}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    
  );
}


/*
 * Stylesheets
*/

const styles = StyleSheet.create({
  result: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: 300,
    backgroundColor: "#f5f5f5"
  },
  resultText: {
    color:"#282f38",
    margin: 10,
    fontSize: 40
  },

  buttons: {
    display:"flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    flex: "20%",  //20% to fix in computer. Not 25% because i want to add margin
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a0ffa0",

    margin: 10,

    minHeight: 80,
    minWidth: 80
  },
  textButton: {
    color: "#5b5b5b",
    fontSize: 30,
  },

  historyText: {
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: "flex-end",
  },
});
