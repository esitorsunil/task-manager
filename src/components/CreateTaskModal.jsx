import { useModalStore } from '../utils/modalStore';
import { useDispatch, useSelector } from 'react-redux';
import { addFiles, removeFile } from '../utils/attachmentsSlice';
import { useState } from 'react';

const CreateTaskModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const [isFileListVisible, setIsFileListVisible] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [visibility, setVisibility] = useState("assignees");

  const dispatch = useDispatch();
  const files = useSelector((state) => state.attachments.files);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    dispatch(addFiles(newFiles));
    e.target.value = null;
  };

  const handleRemoveFile = (filename) => {
    dispatch(removeFile(filename));
  };

  return (
    <div
      className={`modal fade ${isOpen ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="modal-title">
                <i className="bi bi-card-checklist me-2"></i>Create Task
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter task title"
            />
          </div>

          <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <div className="row mb-3 border-bottom pb-3">
              <div className="col-md-6">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="dueDate" 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="assignee" className="form-label">Assignees</label>
                <select className="form-select" id="assignee">
                  <option value="">Select assignee</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Mike Johnson</option>
                  <option value="4">Sarah Williams</option>
                  <option value="5">David Brown</option>
                </select>
              </div>
            </div>

            <div className="mb-3 border-bottom pb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea 
                className="form-control" 
                id="description" 
                rows="4" 
                placeholder="Enter task description"
              ></textarea>
            </div>

            <div className="mb-3 border-bottom pb-3">
              <label className="form-label">Attachments {files.length > 0 && (
                <span>({files.length})</span>
              )}</label>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <label htmlFor="attachments" className="btn btn-outline-secondary me-2">
                    <i className="bi bi-plus-lg me-2"></i>Add Attachment
                  </label>
                  <input
                    type="file"
                    className="d-none"
                    id="attachments"
                    multiple
                    onChange={handleFileChange}
                  />
                  {files.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-link text-secondary p-0"
                      onClick={() => setIsFileListVisible(!isFileListVisible)}
                      title={isFileListVisible ? "Hide files" : "Show files"}
                    >
                      <i className={`bi bi-chevron-${isFileListVisible ? 'up' : 'down'}`}></i>
                    </button>
                  )}
                </div>  
              </div>

              {isFileListVisible && files.length > 0 && (
                <div className="mt-2 mb-0">
                  <div className="d-flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className="border rounded p-2 d-flex align-items-center"
                        style={{
                          width: "calc(50% - 0.5rem)",
                          minWidth: "calc(50% - 0.5rem)",
                          maxWidth: "calc(50% - 0.5rem)"
                        }}
                      >
                        <i className="bi bi-file-earmark me-2"></i>
                        <span className="text-truncate flex-grow-1" style={{maxWidth: "calc(100% - 60px)"}}>
                          {file.name}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-secondary p-0 ms-2"
                          onClick={() => handleRemoveFile(file.name)}
                          title="Remove file"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3 border-bottom pb-3">
              <label className="form-label">Status</label>
              <div className="dropdown">
                <button
                  className="btn border border-radius dropdown-toggle w-40 text-start"
                  type="button"
                  id="statusDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedStatus || "Select status"}
                </button>
                <ul className="dropdown-menu w-100" aria-labelledby="statusDropdown">
                  <li><button className="dropdown-item" onClick={() => setSelectedStatus("To Do")}>To Do</button></li>
                  <li><button className="dropdown-item" onClick={() => setSelectedStatus("In Progress")}>In Progress</button></li>
                  <li><button className="dropdown-item" onClick={() => setSelectedStatus("Blocked")}>Blocked</button></li>
                  <li><button className="dropdown-item" onClick={() => setSelectedStatus("Done")}>Done</button></li>
                </ul>
              </div>
            </div>

            <div className="mb-3 border-bottom pb-3">
              <label className="form-label">Priority</label>
              <div className="dropdown">
                <button
                  className="btn border rounded dropdown-toggle w-40 text-start"
                  type="button"
                  id="priorityDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedPriority || "Select priority"}
                </button>
                <ul className="dropdown-menu w-40" aria-labelledby="priorityDropdown">
                  <li><button className="dropdown-item" onClick={() => setSelectedPriority("High")}>High</button></li>
                  <li><button className="dropdown-item" onClick={() => setSelectedPriority("Urgent")}>Urgent</button></li>
                  <li><button className="dropdown-item" onClick={() => setSelectedPriority("Medium")}>Medium</button></li>
                  <li><button className="dropdown-item" onClick={() => setSelectedPriority("Low")}>Low</button></li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Visibility</label>
              <div className="border rounded p-3">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    id="visibilityAssignees"
                    checked={visibility === "assignees"}
                    onChange={() => setVisibility("assignees")}
                  />
                  <label className="form-check-label" htmlFor="visibilityAssignees">
                    Only assignees and collaborators
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    id="visibilityCompany"
                    checked={visibility === "company"}
                    onChange={() => setVisibility("company")}
                  />
                  <label className="form-check-label" htmlFor="visibilityCompany">
                    Anyone at your company
                  </label>
                </div>
              </div>
            </div>
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
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;