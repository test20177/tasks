import Task from './Task/Task'
import Modal from 'react-modal'
import { deleteModalStyle, editModalStyle } from './Tasks.css.js'
import { useState, useEffect } from 'react'
import DeleteTask from './DeleteTask/DeleteTask'
import EditTask from './EditTask/EditTask'
import NewTask from './NewTask/NewTask'

let initTasks = [
  {
    id: 123,
    title: 'Uzupełnić płyny',
    body: 'łazienka i kotłownia',
    done: false
  },
  {
    id: 124,
    title: 'Oświetlenie placu',
    body: 'Wymienić bezpiecznik w rozdzielni',
    done: true
  },
]

const Tasks = () => {

  const [tasks, setTasks] = useState(initTasks)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [showNewTaskForm, setNewTaskForm] = useState(false)
  const [currentTask, setCurrentTask] = useState()

  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  useEffect(() => {
    const uncompletedTasks = tasks.filter(task => task.done === false).length
    document.title = 'Zlecenia '
      + (uncompletedTasks
        ? ` (niezrealizowanych ${uncompletedTasks})`
        : ''
      )
  }, [tasks])

  const openDeleteModal = () => setShowDeleteModal(true)
  const closeDeleteModal = () => setShowDeleteModal(false)

  const openEditModal = () => setShowEditTaskModal(true)
  const closeEditModal = () => setShowEditTaskModal(false)

  const changeTaskStatus = (id) => {
    let newTasks = [...tasks]
    newTasks.find(task => task.id === id).done = !newTasks.find(task => task.id === id).done
    setTasks(newTasks)
  }

  const addTask = task => {
    const newTasks = [...tasks]
    newTasks.push(task)
    setTasks(newTasks)
    setNewTaskForm(false)
  }

  const saveTask = task => {
    const newTasks = [...tasks]
    const index = newTasks.findIndex(item => item.id === task.id)
    if (index >= 0) {
      newTasks[index] = task
      setTasks(newTasks)
    }
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <>
      <Modal
        isOpen={showDeleteModal}
        contentLabel="Potwierdzenie usunięcia"
        style={deleteModalStyle}
      >
        <DeleteTask
          task={currentTask}
          deleteTask={deleteTask}
          closeDeleteModal={closeDeleteModal}
        />
      </Modal>

      <Modal
        isOpen={showEditTaskModal}
        contentLabel="Edycja zlecenia"
        style={editModalStyle}
      >
        <EditTask
          task={currentTask}
          saveTask={(task) => saveTask(task)}
          closeEditModal={closeEditModal}
        />
      </Modal>


      {!showNewTaskForm ? (
        <div className="row mt-4">
          <div className="col-2">
            <h4>Lista zleceń</h4>
          </div>
          <div className="col-10">
            <button type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setNewTaskForm(true)}>
              Dodaj zlecenie
            </button>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          <div className="col">
            <NewTask
              onAdd={(task) => addTask(task)}
              onCancel={() => setNewTaskForm(false)}
            />
          </div>
        </div>
      )}

      <div className="row mt-2">
        <div className="col-12">
          {
            tasks?.length ? (
              <table className="table table-striped text-center">
                <caption>
                  <h5>Suma: {tasks.length}</h5>
                </caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tytuł</th>
                    <th scope="col">Treść</th>
                    <th scope="col">Status</th>
                    <th scope="col">Edycja</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <Task
                      key={index}
                      task={task}
                      onDelete={() => {
                        setCurrentTask(task)
                        openDeleteModal()
                      }}
                      onEdit={() => {
                        setCurrentTask(task)
                        openEditModal()
                      }}
                      onChangeStatus={changeTaskStatus} />
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className="text-secondary" >Brak zleceń</h3>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Tasks
