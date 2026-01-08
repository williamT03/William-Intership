import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const data = await response.json();
        setExploreItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);



  // Filter functionality
  useEffect(() => {
    let sortedItems = [...exploreItems];
    
    switch (filter) {
      case "price_low_to_high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price_high_to_low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "likes_high_to_low":
        sortedItems.sort((a, b) => b.likes - a.likes);
        break;
      default:
        // Default order
        break;
    }
    
    setFilteredItems(sortedItems);
  }, [filter, exploreItems]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleCount(8); // Reset to show first 8 when filter changes
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => {
      if (prev === 8) return 12; // First click: show 12 total (8 + 4)
      if (prev === 12) return 16; // Second click: show 16 total (12 + 4)
      return prev;
    });
  };

  const visibleItems = filteredItems.slice(0, visibleCount);

  if (loading) {
    return (
      <>
        <div>
          <select id="filter-items" defaultValue="">
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
        {new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Skeleton width="100%" height="400px" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {visibleItems.map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
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
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
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
      {visibleCount < filteredItems.length && (
        <div className="col-md-12 text-center">
          <button 
            onClick={handleLoadMore} 
            id="loadmore" 
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
