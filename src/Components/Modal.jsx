import "./Modal.css";

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const Modal = ({ children, open, close }) => (
  <div
    className={`custom-modal ${open ? "custom-modal-show" : ""}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => {
      if (evt.target === evt.currentTarget) close();
    }}
  >
    <div className="custom-modal-dialog" role="document">
      <div className="custom-modal-content">
        {/* <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={close}
          />
        </div> */}
        <div className="custom-modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default Modal;
