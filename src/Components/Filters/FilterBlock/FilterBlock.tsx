import { useState } from 'react';
import { FilterBlockType } from '../DataType';
import EachFilter from '../EachFilter/EachFilter';

function FilterBlock({ options }: FilterBlockType) {
const [activeIndex,setActiveIndex] = useState<number>()

const onClickActive = (e:any,index:number)=> {
  setActiveIndex(index)
  options[index].onClickHandler(e)
}

  return (
    <>
    <div className="block">
        <p className="font-weight font-size mt-3">Show All</p>
          {options.map((option,index)=>{
            if(index === 0){
              return(
                <EachFilter key={index} content= {option.content} data = {option.data} onClickHandler={(e:any) => onClickActive(e,index)} isActive={activeIndex === index}/>
              )
            }
          })}
      </div>
    <div className="block">
        <p className="font-weight font-size mt-3">Gender</p>
        {options.map((option,index) => {
          if(index >= 1 && index <= 2){
            return(
              <EachFilter key={index} content= {option.content} data = {option.data} onClickHandler={(e:any) => onClickActive(e,index)} isActive={activeIndex === index}/>
            )
          }
        })}     
      </div>
      <div className="block">
          <p className="font-weight font-size mt-3">Brend</p>
          {options.map((option,index)=>{
            if(index >= 3 && index <= 10){
              return(
                <EachFilter key={index} content= {option.content} data = {option.data} onClickHandler={(e:any) => onClickActive(e,index)} isActive={activeIndex === index}/>
              )
            }
          })}   
      </div>
    
    </>
  );
}

export default FilterBlock


   