import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlineClose } from "react-icons/ai";

//show is added for close button in small device
const WorkoutForm = ({ show, handleClose}) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
    }

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });

      if (show) {
        handleClose()
      }
    }

    const butt = document.getElementsByClassName('workout-button')
    butt.addEventListener('click', () => {
      const form = document.getElementsByTagName('form')[0]
      form.toggle('slow')
      return false
    })
  };

  return (
    <form className="create" onSubmit={handleSubmit} id={show ? "open" : ""}>
      <h3 className="title-close-button">
        Add a New Workout
        {show && (
          <span>
            <AiOutlineClose onClick={handleClose} />
          </span>
        )}
      </h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) =>
          setTitle(e.target.value) || setError(null) || setEmptyFields([])
        }
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) =>
          setLoad(e.target.value) || setError(null) || setEmptyFields([])
        }
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) =>
          setReps(e.target.value) || setError(null) || setEmptyFields([])
        }
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button className={show ? "workout-button" : ''}>Add Workout</button>
      {error && <div className={ show ? "small-error" : "error"}>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
