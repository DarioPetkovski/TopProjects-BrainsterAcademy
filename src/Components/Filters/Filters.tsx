import { useEffect, useState } from 'react';
import './Filters.css';
import axios from 'axios';
import { DataType, FilterType } from './DataType';
import Card from './Card/Card';
import FilterBlock from './FilterBlock/FilterBlock';

function Filters() {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  useEffect(() => {
    axios.get('https://challenges.brainster.tech/ajax_data/data.json')
      .then(res => {
        setData(res.data.products);
        setFilteredData(res.data.products);
      })
      .catch(err => console.log(err));
  }, []);
  
  // onClick Function to Filter the cards
  const handleFilterClick = (filteredData: DataType[]) => {
    setFilteredData(filteredData)
  }
  //Filter Object
  const filterOptions: FilterType[] = [
    // array is created with objects with properties that i use them to the children components
    // content is for the paragraph <p>MAlE</p> ......
    // data is for the bedge which i want to know the lenght of the array that is filtered
    // onClickHandler is a function in property which i create onClick event with parametar that on every click to change the filteredData state which i take the data from the filteredData state and use it to render the cards...
    { content: 'Show All', 
      data: data, 
      onClickHandler: () => handleFilterClick(data) },

    { content: 'MALE', 
      data: data.filter(item => item.gender === 'MALE'), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.gender === 'MALE')) },

    { content: 'FEMALE', 
      data: data.filter(item => item.gender === 'FEMALE'), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.gender === 'FEMALE')) },

    { content: 'LE GRAND BIKES', 
      data: data.filter(item => item.brand.includes('LE GRAND BIKES')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('LE GRAND BIKES'))) },

    { content: 'KROSS', 
      data: data.filter(item => item.brand.includes('KROSS')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('KROSS'))) },

    { content: 'EXPLORER', 
      data: data.filter(item => item.brand.includes('EXPLORER')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('EXPLORER'))) },

    { content: 'VISITOR', 
      data: data.filter(item => item.brand.includes('VISITOR')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('VISITOR'))) },

    { content: 'PONY', 
      data: data.filter(item => item.brand.includes('PONY')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('PONY'))) },

    { content: 'FORCE', 
      data: data.filter(item => item.brand.includes('FORCE')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('FORCE'))) },

    { content: 'E-BIKES', 
      data: data.filter(item => item.brand.includes('E-BIKES')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('E-BIKES'))) },

    { content: 'IDEAL', 
      data: data.filter(item => item.brand.includes('IDEAL')), 
      onClickHandler: () => handleFilterClick(data.filter(item => item.brand.includes('IDEAL'))) },
  ]
  return (
    <div className="con d-flex flex-column py-5 px-0 container-fluid ">
      <h1>Bikes</h1>
      <div className="con-wrapper d-flex align-item-center justify-content-between">

        {/* filters */}
        <div className="filters col-3 pl-0">
        <FilterBlock options={filterOptions} onClickHandler={handleFilterClick}/>
        </div>
        {/* ////////// */}

        {/* Cards */}
        <div className="img-con row align-items-start">
          {filteredData.map((card,index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        {/* /////// */}
      </div>
    </div>
  );
}

export default Filters;