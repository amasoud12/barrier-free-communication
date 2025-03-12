import React, {useState} from 'react'
import './ASL.css'
import axios from 'axios'

const ASL = () => {

    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/data');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <h3 className='audioASLText'>AUDIO to ASL</h3>

        <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text here"
      />
      <p>You entered: {inputValue}</p>

      <button className='card-button' onClick={fetchData} >View ASL</button>

    </div>
  )
}

export default ASL