import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
export default function Posts() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');



    useEffect(() => {
        axios.get(`http://localhost:5000/table/`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
                {searchInput.length  ? (
                    filteredResults.map((item) => {
                        return (
                            <div class="containerR">
  <div class="cardR">
    <div class="cardR-header" style={{textAlign: 'center'}}>
      <img className='p-2'
      
      src={item.image} alt="rover" />
    
    </div>
    <div class="cardR-body">
    
      <h3 style={{textTransform:"uppercase"}}>
        {item.name}
      </h3>
   
    
<p className='mt-2' scope="row"> {item.description}</p>

    
      <div className="userR" >
     <a href={`/booktable/${item.name}`}>
  <button style={{width:"325px"}} className="button1">
                          
 Book Table
  </button>
</a>

  
      </div>
    </div>
  </div>
  </div>
                            
                            
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (



                            <div class="containerR">
                            <div class="cardR">
                              <div class="cardR-header" style={{textAlign: 'center'}}>
                                <img className='p-2'
                                
                                src={item.image} alt="rover" />
                              
                              </div>
                              <div class="cardR-body">
                              
                                <h3 style={{textTransform:"uppercase"}}>
                                  {item.name}
                                </h3>
                             
                              
                          <p className='mt-2' scope="row"> {item.description}</p>
                          
                              
                                <div className="userR" >
                               <a href={`/booktable/${item.name}`}>
                            <button style={{width:"325px"}} className="button1">
                                                    
                           Book Table
                            </button>
                          </a>
                          
                            
                                </div>
                              </div>
                            </div>
                            </div>
                            
                        )
                    })
                )}
            </div>
        </div>
    )
}