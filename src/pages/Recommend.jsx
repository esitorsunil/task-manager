import { useState } from "react";

const Recommend = () => {
  const [selected1, setSelected1] = useState('All recommendations');
  const [show1, setShow1] = useState(false);
  const [selected2, setSelected2] = useState('Recommendation for me');
  const [show2, setShow2] = useState(false);

  const handleSelect1 = (value) => {
    setSelected1(value);
    setShow1(false);
  };

  const handleSelect2 = (value) => {
    setSelected2(value);
    setShow2(false);
  };

  return (
    <div>
      <h5>Recommended tasks</h5>

      <div className="d-flex justify-content-between align-items-center my-3 mt-5 flex-wrap gap-3">

        <div className="custom-input-group d-flex align-items-center">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        <div className="d-flex gap-3">

          <div className="position-relative" style={{ minWidth: '200px' }}>
            <div
              role="combobox"
              tabIndex="0"
              className="border rounded px-3 py-2 d-flex justify-content-between align-items-center bg-white shadow-sm"
              onClick={() => setShow1(!show1)}
              aria-haspopup="listbox"
              aria-expanded={show1}
             style={{ cursor: 'pointer', fontSize: '14px' }} 

            >
              <span>{selected1}</span>
              <i className="bi bi-chevron-down ms-2 text-muted"></i>
            </div>
            {show1 && (
              <ul
                role="listbox"
                className="list-group position-absolute w-100 mt-1 shadow-sm zindex-dropdown"
                style={{ zIndex: 1050 }}
              >
                <li className="list-group-item list-group-item-action" onClick={() => handleSelect1('All recommendations')}>All recommendations</li>
                <li className="list-group-item list-group-item-action" onClick={() => handleSelect1('New recommendations')}>New recommendations</li>
              </ul>
            )}
          </div>

          <div className="position-relative" style={{ minWidth: '200px' }}>
            <div
              role="combobox"
              tabIndex="0"
              className="border rounded px-3 py-2 d-flex justify-content-between align-items-center bg-white shadow-sm"
              onClick={() => setShow2(!show2)}
              aria-haspopup="listbox"
              aria-expanded={show2}
             style={{ cursor: 'pointer', fontSize: '14px' }} 

            >
              <span>{selected2}</span>
              <i className="bi bi-chevron-down ms-2 text-muted"></i>
            </div>
            {show2 && (
              <ul
                role="listbox"
                className="list-group position-absolute w-100 mt-1 shadow-sm zindex-dropdown"
                style={{ zIndex: 1050 }}
              >
                <li className="list-group-item list-group-item-action" onClick={() => handleSelect2('Recommendations for me')}>Recommendations for me</li>
                <li className="list-group-item list-group-item-action" onClick={() => handleSelect2('Recommendations for Anyone')}>Recommendations for Anyone</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
