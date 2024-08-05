import React from 'react';

export const Lesions = (props) => {
  return (
    <div id="lesions" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Type of Skin Lesions</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <React.Fragment key={`${d.title}-${i}`}>
                  <div className="col-md-3">
                    <img className="img_lesions" src={d.img} alt="" />
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                  {(i + 1) % 4 === 0 && <div className="clearfix"></div>}
                </React.Fragment>
              ))
            : 'Loading...'}

          {/* Tambahkan kolom kosong untuk mengisi baris yang tidak penuh */}
          {props.data &&
            props.data.length % 4 !== 0 &&
            Array.from({ length: 4 - (props.data.length % 4) }).map((_, i) => (
              <div key={`empty-${i}`} className="col-md-3"></div>
            ))}
        </div>
      </div>
    </div>
  );
};
