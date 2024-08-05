import React from 'react';

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="about-text">
              <h2>About Skin Lesions</h2>
              <p>{props.data ? props.data.paragraph1 : 'loading...'}</p>

              <div className="list-style">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <h3>What are benign skin lesions?</h3>
                    <p>{props.data ? props.data.paragraph2 : 'loading...'}</p>
                    <ul>
                      {props.data
                        ? props.data.List.map((d, i) => (
                            <li key={`${d}-${i}`}>{d}</li>
                          ))
                        : 'loading'}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <h3>What are malignant skin lesions?</h3>
                    <p>{props.data ? props.data.paragraph3 : 'loading...'}</p>
                    <ul>
                      {props.data
                        ? props.data.List2.map((d, i) => (
                            <li key={`${d}-${i}`}> {d}</li>
                          ))
                        : 'loading'}
                    </ul>
                  </div>
                </div>
                {/* baris kedua */}
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <h3>What are the symptoms of skin lesions?</h3>
                    <p>{props.data ? props.data.paragraph4 : 'loading...'}</p>
                    <ul>
                      {props.data
                        ? props.data.List3.map((d, i) => (
                            <li key={`${d}-${i}`}>{d}</li>
                          ))
                        : 'loading'}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <h3>What causes skin lesions?</h3>
                    <p>{props.data ? props.data.paragraph5 : 'loading...'}</p>
                    <ul>
                      {props.data
                        ? props.data.List4.map((d, i) => (
                            <li key={`${d}-${i}`}> {d}</li>
                          ))
                        : 'loading'}
                    </ul>
                  </div>

                  {/* baris ketiga */}
                  <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                      <h3>How are skin lesions diagnosed?</h3>
                      <p>{props.data ? props.data.paragraph6 : 'loading...'}</p>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                      <h3>How do I get rid of skin lesions?</h3>
                      <p>{props.data ? props.data.paragraph7 : 'loading...'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
