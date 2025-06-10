import { useModalStore } from '../utils/modalStore';

const CreateTaskModal = () => {
  const { isOpen, closeModal } = useModalStore();

  return (
    <div
      className={`modal fade ${isOpen ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Task creation form goes here...</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
