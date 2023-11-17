import { ChakraProvider, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

const BackPage = ({bankNameData}) => {
  const [selectTitle, setSelectTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(inputValue, '=============== inputValue')

  // live search and highlight text 
  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    // console.log(parts, "parts= ====================")
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index} style={{ color: '#2c427d' }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  const selectItem = (selectItem) => {
    setSelectTitle(selectItem);
    setInputValue(selectItem); // Update the input value on selection
    setShowDropdown(false); // Hide dropdown on selection
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
    setSelectTitle(''); // Reset the selected title when the input changes
  };

  const handleInputFocus = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  };

  const filteredData = bankNameData.filter((bank) =>
    bank.bankname.toLowerCase().includes(inputValue.toLowerCase())
  );


  return (
    <div>
      <ChakraProvider>
        <Stack spacing={3} maxWidth={230} margin={'auto'} className='set-position-select'>
          <div className='search-input-cs'>
            <Input
              placeholder="Search Bank here.."
              value={selectTitle ? selectTitle : inputValue}
              onChange={handleInputChange}
              onClick={handleInputFocus}
              size="sm"
            />
            {showDropdown ? <span className='arrow-up'>&#129169;</span> : <span className='arrow-down'>&#129171;</span>}
          </div>
          {showDropdown && (
            <div className="matching-data">
              <ul>
                {filteredData.map((title, index) => (
                  <li key={index} onClick={() => selectItem(title.bankname)}>
                    {getHighlightedText(title?.bankname, inputValue)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Stack>
      </ChakraProvider>
    </div>
  );
};

export default BackPage;
