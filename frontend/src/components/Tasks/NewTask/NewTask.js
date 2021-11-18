import { useState } from "react"

const NewTask = ({ onAdd, onCancel }) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [done, setDone] = useState(false)

    const [formErrors, setFormErrors] = useState({ title: '' })
    const [enabledSend, setEnabledSend] = useState(false)

    const changeTitleHandler = e => {
        setTitle(e.target.value)
        if (e.target.value <= 1) {
            setFormErrors({ ...formErrors, title: 'Uzupełnij tytuł zadania' })
            setEnabledSend(false)
        } else {
            setFormErrors({ ...formErrors, title: '' })
            setEnabledSend(true)
        }
    }

    const changeBodyHandler   = e => setBody(e.target.value)
    const changeStatusHandler = e => setDone(e.target.checked)

    const submitForm = (e) => {
        e.preventDefault()
        onAdd({ title, body, done })
        clearForm()
    }

    const clearForm = () => {
        setTitle('')
        setBody('')
        setDone(false)
    }

    return (
        <>
            <h6 className="bg-success text-white p-2">Nowe zlecenie</h6>
            <form onSubmit={submitForm} className="mb-3">
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
                <button
                    className="btn btn-success m-2"
                    type="button"
                    onClick={onCancel} >
                    Anuluj
                </button>
                <button
                    className="btn btn-success"
                    disabled={!enabledSend} >
                    OK
                </button>
            </form>
        </>
    )
}

export default NewTask
