import { useState, useEffect } from 'react'
import axios from '../../axios'
import Modal from 'react-modal'
import Task from './Task/Task'
import DeleteTask from './DeleteTask/DeleteTask'
import EditTask from './EditTask/EditTask'
import NewTask from './NewTask/NewTask'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { deleteModalStyle, editModalStyle } from './Tasks.css.js'

const Tasks = () => {

  const [tasks, setTasks] = useState()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [showNewTaskForm, setNewTaskForm] = useState(false)
  const [currentTask, setCurrentTask] = useState()

  useEffect(() => {
    Modal.setAppElement('body')
    fetchTasks()
  }, [])

  useEffect(() => {
    const uncompletedTasks = tasks?.filter(task => task.done === false).length
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

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks')
      setTasks(res.data)
    } catch (err) {
      return NotificationManager.error('Brak połączenia z serwerem')
    }
    NotificationManager.success('Połączono z serwerem')
  }

  const addTask = async task => {
    try {
        // adding backend
        const res = await axios.post('/tasks', task)
        const newTask = res.data
        // adding frontend
        const copyTasks = [...tasks]
        copyTasks.push(newTask)
        setTasks(copyTasks)
        setNewTaskForm(false)
    } catch (err) {
        return NotificationManager.error('Nie można dodać zlecenia')
    }
    NotificationManager.success('Dodano zlecenie')
  }

  const editTask = async task => {
    try {
        // edit backend
        await axios.put('/tasks/' + task._id, task)
        // edit frontend
        const newTasks = [...tasks]
        const index = newTasks.findIndex(item => item._id === task._id)
        if (index >= 0) {
          newTasks[index] = task
          setTasks(newTasks)
        }
    } catch (err) {
        return NotificationManager.error('Nie można zapisać zmian')
    }
    NotificationManager.success('Zapisano zmiany')
  }

  const changeTaskStatus = async id => {
    try {
        // edit backend
        const task = await tasks.find(task => task._id === id)
        await axios.put('/tasks/' + task._id, {...task, done: !task.done})
        // edit frontend
        let newTasks = [...tasks]
        newTasks.find(task => task._id === id).done = !newTasks.find(task => task._id === id).done
        setTasks(newTasks)
    } catch (err) {
        return NotificationManager.error('Nie można zapisać zmian')
    }
    NotificationManager.success('Zapisano zmiany')
  }

  const deleteTask = async id => {
    try {
        await axios.delete('/tasks/' + id)
        setTasks(tasks.filter(task => task._id !== id))
    } catch (err) {
        return NotificationManager.error('Nie można usunąć zlecenia')
    }
    NotificationManager.success('Usunięto zlecenie')
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
          saveTask={(task) => editTask(task)}
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
                      index={index}
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
              <h3 className="text-secondary">Brak zleceń</h3>
            )
          }
        </div>
      </div>
      <NotificationContainer />
    </>
  )
}

export default Tasks
