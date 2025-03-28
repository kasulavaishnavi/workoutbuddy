// import { useContext} from "react";
// import axios from "axios";
// import { Data } from "../../Context/WorkoutContext";

// const Form = () => {

//   const {workouts, setWorkouts,getWorkouts, form,setForm} = useContext(Data)
//    const updateFormField = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };
//   const createWorkout = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "http://localhost:4000/api/workout",
//       form
//     );
//     setWorkouts([...workouts, response.data]);
//     setForm({
//       title: "",
//       reps: "",
//       load: "",
//     });
//     getWorkouts();
//   };

//   return (
//     <form onSubmit={createWorkout}>
//     <h1>Create Record</h1>
//     <label htmlFor="">Title</label>
//     <input
//       type="text"
//       name="title"
//       value={form.title}
//       onChange={updateFormField}
//     />
//     <br />
//     <label htmlFor="">Reps</label>
//     <input
//       type="number"
//       name="reps"
//       value={form.reps}
//       onChange={updateFormField}
//     />
//     <br />
//     <label htmlFor="">Load</label>
//     <input
//       type="number"
//       name="load"
//       value={form.load}
//       onChange={updateFormField}
//     />
//     <br />
//     <button>Submit</button>
//   </form>
//   )
// }

// export default Form