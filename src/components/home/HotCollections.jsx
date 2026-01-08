import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
  });

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        const data = await response.json();
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="hot-collections-carousel">
                <div className="carousel-controls mb-4 text-center">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="row">
                  {new Array(4).fill(0).map((_, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" borderRadius="8px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="80%" height="20px" borderRadius="4px" />
                          <Skeleton width="60%" height="15px" borderRadius="4px" />
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="hot-collections-carousel">
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
                {collections.map((collection) => (
                  <div className="keen-slider__slide" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img className="lazy pp-coll" src={collection.authorImage} alt={`${collection.title} author`} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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

export default HotCollections;
