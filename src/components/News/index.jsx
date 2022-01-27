import React, { useState } from 'react'
import { Select, Typography, Avatar, Row, Col, Card } from "antd"
import moment from "moment"
import Loader from "../Loader"

import { useGetCryptoNewsQuery} from "../../services/cryptoNewsApi"
import { useGetCryptosQuery} from "../../services/cryptoApi"

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage = `http://coinrevolution.com/wp-content/uploads/2020/06/cryptoNews.jpg`

const News = ({ simplified }) => {
    const [ newsCategory, setNewsCategory ] = useState("Cryptocurrency")
   const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory , count: simplified ? 6 : 12 })
   const { data } = useGetCryptosQuery(100)


   if(!cryptoNews?.value) return <Loader />

    return (
        <Row gutter={[24, 24]}>
                 { !simplified && (
                     <Col span={24}>
                            <Select showSearch className="select-news" placeholder="select a crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(option, input) => option.children.toLowerCase().indexOf(input.toLowerCase()) } >
                                  <Option value="Cryptocurrency"> Cryptocurrency </Option>
                                  { data?.data?.coins.map(coin => (
                                      <Option value={coin.name}> { coin.name } </Option>
                                  ) ) }
                            </Select>
                     </Col>
                 ) }
               { cryptoNews?.value?.map((news, i) => (
                   <Col xs={24} sm={12} lg={8} key={i} >
                       <Card hoverable className="news-card">
                           <a href={news.url} target="_blank" rel="noreferrer" >
                                    <Title level={4} className="news-title" > { news.name } 
                                    </Title>
                                    <img src={news?.image?.thumbnail?.contentUrl || demoImage } alt="news" />
                                    <p> { news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description } </p>

                                    <div className="provider-container">
                                        <Avatar src={news.provider[0].image?.thumbnail?.contentUrl || demoImage } alt="news" />
                                        <Text className="provider-name"> { news.provider[0].name } </Text>
                                    </div>
                                        <Text> { moment(news.datePublished).startOf("ss").fromNow() } </Text>
                           </a>
                       </Card>
                   </Col>
               ) ) }
        </Row>
    )
}

export default News
