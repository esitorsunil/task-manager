import { useModalStore } from '../utils/modalStore';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import data from '../data.json';
import { Toast } from 'bootstrap';

const CreateTaskModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const [collaboratorOptions, setCollaboratorOptions] = useState([]);
  const [isFileListVisible, setIsFileListVisible] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      taskTitle: '',
      dueDate: '',
      description: '',
      status: '',
      priority: '',
      visibility: 'assignees',
      assignees: [],
      collaborators: [],
      files: []
    }
  });

  const watchedFiles = watch('files');

  useEffect(() => {
    const collaboratorOptions = data.dummyCollaborators.map((c) => ({
      value: c.id,
      label: c.username,
      type: 'collaborator'
    }));

    const employeeOptions = data.dummyEmployees.map((e) => ({
      value: `emp-${e.id}`,
      label: e.name,
      type: 'employee'
    }));

    setCollaboratorOptions([...collaboratorOptions, ...employeeOptions]);
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ name: file.name, content: reader.result });
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (formData) => {
    try {
      const fileDataArray = await Promise.all(
        formData.files.map((file) => convertToBase64(file))
      );

      const taskData = {
        id: uuidv4(),
        ...formData,
        attachments: fileDataArray,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("tasks")) || [];
      localStorage.setItem("tasks", JSON.stringify([...existing, taskData]));

      const toastEl = document.getElementById('taskToast');
      if (toastEl) {
        const toast = new Toast(toastEl);
        toast.show();
      }

      closeModal();
      reset();
    } catch (err) {
      console.error("Failed to save task", err);
      alert("An error occurred while saving the task.");
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setValue('files', [...watchedFiles, ...newFiles], { shouldValidate: true });
    e.target.value = null;
  };

  const handleRemoveFile = (filename) => {
    const updated = watchedFiles.filter((file) => file.name !== filename);
    setValue('files', updated);
  };

  return (
    <>
      <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 9999 }}>
        <div
          id="taskToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              Task created successfully!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="modal-title">
                    <i className="bi bi-card-checklist fw-bold me-2"></i>Create Task
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter task title"
                  {...register('taskTitle', { required: true })}
                />
                {errors.taskTitle && <small className="text-danger">Task title is required</small>}
              </div>

              <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <div className="row mb-3 border-bottom pb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Due Date</label>
                    <input type="date" className="form-control" {...register('dueDate')} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Assignees</label>
                    <Controller
                      name="assignees"
                      control={control}
                      render={({ field }) => <Select isMulti options={collaboratorOptions} {...field} />}
                    />
                  </div>
                </div>

                <div className="mb-3 border-bottom pb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea className="form-control" rows="4" {...register('description')} placeholder="Enter task description" />
                </div>

                <div className="mb-3 border-bottom pb-3">
                  <label className="form-label fw-semibold">
                    Attachments {watchedFiles.length > 0 && <span>({watchedFiles.length})</span>}
                  </label>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <label htmlFor="attachments" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-plus-lg me-2"></i>Add Attachment
                      </label>
                      <input type="file" className="d-none" id="attachments" multiple onChange={handleFileChange} />
                      {watchedFiles.length > 0 && (
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

                  {isFileListVisible && watchedFiles.length > 0 && (
                    <div className="mt-2 mb-0">
                      <div className="d-flex flex-wrap gap-2">
                        {watchedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="border rounded p-2 d-flex align-items-center"
                            style={{ width: "calc(50% - 0.5rem)" }}
                          >
                            <i className="bi bi-file-earmark me-2"></i>
                            <span className="text-truncate flex-grow-1" style={{ maxWidth: "calc(100% - 60px)" }}>{file.name}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-secondary p-0 ms-2"
                              onClick={() => handleRemoveFile(file.name)}
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
                  <label className="form-label fw-semibold">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <select className="form-select" {...field}>
                        <option value="">Select status</option>
                        {['To Do', 'In Progress', 'Blocked', 'Done'].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="mb-3 border-bottom pb-3">
                  <label className="form-label fw-semibold">Priority</label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <select className="form-select" {...field}>
                        <option value="">Select priority</option>
                        {['High', 'Urgent', 'Medium', 'Low'].map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="mb-3 border-bottom pb-3">
                  <label className="form-label fw-semibold">Visibility</label>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" value="assignees" {...register('visibility')} checked={watch('visibility') === 'assignees'} />
                    <label className="form-check-label">Only assignees and collaborators</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" value="company" {...register('visibility')} checked={watch('visibility') === 'company'} />
                    <label className="form-check-label">Anyone at your company</label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Collaborators</label>
                  <Controller
                    name="collaborators"
                    control={control}
                    render={({ field }) => <Select isMulti options={collaboratorOptions} {...field} />}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={closeModal}>Close</button>
                <button className="btn btn-primary" type="submit" disabled={!isValid}>Create Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModal;
