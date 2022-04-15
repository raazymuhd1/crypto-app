import React from 'react'
import millify from "millify"
import { Typography, Row, Col, Statistic } from "antd"
import { Link } from "react-router-dom"
import { Cryptocurrencies, News } from "../index" 
import Loader from "../Loader"

import { useGetCryptosQuery } from "../../services/cryptoApi.js"

const { Title } = Typography;

const Homepage = () => {
       const { data, isFetching } = useGetCryptosQuery(10)
        const globalStats = data?.data?.stats;
        console.log(data)

       if(isFetching) return <Loader />

    return (
        <>
             <Title level={2} className="heading" > Global Statistics </Title>
             <Row>
                  <Col span={12} > <Statistic title="Total Cryptocurrencies" value={globalStats.total} />  </Col>
                  <Col span={12} > <Statistic title="Total Exchanges" value={`${millify(globalStats.totalExchanges)}`} />  </Col>
                  <Col span={12} > <Statistic title="Total Market Cap" value={`${millify(globalStats.totalMarketCap)}`} />  </Col>
                  <Col span={12} > <Statistic title="Total 24hVolume" value={`${millify(globalStats.total24hVolume)}`} />  </Col>
                  <Col span={12} > <Statistic title="Total Markets" value={`${millify(globalStats.totalMarkets)}`} />  </Col>
             </Row>

             <div className="home-heading-container">
                 <Title level={2} className="home-title"> Top 10 Cryptocurrencies In The World </Title>
                 <Title level={2} className="show-more">
                       <Link to="/cryptocurrencies"> Show More </Link>
                  </Title>
             </div>
             <Cryptocurrencies simplified />
             <div className="home-heading-container">
                 <Title level={2} className="home-title"> Latest Crypto News </Title>
                 <Title level={2} className="show-more">
                       <Link to="/news"> Show More </Link>
                  </Title>
             </div>
             <News simplified />
        </>
    )
}

export default Homepage
