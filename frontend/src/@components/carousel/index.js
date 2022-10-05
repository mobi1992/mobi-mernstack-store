import React from 'react'
import { Carousel, Image, Button } from 'react-bootstrap'
import './index.css'
import organic_soaps from '../../@assets/images/organic_soaps.jpeg'
import charcoal_soap from '../../@assets/images/Charcoal_Soap.jpeg'
import aloevera_soap from '../../@assets/images/Aloevera_Soap.jpeg'
const CarouselSlider = () => {
    const prevIcon = () => {
        return (
            <span>
                <i style={{ color: 'white', fontSize: 'bold', opacity: '1' }} className="fas fa-chevron-circle-left glyphicon"></i>
            </span>
        )
    }
    const nextIcon = () => {
        return (
            <span>
                <i style={{ color: 'grey', fontSize: 'bold', opacity: '1' }} className="fas fa-chevron-circle-right glyphicon"></i>
            </span>
        )
    }
    return (
        <Carousel indicators={false} nextIcon={nextIcon()} prevIcon={prevIcon()}>
            <Carousel.Item>
                <div style={{ backgroundColor: 'black', color : 'white'}} className='carousel-class'>
                    <div className='image-wrapper'>
                        <Image className='home-img' src={organic_soaps} />
                    </div>
                    <div className='crs-display-on-very-large-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ORGANIC SOAPS</h2>
                            <p className='res-content res-content-p'>A BUBBLE OF BEAUTY AND PURITY.</p>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-large-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ORGANIC SOAPS</h2>
                            <p className='res-content' style={{ paddingTop: '1vh' }}>BEAUTY AND PURITY.</p>
                            {/* <p className='res-content' style={{ paddingBottom: '1vh' }}></p> */}
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-small-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ORGANIC SOAPS</h2>
                            <p className='res-content res-content-p'>BEAUTY AND PURITY.</p>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-very-small-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ORGANIC SOAPS</h2>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                </div>
            </Carousel.Item> 

            <Carousel.Item>
                <div style={{ backgroundColor: 'white', color : 'black' }} className='carousel-class'>
                    <div className='image-wrapper'>
                        <Image className='home-img' src={charcoal_soap} />
                    </div>
                    <div className='crs-display-on-very-large-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>CHARCOAL SOAP</h2>
                            <p className='res-content res-content-p'>DEEP CLEANSES THE SKIN.</p>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-large-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>CHARCOAL SOAP</h2>
                            <p className='res-content' style={{ paddingTop: '1vh' }}>DEEP CLEANSES THE SKIN.</p>
                            {/* <p className='res-content' style={{ paddingBottom: '1vh' }}></p> */}
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-small-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>CHARCOAL SOAP</h2>
                            <p className='res-content res-content-p'>DEEP CLEANSES THE SKIN.</p>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-very-small-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>CHARCOAL SOAP</h2>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div style={{ backgroundColor: 'white', color : 'black' }} className='carousel-class'>
                    <div className='image-wrapper'>
                        <Image className='home-img' src={aloevera_soap} />
                    </div>
                    <div className='crs-display-on-very-large-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ALOEVERA SOAP</h2>
                            <p className='res-content res-content-p'>WITH HEALING POWER OF ALOEVERA.</p>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-large-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ALOEVERA SOAP</h2>
                            <p className='res-content' style={{ paddingTop: '1vh' }}>WITH HEALING POWER OF ALOEVERA.</p>
                            {/* <p className='res-content' style={{ paddingBottom: '1vh' }}></p> */}
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-small-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ALOEVERA SOAP</h2>
                            <p className='res-content res-content-p'>WITH HEALING POWER OF ALOEVERA.</p>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                    <div className='crs-display-on-very-small-screens'>
                        <div className='info-container'>
                            <h2 className='res-content' style={{ fontWeight: 'bold' }}>ALOEVERA SOAP</h2>
                            <Button className='res-content' variant='dark'>SHOP NOW</Button>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>

        
    )
}

export default CarouselSlider