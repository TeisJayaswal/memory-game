import React, { useEffect, useState } from 'react';
import tintinImage from './images/tintin.png';
import haddockImage from './images/captain-haddock.png'
import snowyImage from './images/snowy.png'
import professorImage from './images/professor-calculus.png'
import biancaImage from './images/bianca.png'
import bangingPanImage from './images/banging-pan-guy.jpeg'
import doctorImage from './images/doctor-muller.png'
import alcazarImage from './images/general-alcazar.png'
import nestorImage from './images/nestor.jpeg'
import rastapopoulousImage from './images/rastapopoulos.png'
import mitsuhiratoImage from './images/mitsuhirato.jpeg'
import rascarImage from './images/rascar-capac.png'
import './Characters.css'

const initialCharacterList = [
    {
      id: 1,
      name: "Tintin",
      imageSrc: tintinImage,
      clickedOn: false
    },
    {
      id: 2,
      name: "Captain Haddock",
      imageSrc: haddockImage,
      clickedOn: false
    },
    {
      id: 3,
      name: "Snowy",
      imageSrc: snowyImage,
      clickedOn: false
    },
    {
      id: 4,
      name: "Professor Calculus",
      imageSrc: professorImage,
      clickedOn: false
    },
    {
      id: 5,
      name: "Bianca",
      imageSrc: biancaImage,
      clickedOn: false
    },
    {
      id: 6,
      name: "Banging Pan Man",
      imageSrc: bangingPanImage,
      clickedOn: false
    },
    {
      id: 7,
      name: "Doctor Muller",
      imageSrc: doctorImage,
      clickedOn: false
    },
    {
      id: 8,
      name: "General Alcazar",
      imageSrc: alcazarImage,
      clickedOn: false
    },
    {
      id: 9,
      name: "Nestor",
      imageSrc: nestorImage,
      clickedOn: false
    },
    {
      id: 10,
      name: "Rastapopoulous",
      imageSrc: rastapopoulousImage,
      clickedOn: false
    },
    {
      id: 11,
      name: "Mitsuhirato",
      imageSrc: mitsuhiratoImage,
      clickedOn: false
    },
    {
      id: 12,
      name: "Rascar Capac",
      imageSrc: rascarImage,
      clickedOn: false
    }
      
  ];

const scores = [];

const CharacterGrid = () => {
  const [characterList, setList] = useState(initialCharacterList)

  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);


  const handleClick = (event, indexToUpdate, clickStatus) => {
    console.log(indexToUpdate)
    console.log(clickStatus)

    //method to solve without a loop 
    // check immediately to see if the user has lost and reset 
    let newCharacterList = []
    if (characterList[indexToUpdate].clickedOn) {
      // reset the game
      setCount(0)
      console.log("In the reset block")
      console.log(initialCharacterList)
      newCharacterList = [...initialCharacterList]
    } else {
      // set clickOn on the character that was clicked
      const newCharacter = {...characterList[indexToUpdate], clickedOn: true}
      newCharacterList = [...characterList]
      newCharacterList[indexToUpdate] = newCharacter
      setCount(count + 1)
    }
    shuffleArray(newCharacterList)
    setList(newCharacterList)
    return

    // let newCharacterList = [];
    let reset = false
    console.log([...newCharacterList])
    characterList.forEach((character, characterIndex) => {
      if (clickStatus === false && indexToUpdate === characterIndex) {
        const newCharacter = {...character}
        newCharacter['clickedOn'] = true;
        newCharacterList.push(newCharacter)
        setCount(count + 1)
        console.log(count)
        console.log("Incremented count by 1")
      } else if (clickStatus === true && indexToUpdate === characterIndex) {
        reset = true
        console.log("In the end handle block")
      } else {
        newCharacterList.push(character)
      }
    })

    // console.log(count)
    if (reset) {
      setCount(0)
      console.log("In the reset block")
      console.log(initialCharacterList)
      newCharacterList = [...initialCharacterList]
    } 
    shuffleArray(newCharacterList)
    setList(newCharacterList)
    console.log([...newCharacterList])
    console.log(scores)

  }

  useEffect(() => {
    if (count > highScore) {
      setHighScore(count)
    }
  }, [count, highScore])


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  return <div> 
      <h3>Tintin Memory Game</h3> 
      <div>Current Score: {count}</div>
      <div>High Score: {highScore}</div>
    {characterList.map((character, index) => 
      <img className='character-image' src={character.imageSrc} alt={character.name} onClick={(event) => handleClick(event, index, character.clickedOn)}/>

    )}
    </div>
}

export default CharacterGrid 