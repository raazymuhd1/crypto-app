import React, { useState, useEffect } from 'react'
import millify from "millify"
import { Link } from "react-router-dom"
import { Card, Row, Col, Input } from "antd"
import Loader from "../Loader"

import { useGetCryptosQuery } from "../../services/cryptoApi.js"

const Cryptocurrencies = ({ simplified }) => {

      const count = simplified ? 10 : 100;
      const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
      const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
      const [ searchTerm, setSearchTerm ] = useState('')

    //   console.log(cryptos)

    useEffect(() => {
        // check if coins name same as input search bar
          const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()) );
          
          
          setCryptos(filteredData)
    }, [cryptosList,  searchTerm])

      if(isFetching) return <Loader />

    return (
        <>
             {/* check if simplified is false then render this input field // hiding input search on homepage */}
             { !simplified && (
              <div className="search-crypto">
                  <Input placeholder="search cryptocurrency ... " value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
             ) }
             <Row gutter={[32, 32]} className="crypto-card-container">
                     { cryptos?.map(currency => (
                         <Col xs={24} sm={12} lg={6} key={currency.id} className="crypto-card" >
                              <Link to={`/crypto/${currency.id}`}>
                                    <Card 
                                            title={`${currency.rank}. ${currency.name}`} 
                                            extra={ <img className="crypto-image"
                                             src={`${currency.iconUrl}`} 
                                            hoverable />
                                            }
                                     >
                                         <p> Price: { millify(currency.price) } </p>
                                         <p> Change: { millify(currency.change) } </p>
                                         <p> Market Cap: { millify(currency.marketCap) } </p>
                                     </Card>
                              </Link> 
                          </Col>
                     )) }
             </Row>
        </>
    )
}

export default Cryptocurrencies
