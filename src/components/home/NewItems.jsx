import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 767px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(min-width: 768px) and (max-width: 1199px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
    },
  });

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        const data = await response.json();
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="new-items-carousel">
                <div className="carousel-controls mb-4 text-center">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="row">
                  {new Array(4).fill(0).map((_, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton width="100%" height="250px" borderRadius="8px" />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width="80%" height="20px" borderRadius="4px" />
                          <Skeleton width="60%" height="15px" borderRadius="4px" />
                          <Skeleton width="40%" height="15px" borderRadius="4px" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-down" data-aos-delay="200">New Items</h2>
              <div className="small-border bg-color-2" data-aos="fade-up" data-aos-delay="400"></div>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="600">
            <div className="new-items-carousel">
              <div className="carousel-controls mb-4 text-center">
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => instanceRef.current?.prev()}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => instanceRef.current?.next()}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
              <div ref={sliderRef} className="keen-slider">
                {newItems.map((item, index) => (
                  <div className="keen-slider__slide" key={item.id}>
                    <div className="nft__item" data-aos="slide-up" data-aos-delay={200 + index * 150}>
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.title} Author`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <Timer expiryDate={item.expiryDate} itemId={item.id} />

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <button type="button">
                                <i className="fa fa-facebook fa-lg"></i>
                              </button>
                              <button type="button">
                                <i className="fa fa-twitter fa-lg"></i>
                              </button>
                              <button type="button">
                                <i className="fa fa-envelope fa-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
