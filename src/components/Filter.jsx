import { useRef } from 'react';
import {
  statusOptions,
  typeOptions,
  sortOptions,
} from '../constants';
import {
  filterByStatus,
  filterByType,
  handleSearch,
  sortState,
  handleClear,
} from '../redux/jobSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  //   input her değişitğinde çalışır
  const handleChange = (e) => {
    dispatch(handleSearch(e.target.value));
  };

  //   status değeri her değişitiğinde çalışır
  const handleStatusChange = (e) => {
    dispatch(filterByStatus(e.target.value));
  };

  // type değeri her değiştiğinde çalışır
  const handleTypeChange = (e) => {
    dispatch(filterByType(e.target.value));
  };

  // sıralama değeri her değiştiğinde çalışır
  const handleSortChange = (e) => {
    dispatch(sortState(e.target.value));
  };

  // Temizle butonuna tıklanınca çalışır
  const handleClick = (e) => {
    e.preventDefault();
    // inputun içerisini temizleme
    inputRef.current.value = '';
    //  temizleme eylemini(action) çalıştırma
    dispatch(handleClear());
  };

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div className="input-field">
          <label>Arama</label>
          <input
            ref={inputRef}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Durum</label>
          <select onChange={handleStatusChange}>
            <option selected hidden>
              Durum Seçiniz
            </option>
            {statusOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <label>Tip</label>
          <select onChange={handleTypeChange}>
            {typeOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <label>Sırala</label>
          <select onChange={handleSortChange}>
            {sortOptions.map((opt) => (
              <option value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <button onClick={handleClick}>
          Filtreleri Temizle
        </button>
      </form>
    </section>
  );
};

export default Filter;
