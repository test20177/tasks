import { useState, useEffect } from "react"

const EditTask = ({ task, saveTask, closeEditModal }) => {

    const [title, setTitle] = useState(task.title)
    const [body, setBody] = useState(task.body)
    const [done, setDone] = useState(task.done)

    const [formErrors, setFormErrors] = useState({ title: '' })

    const changeTitleHandler  = e => setTitle(e.target.value)
    const changeBodyHandler   = e => setBody(e.target.value)
    const changeStatusHandler = e => setDone(e.target.checked)

    const submitForm = e => {
        e.preventDefault()
        saveTask({
            _id: task._id,
            title,
            body,
            done
        })
        closeEditModal()
    }

    useEffect(() => {
        if (title <= 1) {
            setFormErrors({ ...formErrors, title: 'Uzupełnij tytuł zadania' })
        } else {
            setFormErrors({ ...formErrors, title: '' })
        }
    }, [title])

    const isFormErrors = Object.values(formErrors).filter(x => x).length;

    return (
        <>
            <h4 className="text-center">Edycja zlecenia (id: {task._id})</h4>
            <form onSubmit={submitForm} className="my-3">
                <div className="row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Tytuł</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            id="title"
                            className={`form-control && ${formErrors.title && 'is-invalid'}`}
                            value={title}
                            onChange={changeTitleHandler} >
                        </input>
                        <div className="invalid-feedback">
                            {formErrors.title}
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-1">
                    <label htmlFor="body" className="col-sm-2 col-form-label">Treść</label>
                    <div className="col-sm-10">
                        <textarea
                            id="body"
                            className="form-control"
                            value={body}
                            onChange={changeBodyHandler}
                            rows="3">
                        </textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">Zrealizowane</div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="done"
                                className="form-check-input"
                                checked={done}
                                onChange={changeStatusHandler} >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary btn-block m-2"
                        type="button"
                        onClick={closeEditModal}>
                        Anuluj
                    </button>
                    <button className="btn btn-primary btn-block m-2"
                        disabled={isFormErrors}>
                        Zapisz
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditTask
