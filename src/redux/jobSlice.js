import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [], //10
  filtredJobs: [], // 2
  initialized: false,
};

const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      // hem orjinal hem kopya disziye apiden gelen verileri gönderiyoruz
      state.jobs = action.payload;
      state.filtredJobs = action.payload;
      state.initialized = true;
    },
    addNewJob: (state, action) => {
      state.jobs.unshift(action.payload);
    },
    // duruma göre filtreleme
    filterByStatus: (state, action) => {
      // aksiyonun payload değeriyle gelen status değerine eşit olan elemanlarla yeni bir dizi oluştuduk
      const filtredJobs = state.jobs.filter(
        (job) => job.status === action.payload
      );
      // kopya diziyi güncelleme
      state.filtredJobs = filtredJobs;
    },
    // tipe göre filtreleme
    filterByType: (state, action) => {
      // aksiyonla gelen type değerine sahip objelerle yeni bir dizi oluşturusun
      const filtredArr = state.jobs.filter(
        (job) => job.type === action.payload
      );
      // yeni diziyi ekrana basılan dizi olraka ayarla
      state.filtredJobs = filtredArr;
    },
    // inputa göre filtreleme
    handleSearch: (state, action) => {
      /*
      1- Hem arama teriminni hem karşılaştırma 
      * hem yaptığımız şirketin isimini küçük harfe çevir
      a - arama terimini döngü içerisinde küçük harfe çevirmek
      - - performansı etkileyceğinden yukarıda çevirdik  
      */
      // ? arama terimini küçük harfe çevirme
      const query = action.payload.toLowerCase();

      // aksiyonla gelen arama terimiyle eşleşen objelerle yeni bir dizi oluştur
      const filtredArr = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
      // yeni oluşan diziyi kopya diziye (ekrana bastığımz) aktar
      state.filtredJobs = filtredArr;
    },

    // Sıralama
    sortState: (state, action) => {
      switch (action.payload) {
        case 'a-z':
          state.filtredJobs.sort((a, b) => {
            // eğerki a objesinin şirket ismi alfabede sıra olarak
            // b den gerideyse sen a objesini dizide b ye göre daha ön sıraya koy
            // ! bu bir döngü içersinde dizideki bütün elemanlar için gerçekleşir
            if (a.company < b.company) return -1;
            if (a.company > b.company) return 1;
            return 0;
          });

          break;
        // Z den A'ya sıralama
        case 'z-a':
          state.filtredJobs.sort((a, b) => {
            if (a.company < b.company) return 1;
            if (a.company > b.company) return -1;
            return 0;
          });
          break;
        /*
            tarih değerlerine göre sıralama yaparken yapılması gereken:
            öncelikle string tarih değerini bir js tarih objesine çevir 
            - eski hali = "10/1/2023"
            - yeni hali = 1231453827573
            - daha sonra teni değerler arasında çıkarma işlemi
            - sort methodu büyük olan sayıyı dizide daha öne koyucak
          */
        case 'En Yeni':
          state.filtredJobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;

        case 'En Eski':
          state.filtredJobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;

        default:
          break;
      }
    },

    // filtrenmiş diziyi sıfırlar
    handleClear: (state, action) => {
      state.filtredJobs = state.jobs;
    },
  },
});

export const {
  setJobs,
  addNewJob,
  filterByStatus,
  filterByType,
  handleSearch,
  sortState,
  handleClear,
} = jobSlice.actions;

export default jobSlice.reducer;
