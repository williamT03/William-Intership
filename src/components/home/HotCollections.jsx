import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
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
            <div className="col-lg-12 text-center">
              <p>Loading hot collections...</p>
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
