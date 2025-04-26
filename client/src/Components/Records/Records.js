import { useEffect, useState } from "react";
import axios from "axios";
import "./RecordStyle.css";
import {useAuthContext} from "../../Hooks/useAuthContext";


const Records = () => {
  
const {user} = useAuthContext()
  // //GET REQUEST
  //State for getting the data
  const [workouts, setWorkouts] = useState(null);

  // //GET request function
  const getWorkouts = async () => {
    const response = await axios.get("https://workoutbuddy-backend-cu6g.onrender.com/api/workout", {
      headers: {
        "Authorization" : `Bearer ${user.token}`
      }
    });
    const data = response.data;
    setWorkouts(data);
  };
  useEffect(() => {
  if (user){
    getWorkouts();
  }
  }, [user, getWorkouts]);

  //POST REQUEST
  const [form, setForm] = useState({
    title: "",
    reps: "",
    load: "",
  });
  const updateFormField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const createWorkout = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://workoutbuddy-backend-cu6g.onrender.com/api/workout",
      form,
      {
        headers: {
          "Authorization" : `Bearer ${user.token}`
        }
      }
    );
    setWorkouts([...workouts, response.data]);
    setForm({
      title: "",
      reps: "",
      load: "",
    });
    getWorkouts();
  };

  //DELETE REQUEST
  const deleteWorkout = async (_id) => {
    await axios.delete(`https://workoutbuddy-backend-cu6g.onrender.com/api/workout/${_id}`,{
      headers: {
        "Authorization" : `Bearer ${user.token}`
      }
    });
    getWorkouts();
  };

  //   UPDATE REQUEST
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    reps: "",
    load: "",
  });

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (item) => {
    setUpdateForm({
      _id: item._id,
      title: item.title,
      reps: item.reps,
      load: item.load,
    });
  };

  const updateWorkout = async (e) => {
    e.preventDefault();
    const { _id, title, reps, load } = updateForm;
    await axios.patch(`https://workoutbuddy-backend-cu6g.onrender.com/api/workout/${_id}`, {
      title,
      reps,
      load,
    },
    {
      headers: {
        "Authorization" : `Bearer ${user.token}`
      }
    });
    getWorkouts();
    setUpdateForm({
      _id: null,
      title: "",
      reps: "",
      load: "",
    });
  };

  return (
    <>
      {/* CREATE FORM */}
      {!updateForm._id && (
      <div className="form">
        <h1>Create Record</h1>
          <form onSubmit={createWorkout}>
            <div className=" field">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={updateFormField}
            />
            </div>
            <div className=" field">
            <label htmlFor="">Reps</label>
            <input
              type="tel"
              name="reps"
              value={form.reps}
              onChange={updateFormField}
            />
           </div>
            <div className=" field">
            <label htmlFor="">Load(in kg):</label>
            <input
              type="tel"
              name="load"
              value={form.load}
              onChange={updateFormField}
            />
            </div>
            <button>Submit</button>
          </form>
          </div>
        )}
     

      {/* UPDATE FORM */}
      {updateForm._id && (
      <div className="form">
        <h1>Edit Record</h1>
          <form onSubmit={updateWorkout}>
            <div className="field">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={updateForm.title}
              onChange={handleUpdateFieldChange}
            />
            </div>
            <div className="field">
            <label htmlFor="">Reps</label>
            <input
              type="tel"
              name="reps"
              value={updateForm.reps}
              onChange={handleUpdateFieldChange}
            />
            </div>
            <div className="field">
            <label htmlFor="">Load(in kg):</label>
            <input
              type="tel"
              name="load"
              value={updateForm.load}
              onChange={handleUpdateFieldChange}
            />
          </div>
            <button>Update</button>
          </form>
          </div>
        )}

<div className="records">
      {workouts &&
        workouts.map((item) => {
          return (
            <div  className="record" key={item._id}>
              <h1> {item.title}</h1>
              <p>Reps: {item.reps}</p>
              <p>Load(in kg): {item.load}</p>
              <div className="btns">
                <button className="btns" onClick={() => toggleUpdate(item)}>
                  {" "}
                  Edit <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="btns"
                  onClick={() => {
                    deleteWorkout(item._id);
                  }}
                >
                  {" "}
                  Delete <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
        </div>
    </>
  );
};

export default Records;
