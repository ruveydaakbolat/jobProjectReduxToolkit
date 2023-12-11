import { useDispatch } from "react-redux";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import { clearFilters, filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";

const Filter = ({ jobs }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => dispatch(filterBySearch({field: "company", text})), 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <div>
          <label>Şirket</label>
          <input
            onChange={(e) => setText(e.target.value)}
            list="positions"
            name="position"
            type="text"
          />

          <datalist id="positions">
            {jobs.map((job) => (
              <option value={job.company} />
            ))}
          </datalist>
        </div>

        <div>
          <label>Durum</label>
          <select onChange={(e) => dispatch(filterBySearch({field: 'status', text:e.target.value }))} name="status">
            <option hidden>Seçiniz...</option>
            {statusOpt.map((i) => (
              <option>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select onChange={(e) => dispatch(filterBySearch({field: 'type', text: e.target.value}))} name="type">
            <option hidden>Seçiniz...</option>
            {typeOpt.map((i) => (
              <option>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))} name="type">
            {sortOpt.map((i) => (
              <option>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <button className="add-button" onClick={() => dispatch(clearFilters())} type="reset">
            <span class="button_top">Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
