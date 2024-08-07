function Modal(props) {

    let modalSize = 'modal-dialog';
    if(props.modalSize){
        modalSize += ' ' + props.modalSize
    }

    return (
        <>
            <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className={modalSize}> 
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{props.title}</h1>
                            <button id="btnModalClose" type="button" className="btn-close btn-Close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Modal;