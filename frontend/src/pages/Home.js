import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
// import Model from "../components/Model";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [width, setWidth] = useState(window.innerWidth);

  //for popup on small device
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const unpdateCompWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", unpdateCompWidth);
    return () => window.removeEventListener("resize", unpdateCompWidth);
  }, [width]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);


  if (show) {
    return <WorkoutForm show={show} setShow={setShow} handleClose={handleClose} />
  }

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      {width > 595 ? (
        <WorkoutForm />
      ) : (
        <button className="workout-button" onClick={handleShow}>To add workout &#8680;</button>
      )}
    </div>
  );
};

export default Home;
