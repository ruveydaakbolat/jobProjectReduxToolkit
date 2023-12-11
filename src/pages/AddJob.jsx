import { v4 } from "uuid";
import { statusOpt, typeOpt } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.id = v4();
    data.date = new Date().toLocaleDateString();

    axios.post("http://localhost:4500/jobs", data).then(() => {
      navigate("/");
      dispatch(createJob(data));
      toast.success("Ekleme İşlemi Başarılı");
    });

    e.target.reset();
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />

            <datalist id="positions">
              {
                state.jobs.map((job) => (
                  <option value={job.position} />
                ))
              }
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="companies" name="company" type="text" required />

            <datalist id="companies">
              {
                state.jobs.map((job) => (
                  <option value={job.company} />
                ))
              }
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="locations" name="location" type="text" required />

            <datalist id="locations">
              {
                state.jobs.map((job) => (
                  <option value={job.location} />
                ))
              }
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz...
              </option>
              {statusOpt.map((i) => (
                <option>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz...
              </option>
              {typeOpt.map((i) => (
                <option>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit" className="add-button">
              <span class="button_top">Ekle</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
