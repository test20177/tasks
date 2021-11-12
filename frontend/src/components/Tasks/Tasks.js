import Task from './Task/Task'
import './Tasks.css'
import Modal from 'react-modal'

import { useState, useEffect } from 'react'
import DeleteTask from './DeleteTask/DeleteTask'

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
  const [currentTask, setCurrentTask] = useState()

  useEffect( () => {
      Modal.setAppElement('body')
  }, [])
    
  useEffect( () => {
    const uncompletedTasks = tasks.filter( task => task.done === false ).length
    document.title = 'Zlecenia '
      + ( uncompletedTasks 
          ? ` (niezrealizowanych ${uncompletedTasks})` 
          : ''
      )
  }, [tasks])  

  const changeTaskStatus = (id) => {
      let newTasks = [...tasks]
      newTasks.find( task => task.id === id).done = !newTasks.find( task => task.id === id).done
      setTasks(newTasks)
  }

  const deleteTask = (id) => {
    setTasks( tasks.filter( task => task.id !== id ) )
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }
  
  const openDeleteModal = () => { 
    setShowDeleteModal(true)
  }

  return (
    <>
      <Modal
        isOpen={showDeleteModal}
        contentLabel="Potwierdzenie usunięcia"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }
        }}
      >
        <DeleteTask 
          task={currentTask} 
          deleteTask={deleteTask}
          closeDeleteModal={closeDeleteModal}
        />
      </Modal>
      <div className="row mt-4">
          <div className="col-2">
              <h4>Lista zleceń</h4>
          </div>
          <div className="col-10">
              <button type="button" 
                      className="btn btn-sm btn-primary" >
                      Dodaj zlecenie
              </button>
          </div>
      </div>
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
                          { tasks.map( (task, index) => (
                              <Task 
                                key={index} 
                                task={task} 
                                onDelete={() => {     
                                  setCurrentTask(task)
                                  openDeleteModal()
                                }}
                                onChangeStatus={changeTaskStatus} />
                          )) }    
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


