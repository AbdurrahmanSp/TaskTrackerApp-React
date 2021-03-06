import { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import About from './Components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   text: 'Doctors Appointment',
    //   day: 'Feb 5th at 2:30pm',
    //   reminder: true
    // },
    // {
    //   id: 2,
    //   text: 'Meeting at school',
    //   day: 'Feb 6th at 1:30pm',
    //   reminder: true
    // },
    // {
    //   id: 3,
    //   text: 'Food shopping',
    //   day: 'Feb 6th at 4:30pm',
    //   reminder: 'false'
    // }
  ])

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = { id, ...task }
    console.log(newTask);
    setTasks([...tasks, newTask])

  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id
      ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (<Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
            ) : (
              'No Tasks to Show'
            )}
          </>
        )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
