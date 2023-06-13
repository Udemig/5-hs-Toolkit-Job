import { useState } from 'react';
import { statusOptions, typeOptions } from '../constants';
import axios from 'axios';
import { addNewJob } from '../redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    id: new Date().getTime(),
    position: '',
    company: '',
    location: '',
    status: 'mülakat',
    type: 'tam-zaman',
    date: new Date().toLocaleDateString(),
  });

  const handleAdd = (e) => {
    e.preventDefault();
    // oluşturduğumuz task objesini

    // Form alanlarının kontrolünü yapma
    if (
      !formState.position ||
      !formState.company ||
      !formState.location
    ) {
      toast.warn('Lütfen bütün alanları doldurun');
      return;
    }
    // ! 1.Adım API'ye gönderme
    axios
      .post('http://localhost:3060/jobs', formState)
      .then(() => {
        dispatch(addNewJob(formState));
        // kullanıyı anasayfaya yönlendir
        navigate('/');
        toast.success('Başarıyla Eklendi');
      }) //  ! 2.Adım Store'a gönderme
      .catch((err) => console.log(err));
  };

  return (
    <section className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleAdd}>
        <div className="input-field">
          <label>Pozisyon</label>
          <input
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                position: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>Şirket</label>
          <input
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                company: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>Lokasyon</label>
          <input
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                location: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>Durum</label>
          <select
            onChange={(e) =>
              setFormState({
                ...formState,
                status: e.target.value,
              })
            }
          >
            {statusOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <label>Tür</label>
          <select
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                type: e.target.value,
              })
            }
          >
            {/* constant'ta oludşturduğumuz options disizinde bulunan herbir obje içiin ekrana bir tane opiton bastık */}
            {typeOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button>Ekle</button>
      </form>
    </section>
  );
};

export default AddJob;
