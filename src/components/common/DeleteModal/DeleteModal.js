const DeleteModal = ({ handleDeleteConfirm, deleteModalRef, type }) => {
  return (
    <div className='py-2'>
      <div className='modal' tabIndex='-1' id='myModal' ref={deleteModalRef}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              {type === 'deleteEmployee' ? (
                <h5 className='modal-title'>Dolgozó törlése</h5>
              ) : (
                <h5 className='modal-title'>Szervezeti egység törlése</h5>
              )}
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {type === 'deleteEmployee' ? (
                <p>Biztosan törölni szeretné ezt a dolgozót?</p>
              ) : (
                <p>Biztosan törölni szeretné ezt a szervezeti egységet?</p>
              )}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Mégsem
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={handleDeleteConfirm}
              >
                Igen, törölni szeretném
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
