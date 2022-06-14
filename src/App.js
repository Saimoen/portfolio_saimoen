import { useState, useEffect } from 'react'
import axios from 'axios'

import TextBox from './components/TextBox'
import Arrows from './components/Arrows'
import Buttons from './components/Buttons'
import Modal from './components/Modal'

function App() {
    const [showModal, setShowModal] = useState(null)
    const [inputLanguage, setInputLanguage] = useState('French')
    const [outputLanguage, SetOutputLanguage] = useState('English')
    const [languages, setLanguages] = useState(null)
    const [textToTranslate, setTextToTranslate] = useState('')
    const [translatedText, setTranslatedText] = useState('')
    
    const getLanguages = async () => {
        const response = await axios('http://localhost:8000/languages')
        setLanguages(response.data)
    }

    const translate = async () => {
      const data = {
        textToTranslate, outputLanguage, inputLanguage
      }
      const response = await axios('http://localhost:8000/translation', {
        params: data
      })
      setTranslatedText(response.data)
    }

    console.log("translatedText", translatedText)

    useEffect(() => {
      getLanguages()
    }, []);

    const handleClick = () =>{
      setInputLanguage(outputLanguage)
      SetOutputLanguage(inputLanguage)
    }

    console.log('showModal', showModal)

  return (
    <div className="app">
     {!showModal && <>
      <TextBox
        selectedLanguage={inputLanguage}
        // eslint-disable-next-line react/style-prop-object
        style='input'
        setShowModal={setShowModal}
        setTextToTranslate={setTextToTranslate}
        setTranslatedText={setTranslatedText}

        />
      <div className='arrow-container' onClick={handleClick}>
      <Arrows />
      </div>
      
      <TextBox 
        // eslint-disable-next-line react/style-prop-object
        style='output'
        selectedLanguage={outputLanguage}
        setShowModal={setShowModal}
        translatedText={translatedText}
        setTranslatedText={setTranslatedText}
        />
        <div className="button-container" onClick={translate}>
          <Buttons />
        </div>
      </>}

      {showModal && <Modal setShowModal={setShowModal} languages={languages} chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
      setChosenLanguage={showModal === 'input' ? setInputLanguage : SetOutputLanguage} />}
    </div>
  );
}

export default App;
