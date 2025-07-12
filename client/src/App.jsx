import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState([
    {
      name: "",
      unit: "",
      weight: 0,
      subActivity: [{ sName: "", sUnit: "", sWeight: "" }]
    }
  ]);

  const [error, setError] = useState("");
  const [totalWeightage, setTotalWeightage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((res) => {
        setForm(res.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    form.forEach((task) => {
      total += Number(task.weight) || 0;
    });
    setTotalWeightage(total);
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/add", form);
  };

  const handleAddTask = () => {
    setForm([
      ...form,
      {
        name: "",
        unit: "",
        weight: 0,
        subActivity: [{ sName: "", sUnit: "", sWeight: "" }]
      }
    ]);
  };

  const handleAddSubTask = (taskIndex) => {
    const updatedForm = [...form];
    updatedForm[taskIndex].subActivity.push({
      sName: "",
      sUnit: "",
      sWeight: ""
    });
    setForm(updatedForm);
  };

  const handleTaskChange = (e, index, field) => {
    const updatedForm = [...form];
    updatedForm[index][field] = e.target.value;
    setForm(updatedForm);
  };

  const handleSubTaskChange = (e, taskIndex, subIndex, field) => {
    const updatedForm = [...form];
    const value = e.target.value;

    updatedForm[taskIndex].subActivity[subIndex][field] = value;

    let total = 0;
    updatedForm[taskIndex].subActivity.forEach((sub) => {
      total += Number(sub.sWeight) || 0;
    });
    updatedForm[taskIndex].weight = total;

    setForm(updatedForm);
  };

  const handleDeleteTask = (taskIndex) => {
    const updatedForm = [...form];
    updatedForm.splice(taskIndex, 1);
    setForm(updatedForm);
  };

  const handleDeleteSubTask = (taskIndex, subIndex) => {
    const updatedForm = [...form];
    updatedForm[taskIndex].subActivity.splice(subIndex, 1);

    let total = 0;
    updatedForm[taskIndex].subActivity.forEach((sub) => {
      total += Number(sub.sWeight) || 0;
    });
    updatedForm[taskIndex].weight = total;

    setForm(updatedForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formBody">
        <h2>Total Weightage: {totalWeightage}%</h2>
        {totalWeightage !== 100 && (
          <p style={{ color: "red" }}>
            Total weightage must be exactly 100% to submit.
          </p>
        )}

        {form.map((task, taskIndex) => (
          <div key={taskIndex} className="task-container">
            <h3>Task {taskIndex + 1}</h3>
            <input
              type="text"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) => handleTaskChange(e, taskIndex, "name")}
            />
            <input
              type="text"
              placeholder="Task Unit"
              value={task.unit}
              onChange={(e) => handleTaskChange(e, taskIndex, "unit")}
            />
            <input
              type="number"
              placeholder="Task Weight (auto)"
              value={task.weight}
              readOnly
              style={{ backgroundColor: "#eee", cursor: "not-allowed" }}
            />
            <button type="button" onClick={() => handleAddSubTask(taskIndex)}>
              Add Subtask
            </button>
            <button type="button" onClick={() => handleDeleteTask(taskIndex)}>
              Delete Task
            </button>

            {task.subActivity.map((subTask, subIndex) => (
              <div key={subIndex} className="subTask-body">
                <input
                  type="text"
                  placeholder="Subtask Name"
                  value={subTask.sName}
                  onChange={(e) =>
                    handleSubTaskChange(e, taskIndex, subIndex, "sName")
                  }
                />
                <input
                  type="text"
                  placeholder="Subtask Unit"
                  value={subTask.sUnit}
                  onChange={(e) =>
                    handleSubTaskChange(e, taskIndex, subIndex, "sUnit")
                  }
                />
                <input
                  type="number"
                  placeholder="Subtask Weight"
                  value={subTask.sWeight}
                  onChange={(e) =>
                    handleSubTaskChange(e, taskIndex, subIndex, "sWeight")
                  }
                />
                <button
                  type="button"
                  onClick={() => handleDeleteSubTask(taskIndex, subIndex)}
                >
                  Delete Subtask
                </button>
              </div>
            ))}
            <hr />
          </div>
        ))}
        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
        <br />
        <button type="submit" disabled={totalWeightage !== 100}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
