import React from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import MenuHeader from "../../components/MenuHeader";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import "./style.css";
const HomePage = (props) => {
  return (
    <div id="main-wrapper">
      <Layout>
        <>
          <div
            class="hero-banner full jumbo-banner"
            style={{ background: "#f4f9fd url(assets/img/bg2.png)" }}
          >
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-7 col-md-8">
                  <a class="header-promo light w-inline-block">
                    <div class="label bg-success">SeoMarket</div>
                    <div class="header-promo-text"> is now UK-Wide</div>
                  </a>
                  <h1>
                    Find <span class="text-info">your clients</span> & make sure
                    your goal!
                  </h1>
                  <p class="lead">Your dream is waiting for you.</p>
                  <form class="search-big-form banner-search shadow mt-3">
                    <div class="row m-0">
                      <div class="col-lg-5 col-md-5 col-sm-12 p-0">
                        <div class="form-group">
                          <i class="ti-search"></i>
                          <input
                            type="text"
                            class="form-control b-0 b-r l-radius"
                            placeholder="Site Title or Keywords"
                          />
                        </div>
                      </div>

                      <div class="col-lg-5 col-md-4 col-sm-12 p-0">
                        <div class="form-group">
                          <select
                            id="jb-category"
                            class="js-states form-control b-0"
                          >
                            <option value="">&nbsp;</option>
                            <option value="1">Sports</option>
                            <option value="2">Telecommunications</option>
                            <option value="3">magazine</option>

                            <option value="7">Education Training</option>
                            <option value="8">Designing & Multimedia</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                        <button
                          type="button"
                          class="btn dark-3 full-width r-radius"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                  <div class="featured-category dark">
                    <ul>
                      <li>Browse Category:</li>
                      <li>
                        <a data-toggle="tooltip" data-original-title="Banking">
                          Sports
                        </a>
                      </li>
                      <li>
                        <a
                          data-toggle="tooltip"
                          data-original-title="Healthcare"
                        >
                          travel
                        </a>
                      </li>
                      <li>
                        <a data-toggle="tooltip" data-original-title="Software">
                          Elearning
                        </a>
                      </li>
                      <li>
                        <a
                          data-toggle="tooltip"
                          data-original-title="Automotive"
                        >
                          Universe
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-5 col-md-4">
                  <img
                    src="assets/img/a-2.png"
                    alt="latest property"
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <section class="gray-light">
            <div class="container gray-bg">
              <div class="row justify-content-center">
                <div class="col-lg-7 col-md-9">
                  <div class="sec-heading">
                    <h2>
                      What People <span class="theme-cl-2">Saying</span>
                    </h2>
                    <p>
                      It is not enough to create and put a website online for it
                      to be seen and known by Internet users and your target
                      audience. It is necessary to take the necessary measures
                      to ensure its visibility in the midst of the many
                      responses on the Google search engine. However, this will
                      not be easy without the help of a professional who masters
                      the specificities of site referencing.
                    </p>
                  </div>
                </div>
              </div>

              <div class="row" style={{}}>
                <div class="col-lg-12 col-md-12">
                  <div class="owl-theme middle-arrow-hover" id="reviews-slide">
                    <div class="item testimonial-center">
                      <div class="smart-tes-author">
                        <div class="st-author-box">
                          <div class="st-author-thumb">
                            <img
                              src="https://www.doyoubuzz.com/var/users/_/2010/12/15/22/86957/avatar/82242/avatar_cp_big.jpg?t=1672257930"
                              class="img-fluid"
                              alt=""
                            />
                          </div>
                          <div class="st-author-info">
                            <h4 class="st-author-title">Aymen All wazzeni</h4>
                            <span class="st-author-subtitle theme-cl">
                              CEO Of SeoMarket
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="smart-tes-content">
                        <p>
                          Passionné de Com’ et de Digital. Marketeur. Esprit
                          créatif. Réactif. Esprit analytique poussé. Formateur
                          et coach certifié. Autonome. Perfectionniste et
                          pragmatique. Professionnel. Contact me via my website
                          <span className="gray-light">
                            <a href="www.buzz-2-win.com">www.buzz-2-win.com</a>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class="item testimonial-center">
                      <div class="smart-tes-author">
                        <div class="st-author-box">
                          <div class="st-author-thumb">
                            <img
                              src="https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/311825533_1096442941242672_8517673444947686367_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GWQWpsMxOfoAX8fUenN&_nc_ht=scontent.ftun10-1.fna&oh=00_AfBHl58DU7xudMJZZgihVkt3waVCcO5F-qCkEkfM_X4bLA&oe=63B2F797"
                              class="img-fluid"
                              alt=""
                            />
                          </div>
                          <div class="st-author-info">
                            <h4 class="st-author-title">Charradi hamdi</h4>
                            <span class="st-author-subtitle theme-cl">
                              WEB DEVELOPER & ASSISTANT
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="smart-tes-content">
                        <p>
                          Our approach to website design is to create a website
                          that strengthens your company’s brand while ensuring
                          ease of use and simplicity for your audience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </Layout>
    </div>
  );
};

export default HomePage;
