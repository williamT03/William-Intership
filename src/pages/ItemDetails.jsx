import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
        );
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (!itemId) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="text-center">
                <h2>No Item Selected</h2>
                <p>Please select an item to view its details.</p>
                <Link to="/explore" className="btn-main">
                  Browse Items
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="slide-right" data-aos-delay="200">
                {loading ? (
                  <Skeleton width="100%" height="400px" />
                ) : (
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item?.title}
                  />
                )}
              </div>
              <div className="col-md-6" data-aos="slide-left" data-aos-delay="400">
                <div className="item_info">
                  <h2>
                    {loading ? (
                      <Skeleton width="80%" height="30px" />
                    ) : (
                      item?.title
                    )}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? (
                        <Skeleton width="50px" height="20px" />
                      ) : (
                        item?.views
                      )}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? (
                        <Skeleton width="30px" height="20px" />
                      ) : (
                        item?.likes
                      )}
                    </div>
                  </div>
                  <p>
                    {loading ? (
                      <>
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="85%" height="20px" />
                        <Skeleton width="92%" height="20px" />
                      </>
                    ) : (
                      item?.description
                    )}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item?.ownerId}`}>
                              <img className="lazy" src={item?.ownerImage} alt={item?.ownerName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="80px" height="20px" />
                          ) : (
                            <Link to={`/author/${item?.ownerId}`}>{item?.ownerName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item?.creatorId}`}>
                              <img className="lazy" src={item?.creatorImage} alt={item?.creatorName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="80px" height="20px" />
                          ) : (
                            <Link to={`/author/${item?.creatorId}`}>{item?.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>
                        {loading ? (
                          <Skeleton width="60px" height="24px" />
                        ) : (
                          item?.price
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
