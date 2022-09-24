import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { signOut } from 'firebase/auth'
import {auth,db} from "./firebase"
import { useNavigate } from 'react-router-dom'
import { collection, query, where,doc, getDocs,onSnapshot,addDoc,Timestamp,serverTimestamp,orderBy,setDoc,updateDoc } from "firebase/firestore";
function Form() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [list, setList] = useState([]);
  const [updatetime,setupdatetime]=useState([])
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [isFormOpen, setisFormOpen] = useState(false);
  const user1=auth.currentUser.uid
  const navigate=useNavigate()
// handle signout
const handlesignout= async ()=>{
   
    await signOut(auth)
    navigate("/login", { replace: true });
  }

  // read data from data base using snapshot
    useEffect(()=>{
const userRef=collection(db,"employee-database")
// create query object
const q=query(userRef,where("name","!=",""))
const unsub=onSnapshot(q,querysnapshot=>{
  let users=[]
  querysnapshot.forEach(doc=>{ 
users.push(doc.data())
  })
  setList(users)
 
})


  },[list])
  const handleForm = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: name,
        start_shift: date,
        time: time,
        end_shift: endDate,
        endTime: endTime,
      };
      
      try {
  const docRef = await setDoc(doc(db, "employee-database", newItem.id), newItem)

} catch (e) {
 alert("an error occured try again")
}
      setName("");
      setDate("");
      setTime("");
      setisFormOpen(false);
    } else if (isEdit && editID) {
     console.log(editID)
     console.log(isEdit)
 try{
  
 
const washingtonRef = doc(db, "employee-database", editID);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
   end_shift: endDate, 
   endTime: endTime
});

 }catch(e){
  alert("it didnt work")
  console.log(e.message)
 }
      setName("");
      setIsEdit(!isEdit);
      setisFormOpen(!isFormOpen);
      setEndTime("");
      setEndDate("");
    }
  };
  const endShift = (id) => {
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem)
    setName(specificItem.name);
    setisFormOpen(!isFormOpen);
    setEditID(id);
   
    setIsEdit(!isEdit);
  };

  return (
    <section className="employee_page">
      <header className="employee__list--header">
        <div className="employee__list">
          <h1 className="employee--header">Employee</h1>
          <p className="employee--sub__heading">List</p>
        </div>
        <div className="button__container">
             <button className="add__new--btn" onClick={handlesignout}>Logout</button>
          <button
            className="add__new--btn"
            onClick={() => {
              setisFormOpen(!isFormOpen);
            }}
          >
            Add new employee
          </button>
      
        </div>
      </header>
      {/* Toggle Form */}
      {isFormOpen && (
        <article className="form__section">
          <form className="form" onSubmit={handleForm}>
            <h1 className="form__header">
              {isEdit ? `End Shift` : `Add to list`}
            </h1>
            <label htmlFor="" className="nameLabel">
              Name:
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputFeild"
            />
            <label htmlFor="" className="nameLabel">
              Date:
            </label>
            <input
              type="date"
              value={isEdit ? endDate : date}
              onChange={(e) =>
                isEdit ? setEndDate(e.target.value) : setDate(e.target.value)
              }
              className="inputFeild"
            />
            <label htmlFor="" className="nameLabel">
              Time:
            </label>
            <input
              type="Time"
              value={isEdit ? endTime : time}
              onChange={(e) =>
                isEdit ? setEndTime(e.target.value) : setTime(e.target.value)
              }
              className="inputFeild"
            />
            <button className="submit__btn" type="submit">
              Submit
            </button>
          </form>
        </article>
      )}
      <table>
        {/* Table header */}
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Start shift</th>
            <th>End shift</th>
            <th>Total shifts</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* Display employee's added to the list */}
          {list.length > 0 &&
            list.map((tableItem) => {
              const { id, name, start_shift, time, end_shift, endTime } =
                tableItem;
              // Calculate Total shifts
              const calculateTotalShifts = () => {
                let dateNow = new Date(`${start_shift} ${time}`);
                let dateFuture = new Date(`${end_shift} ${endTime}`);

                let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
                // calculate days
                const days = Math.floor(diffInMilliSeconds / 86400);
                diffInMilliSeconds -= days * 86400;
                // calculate hours
                const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
                diffInMilliSeconds -= hours * 3600;
                // calculate minutes
                const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
                diffInMilliSeconds -= minutes * 60;

                let difference = "";
                if (days > 0) {
                  difference += days === 1 ? `${days} day, ` : `${days} days, `;
                }

                difference +=
                  hours === 0 || hours === 1
                    ? `${hours} hour, `
                    : `${hours} hours, `;

                difference +=
                  minutes === 0 || hours === 1
                    ? `${minutes} minutes`
                    : `${minutes} minutes`;

                if (isNaN(days) && isNaN(hours) && isNaN(minutes)) {
                  return "calculating...";
                } else {
                  return difference;
                }
              };
              return (
                <tr key={id}>
                  {/* <td>{id}</td> */}
                  <td>{name}</td>
                  <td>
                    {start_shift} - {time}
                  </td>
                  <td>
                    {end_shift} - {endTime}
                  </td>
                  <td className="time">{calculateTotalShifts()}</td>
                  <td className="edit__btn" onClick={() => endShift(id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
export default Form;
