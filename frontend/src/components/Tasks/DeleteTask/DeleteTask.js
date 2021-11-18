const DeleteTask = ({ task, deleteTask, closeDeleteModal }) => {
    return (
        <>
            <h4 className="text-center">
                Czy usunąć {task?.done ? 'zrealizowane' : 'niezrealizowane'} zadanie <b>,,{task?.title}"</b> ?
            </h4>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary btn-block m-2"
                    onClick={() => {
                        deleteTask(task._id)
                        closeDeleteModal()
                    }}>Tak
                </button>
                <button className="btn btn-primary btn-block m-2"
                    onClick={closeDeleteModal}>Nie
                </button>
            </div>
        </>
    )
}

export default DeleteTask
