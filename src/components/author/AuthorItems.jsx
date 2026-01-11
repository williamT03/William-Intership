import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const AuthorItems = ({ authorId, nftCollection, authorImage }) => {
  if (!nftCollection) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
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
    );
  }

  if (nftCollection.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-md-12 text-center">
              <h4>No NFTs found for this author</h4>
              <p>This author hasn't created any NFTs yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content" data-aos="fade-up">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <div className="nft__item" data-aos="fade-up" data-aos-delay={200 + index * 100}>
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImage || nft.nftImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Timer expiryDate={nft.expiryDate} itemId={nft.id} />
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
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt={nft.title}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
