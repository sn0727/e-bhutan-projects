import { ChakraProvider, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Testing = () => {
  const [selectTitle, setSelectTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const data = [
    {
      bankid: 1,
      bankname: 'AP MAHESH COOPERATIVE URBAN BANK LIMITED',
    },
    {
      bankid: 2,
      bankname: 'ABHYUDAYA COOPERATIVE BANK LIMITED',
    },
    {
      bankid: 3,
      bankname: 'ABHYUDAYA MAHILA URBAN COOPERATIVE BANK LIMITED',
    },
    {
      bankid: 4,
      bankname: 'ABU DHABI COMMERCIAL BANK',
    },
  ];

  const selectItem = (selectItem) => {
    setSelectTitle(selectItem);
    setShowDropdown(false)
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectTitle(''); // Reset the selected title when the input changes
  };

  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  const handleInputBlur = () => {
    // setShowDropdown(false)
  }

  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  // Filtering the data based on the input value
  const filteredData = data.filter((bank) =>
    bank.bankname.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <ChakraProvider>
        <Stack spacing={3} maxWidth={430} margin={'auto'}>
          <Input
            placeholder="Search Bank here.."
            value={selectTitle ? selectTitle : inputValue} // Use the selected title or input value
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            size="sm"
          />
          {showDropdown && <div className="matching-data">
            <ul>
              {filteredData.map((title, index) => (
                <li key={index} onClick={() => selectItem(title.bankname)}>
                  {getHighlightedText(title?.bankname, inputValue)}
                </li>
              ))}
            </ul>
          </div>}
        </Stack>
      </ChakraProvider>
    </div>
  );
};

export default Testing;


