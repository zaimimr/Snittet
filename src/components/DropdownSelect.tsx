'use client';

import { Container } from '@radix-ui/themes';
import { useLocalStorage } from 'usehooks-ts';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';
interface SelectProps {}
const controlStyles = {
  base: 'border rounded- bg-white hover:cursor-pointer',
  focus: 'border-primary-600 ring-1 ring-primary-500',
  nonFocus: 'border-gray-300 hover:border-gray-400'
};
const placeholderStyles = 'text-gray-500 pl-1 py-0.5';
const selectInputStyles = 'pl-1 py-0.5';
const valueContainerStyles = 'p-1 gap-1';
const singleValueStyles = 'leading-7 ml-1';
const indicatorsContainerStyles = 'p-1 gap-1';
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const dropdownIndicatorStyles = 'hidden';
const menuStyles = 'bg-pink';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-gray-100 active:bg-gray-200',
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500"
};
const noOptionsMessageStyles = 'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

export default function Select({}: SelectProps) {
  const [_s, setSubjects, _r] = useLocalStorage<Avdelingskode[]>('subjects', []);
  const getSubjects = async (inputValue: string, limit: number | undefined = undefined) => {
    const response = await fetch(`/api/subjects?subject=${inputValue}${limit ? `&limit=${limit}` : ''}`);
    const data = await response.json();
    return data;
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<{ value: Avdelingskode; label: string }[]>(resolve => {
      if (!inputValue || inputValue.length < 1) {
        resolve([]);
      }
      setTimeout(() => {
        resolve(getSubjects(inputValue));
      }, 1000);
    });

  const handleSelect = (data: { value: Avdelingskode; label: string }) => {
    setSubjects(subjects => [...new Map([...subjects, data.value].map(item => [item['Emnekode'], item])).values()]);
  };
  return (
    <Container className="w-full" size="1">
      <AsyncSelect
        loadingMessage={() => 'Laster inn emner...'}
        loadOptions={promiseOptions}
        noOptionsMessage={() => 'Ingen emne med denne søketeksten.'}
        placeholder="Søk etter Emnekode eller Emnenavn"
        value={null}
        classNames={{
          control: ({ isFocused }) =>
            classNames(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            classNames(isFocused && optionStyles.focus, isSelected && optionStyles.selected, optionStyles.base),
          noOptionsMessage: () => noOptionsMessageStyles
        }}
        cacheOptions
        defaultOptions
        onChange={(option: { value: Avdelingskode; label: string } | null) => {
          if (option) {
            handleSelect(option);
          }
        }}
      />
    </Container>
  );
}
