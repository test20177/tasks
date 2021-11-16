import { useState, useEffect } from "react"

const NewTask = ({ onAdd, onCancel }) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [done, setDone] = useState(false)
    const [formErrors, setFormErrors] = useState({ title: ''})
    const [enabledSend, setEnabledSend] = useState(false)

    const changeTitleHandler = event => {
        setTitle(event.target.value)
        if (event.target.value <= 1) {
            setFormErrors({...formErrors, title: 'Uzupełnij tytuł zadania'})
            setEnabledSend(false)
        } else {
            setFormErrors({...formErrors, title: ''})
            setEnabledSend(true)
        }
    } 

    const changeBodyHandler = event => setBody(event.target.value)
    const changeStatusHandler = event => setDone(event.target.checked)

    const submitForm = (e) => {
        e.preventDefault()
        const task = { title, body, done } 
        onAdd(task)
        setTitle('')
        setBody('')
        setDone(false)
    }    

    return (
        <>
            <h6 className="bg-success text-white p-2">Nowe zlecenie</h6>
            <form onSubmit={submitForm} className="mb-3">
                <div className="form-group row">
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
                <div className="form-group row mt-2 mb-1">
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
                <div className="form-group row">
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
