import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from '../UI/Skeleton'
import Timer from '../UI/Timer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'

const NewItems = () => {
  const sliderRef = React.useRef(null)
  const [items, setItems] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
      )
      .then(res => {
        setItems(res.data)
        setDataIsLoaded(true)
      })
      .catch(error => {
        console.error('Error fetching new items:', error)
      })
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (!dataIsLoaded) {
    return (
      <section id='section-collections' className='no-bottom'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h2>New Items</h2>
                <div className='small-border bg-color-2'></div>
              </div>
            </div>
          </div>
          <div className='slider-container'>
            <div className='skeleton-slider'>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index} className='skeleton-item'>
                  <Skeleton width='100%' height='250px' borderRadius='10px' />
                  <div style={{ marginTop: '15px' }}>
                    <Skeleton width='70%' height='20px' borderRadius='5px' />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <Skeleton width='50%' height='18px' borderRadius='5px' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='section-collections' className='no-bottom new-items-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2 data-aos='fade-up' data-aos-duration='1000'>
                New Items
              </h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
        </div>
        <div className='slider-container'>
          <Slider {...settings} ref={sliderRef}>
            {items.map((item, index) => (
              <div
                key={item.id}
                data-aos='fade-up'
                data-aos-delay={`${index * 50}`}
              >
                <div className='nft__item'>
                  <div className='author_list_pp'>
                    <Link to={`/author/${item.authorId}`}>
                      <img className='lazy' src={item.authorImage} alt='' />
                      <i className='fa fa-check'></i>
                    </Link>
                  </div>

                  <Timer expiryDate={item.expiryDate} />

                  <div className='nft__item_wrap' >
                    <div className='nft__item_extra'>
                      <div className='nft__item_buttons'>
                        <button>Buy Now</button>
                        <div className='nft__item_share'>
                          <h4>Share</h4>
                          {/* social links */}
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className='lazy nft__item_preview'
                        alt=''
                      />
                    </Link>
                  </div>

                  <div className='nft__item_info'>
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className='nft__item_price'>{item.price} ETH</div>
                    <div className='nft__item_like'>
                      <i className='fa fa-heart'></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default NewItems
