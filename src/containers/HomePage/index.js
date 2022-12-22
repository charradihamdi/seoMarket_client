import React from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import MenuHeader from "../../components/MenuHeader";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import "./style.css";
const HomePage = (props) => {
  return (
    <Layout>
      <Jumbotron
        style={{ margin: "5rem", background: "#fff" }}
        className="text-center"
      >
        <div
          className="hero-banner full jumbo-banner"
          style={{ background: "#f4f9fd url(assets/img/bg2.png)" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-8">
                <a href="" className="header-promo light w-inline-block">
                  <div className="label bg-success">SeoMarket</div>
                  <div className="header-promo-text">
                    Ezy to get visitors for you
                  </div>
                </a>
                <h1>
                  Find <span className="text-info">your target</span> & make
                  sure goal!
                </h1>
                <p className="lead">Your dream views is waiting for you.</p>
              </div>

              <div className="col-lg-5 col-md-4"></div>
            </div>
          </div>
          <div
            className="hero-banner full jumbo-banner"
            style={{ background: "#f4f9fd url(assets/img/bg2.png)" }}
          >
            <div class="steps">
              <div class="col-md-4 col-sm-4">
                <div class="working-process">
                  <span class="process-img">
                    <img
                      src="data:image/png;base64,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"
                      class="img-responsive"
                      alt=""
                    />
                    <span class="process-num"></span>
                  </span>
                  <h4>Create An Account</h4>
                  <p>
                    Post your offer to tell us about your website. We'll quickly
                    match you with the right customers to find the place best
                  </p>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="working-process">
                  <span class="process-img">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAABEVBMVEX////5vBXqQzVUfb9HUFkzqFH5ugD5twD85LH//vf7z3H957n+9uj/+vP82Yz5wTJMeL3pNCL70XvqPi/pOipGdLsdo0Oxp6npOCf3+fz97Os4RU9VfsDpLxvv8/mzw+Dwhn/pKxX2ubXJwsOkt9r74N74xcFxksnznZfuc2qasNf4zMmAnM3rTUD/+vrl8+jtYFX0q6a43cDH5M6Hf4NWtGxDrl7d5PHvfHT61tR7wovF0ef3v7yo1rKOp9IVoj9pjMbtaV/R2uwwOUSQy51Jr2H968fb7uCXzKLrU0dqvH3ykYrB4ch9w43sW0/zoJu+Qjzc3N2elZhcXmVya3HVRTtbT1ZySU10eoDcvLo+PkhCPbHpAAAIrklEQVR4nO2ca1vaSBSAswhV2+1usiE0REJAQeUqSBWVKoi11WJl2733//+QzW0uuZILF+d5zvulLUya5H1mMifnzMBxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALBqBqebvgKGGZyNrzd9DczydF7IFZ42fRWMcq3Ly+UKg01fB5Nc5wx5udz4ZNNXwiAfC5Y8vfeBvvhcj3OI3U1fS0zKU61Wa9Zq2mhaXu2ZlPqhQavu/erkDOlb7SUsl2HtSJIk3kb/61FtuJoz1fsNWVUFE1XtHbdc31/bo/d+NadfAcVaSeK3XPDSVs3bCT+9jsiO75mU44wqixmCmBeqF7TBXfTsO1vRzS6bYtPrDhlsFl2Nd7ZfReM3nzNdNqr5jBdR7ezjNlfWvJHLfVnpTS+NER8gzxS4NXK23nn1UyR89CmNqugjz0TIfLAafTanjsJprvB1DfeenqYULM9AajqaJ9c3FwLlGai3itHKnDgMdV8e1iQgFTcL7On+buj2SfUpPSFMnjGEZb0DnppPvoIRs7AQ9i3qex5/CfVdhnc9awD3Oc568LGSLBi57Nlxi9ufRo5Ipq9VXSgvIz5y3IPZ+c7XrSEpJae7yY0eMmtac8I752KJBDCJ9HnsibKg6kGfQMcwaos7Me2NWckVaFTnkyYakVSctuk+yLfxN0n0XaoOd3m1U+m36kq9fthviGhUiw19ujDHLiMRC8dN/AeoSZlMKjz19KP0hYZ926/xIYpMy5PFGf2q1m01VDMWrCrcYMxUqqBMOp809X49LPG2POrlg+j79U0on/Ahz9QIFYV5132e+oU+tuVjjrs37X1cyb2uADJx8O6+Z1I84l3yHPoinmVGdT7BCu7ctDJ5sYtedmPexOao4cebFNBiIrVdiYPY+i6paaN6HNCo29Pf2qyQj50C0Q3Sx98EtCh7si6x9T2SoVvdD2v4sWDnWWY+aayXCNFXi3xMXH375GVDDbV3Ys4b489cvdqIfDUbpYn1NRc3tomrj3ruBY1cCytoueK4hlhlo/uRZ18p8jEx9R3izifehjYcFOygRQ+x8xeRL2eTLJp5/Yip7xY/+QTfORdzbtp74LiOfoTgCW5eIkMq7ovqL54+BXc+OXzo4qClbxwh9yNezWahXnmlo2iljXj6yMTh6FAnOVd4YmXoC09cV4gw0F8KNfq9VirVpu7UvJd4+hpo7OZn9MdGMdch8CuqblSsZH6VidFbduareEkqtZvaaBhiMZa+LglaLqmPd8dmNYMItDP0etBiJxeES+9/9gKpebKlVpWy1K4FlHopfW/DMGvcCk61yPT/YQXIucI5Eogz9D27tzLy8OMmQTU2XeLEr9JLZVy2w/jFaIwzVaIjFEGlSCQQZ+hxb81X1nDvS6BYCiuzSRPPhBwx3/fK1PcBzRyO3vSA9dkCSYYexTmMzB1GViW02iFtuQTG0jdDVV2BLoSjQi4SaFV2zx0HdNYmIC21oCK5LXASkLCKoK+CbNAzhxniFU7vqT6IM/R9lNwS12kgHeWbUIG8RD8CE+qjXjnQSB04BFoZehb16QKNNS7BCml/CfWRJIDZ+SxZlEA7Q8+mPp2h1i5JgQ5jV9qCBy8ugxsMzuwYxs7Qz/ESmLXd+PIoj7SboxLvtRi/0uaeOg7R8UaQMqYWfdsC7X9V0Mz7vJ47XgHF8rTWdhd68fCNWGnbdgYu+Tk6/lzvaleO8w3ux2MUP6OwWWQjZRXM1Dmf4O5H6fsljDdGYxI2ozjOjJDd5xqgym4X9VbnKzKTlNt0ER29Bsd65yUvbar9ybmZjw+ihXqrEJrXZwTNpw4cL+PSQfrsh99TwUyJBuE3UzMMLoaQYlI8fdiHPXrPQ9fc4rHrzDCwC5l7USkznj48d1j9aVAIXYJBoj7WZw4bUso8sj+JmazHKwyMFUDcWWgVvEvqIh+WcO1rwmd1C0bDo3difxKzVHSBlaiHRucLWz01I2OXiWSzgVaSQnLLqfW1qLVp3atCIawpXs3BTNgyKkmhNfJmysFLr9HQZ49cyMJHhVqOEF7TfClMS5IjKPEySTl1OLqfHDYhdDvYMxup5ukEhXV8UI3Sp44ee4lQjywRkoMXrygdqhkTnY9K0/P+/a/s89IbW1+dWqCWfw4w08oTewIbZSJ6Vb138xVnrC6lci7oQ0rfz6G8RUfMqQ0douz3NtatUBOM2FvJ3S4famXzFl/SXALL9JYPMr1ErbRRa5tv6X1swvOh8zxcty/SDfJMDF2dqaNIxPNtDdXHi0PNsbKe2pmQYGW9knFsoRQyxyR52m1VZMfKcXb0kXcKJFCS+MmRT8KUim2SbEyou/Zj5QWhVzmez48rHUFwb7EURWb8BRXJ3VDL/xJti3Ft7DAk5Q1Ev51a7PgrLzZndj7fjQkx9HF1efGWNuIvw4y/sEUGeEwnKFS6twQqj/JibaL9isKOvwWLDAx7icrk3v28F54B7EJ+rHO9PGP+Fi4ycL0RJ98O/UEM64Bi1cwT2P7yv3/7/sefB+sxkI6QRQa8Z1dMms343ZnvLxlY8hp2et70J/61t7eXzd59X/3dLwHfRQa8/y9p7IQHy35hM0GZqT7bokW52iCR4LPur5O12GPDn7XIgMc/5KL/WdKDaN+Wu1HxPbq7fyvQu3hFPQbszB1Pup6c+TuL/L1b/q2uiuJwOBppOqPpcIW/IqS05rcdUVB15MxzZd8zS/T+yWZZ9LdGuoqJb1K+vJcFf8l5R+sDf3H5N5sFf8l5vwf+UvDtzqkvewf+4nAA/lLh8QfjNxbgLx3gLx3gLx3gLx0w/6YD/KUDxm86wF86vP5YyT+/DLzPv8W/VgEQ3P5AXzyc/vbeb/p6WOPgB9hLw38/wF4akD+wlwzLH9hLijF/gL3kHNyBvTQcwOsaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE/wPCXD4Hj8M5FwAAAAASUVORK5CYII="
                      class="img-responsive"
                      alt=""
                    />
                    <span class="process-num"></span>
                  </span>
                  <h4>Search website</h4>
                  <p>Find the best way to post your website ad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Jumbotron>
    </Layout>
  );
};

export default HomePage;
