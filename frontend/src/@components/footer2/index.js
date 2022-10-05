import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter, WhatsApp, LocalShipping } from '@material-ui/icons'
import React from 'react'
import daraz_logo from '../../@assets/images/daraz_logo.png'
import { Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ReactWhatsapp from 'react-whatsapp';
import './index.css'
import { routePaths } from '../../@services/constants'


const Footer = () => {
    const navigate = useNavigate()
    const linkToHome = () => {
        navigate('/')
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToSoaps = () => {
        navigate('/Category/soaps/Products')
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToAloeSoap = () => {
        navigate('/Products/62ef6c325cdd6af03ab6caf9')
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToCharcoalSoap = () => {
        navigate('/Products/62ef8b91918ea3645a4f67da')
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToShampooBar = () => {
        navigate('/Products/62ef8c51918ea3645a4f67ea')
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToAllProducts = () => {
        navigate(routePaths.allProducts)
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToTurmericSoap = () => {
        navigate('/Products/62ef8a78918ea3645a4f67d2')
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToNeemSoap = () => {
        navigate('/Products/62ee9e4f623ac5d08bf7b70e')
        window.location.reload(false).scrollTo(0, 0)
    }
    return (
        <>
            <div className='footer-display-on-large-screens'>
                <div className='footer-con'>
                    <div className='footer-left'>
                        <h1 style={{ paddingLeft: '1vw' }}>RAYON.</h1>
                        <p style={{ padding: '0 1vw' }}>We believe in nature's healing power, our handmade soaps are free from parabens, mineral oils, alcohols and artificial fragrances. They are best for all skin types.</p>
                        <div className='social-con'>
                            <div className='social-icon' style={{ background: '#3B5999' }}>
                                <a style={{ color: 'white' }} href='https://www.facebook.com/photo/?fbid=4826363694105866&set=gm.457930822647971&idorvanity=212641423843580' target="_blank">
                                    <Facebook />
                                </a>
                            </div>
                            <div className='social-icon' style={{ background: '#ffcccc' }}>
                                <a href='https://www.daraz.pk/products/rayon-anti-acne-soap-i267804632-s1482613364.html?spm=a2a0e.searchlist.list.2.a4d461681FLRn7&search=1&fbclid=IwAR20nnQs3LTMX3KrddGDb7DvFLz_OTZh5Si-HoFTh6C86EMCM9I6NC8DGqU' target='_blank'>
                                    <img src={daraz_logo} style={{ width: '3vh', height: '3vh' }} />
                                </a>
                            </div>
                            <a
                                href="https://wa.me/+923360443338"
                                class="whatsapp_float"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <WhatsApp />
                            </a>
                        </div>
                    </div>
                    <div className='footer-center'>
                        <h3 style={{ margin: '3vh 3vh 3vh 3vh' }}>Useful Links</h3>
                        <ul className='footer-ul'>
                            <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToHome} className='footer-li'>Home</li>
                            </Link>
                            <Link to='/Category/soaps/Products' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToSoaps} className='footer-li'>Soaps</li>
                            </Link>
                            <Link to='/Products/62ef6c325cdd6af03ab6caf9' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToAloeSoap} className='footer-li'>Anti acne</li>
                            </Link>
                            <Link to='/Products/62ef8b91918ea3645a4f67da' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToCharcoalSoap} className='footer-li'>Controls oil</li>
                            </Link>
                            <Link to='/Products/62ef8c51918ea3645a4f67ea' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToShampooBar} className='footer-li'>Shampoo bar</li>
                            </Link>
                            <Link to={routePaths.allProducts} style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToAllProducts} className='footer-li'>All Products</li>
                            </Link>
                            <Link to='/Products/62ef8a78918ea3645a4f67d2' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToTurmericSoap} className='footer-li'>Dry skin</li>
                            </Link>
                            <Link to='/Products/62ee9e4f623ac5d08bf7b70e' style={{ color: 'black', textDecoration: 'none' }}>
                                <li onClick={linkToNeemSoap} className='footer-li'>Antibacterial</li>
                            </Link>
                        </ul>
                    </div>
                    <div className='footer-right'>
                        <h3 style={{ margin: '3vh 3vh 3vh 3vh' }}>Contact</h3>
                        <div className='contact-item'><Room style={{ marginRight: '0.5vh' }} />Qayyum Block Mustafa Town Wahdat Road Lahore</div>
                        <div className='contact-item'><Phone style={{ marginRight: '0.5vh' }} />+923360443338</div>
                        <div className='contact-item'><LocalShipping style={{ marginRight: '0.5vh' }} />Shipping all over Pakistam
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
            <div className='footer-display-on-medium-screens'>
                <div className='footer-con'>
                    <div className='footer-left'>
                        <h1 style={{ paddingLeft: '1vw' }}>RAYON.</h1>
                        <p style={{ padding: '0 1vw' }}>We believe in nature's healing power, our handmade soaps are free from parabens, mineral oils, alcohols and artificial fragrances. They are best for all skin types.</p>
                        <div className='social-con'>
                            <div className='social-icon' style={{ background: '#3B5999' }}>
                                <a style={{ color: 'white' }} href='https://www.facebook.com/photo/?fbid=4826363694105866&set=gm.457930822647971&idorvanity=212641423843580' target="_blank">
                                    <Facebook />
                                </a>
                            </div>
                            <div className='social-icon' style={{ background: '#ffcccc' }}>
                                <a href='https://www.daraz.pk/products/rayon-anti-acne-soap-i267804632-s1482613364.html?spm=a2a0e.searchlist.list.2.a4d461681FLRn7&search=1&fbclid=IwAR20nnQs3LTMX3KrddGDb7DvFLz_OTZh5Si-HoFTh6C86EMCM9I6NC8DGqU' target='_blank'>
                                    <img src={daraz_logo} style={{ width: '3vh', height: '3vh' }} />
                                </a>
                            </div>
                            <a
                                href="https://wa.me/+923360443338"
                                class="whatsapp_float"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <WhatsApp />
                            </a>
                        </div>
                    </div>
                    <div className='footer-right'>
                        <h3 style={{ margin: '3vh 3vh 3vh 3vh' }}>Contact</h3>
                        <div className='contact-item'><Room style={{ marginRight: '0.5vh' }} />Qayyum Block Mustafa Town Wahdat Road Lahore</div>
                        <div className='contact-item'><Phone style={{ marginRight: '0.5vh' }} />+923360443338</div>
                        <div className='contact-item'><LocalShipping style={{ marginRight: '0.5vh' }} />Shipping all over Pakistam
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
            <div className='footer-display-on-small-screens'>
                <div className='footer-con-small-screens'>
                    <div className='footer-left'>
                        <h1 style={{ paddingLeft: '1vw' }}>RAYON.</h1>
                        <p style={{ padding: '0 1vw' }}>We believe in nature's healing power, our handmade soaps are free from parabens, mineral oils, alcohols and artificial fragrances. They are best for all skin types.</p>
                        <div className='social-con'>
                            <div className='social-icon' style={{ background: '#3B5999' }}>
                                <a style={{ color: 'white' }} href='https://www.facebook.com/photo/?fbid=4826363694105866&set=gm.457930822647971&idorvanity=212641423843580' target="_blank">
                                    <Facebook />
                                </a>
                            </div>
                            <div className='social-icon' style={{ background: '#ffcccc' }}>
                                <a href='https://www.daraz.pk/products/rayon-anti-acne-soap-i267804632-s1482613364.html?spm=a2a0e.searchlist.list.2.a4d461681FLRn7&search=1&fbclid=IwAR20nnQs3LTMX3KrddGDb7DvFLz_OTZh5Si-HoFTh6C86EMCM9I6NC8DGqU' target='_blank'>
                                    <img src={daraz_logo} style={{ width: '3vh', height: '3vh' }} />
                                </a>
                            </div>
                            <a href="https://wa.me/+923360443338"
                                class="whatsapp_float"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <WhatsApp />
                            </a>
                        </div>
                    </div>
                    <div className='footer-right'>
                        <h3 style={{ margin: '3vh 3vh 3vh 3vh' }}>Contact</h3>
                        <div className='contact-item'><Room style={{ marginRight: '0.5vh' }} />Qayyum Block Mustafa Town Wahdat Road Lahore</div>
                        <div className='contact-item'><Phone style={{ marginRight: '0.5vh' }} />+923360443338</div>
                        <div className='contact-item'><LocalShipping style={{ marginRight: '0.5vh' }} />Shipping all over Pakistam
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer