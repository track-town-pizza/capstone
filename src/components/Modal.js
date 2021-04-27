import React, { useRef, useEffect } from "react"
import FocusTrap from "focus-trap-react"

const Modal = props => {
    
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <FocusTrap>
            <div className="modal-box border border-success rounded" aria-modal="true">
                <button className="close-button mx-1" onClick={props.onClick} name="closeModal" type="button" aria-label="close modal">x</button>
                <div className="message-box">
                    <p className="message text-center" ref={inputRef} tabIndex="0">{props.message}</p>
                </div>
                <div className="text-center">
                    <button className="close-modal-button mx-1 mb-2 border rounded" onClick={props.onClick} name="closeModal" type="button" aria-label="close modal">Close</button>
                </div>
            <style jsx>{`
                p:focus {
                    outline: none;
                }
                .modal-box {
                    width: 30%;
                    background-color: #fffd96;
                    position: fixed;
                    margin: auto;
                    left: 50%;
                    transform: translate(-50%);
                    z-index: 1;
                }
                .message {
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    padding: .25rem;
                    text-align: center !important;
                }
                .close-button {
                    float: right;
                    border: 0;
                    background-color: #fffd96;
                }
                .close-button:hover {
                    cursor: pointer;
                }
                .close-modal-button {
                    border: 0;
                    background-color: #007030;
                    color: #FFFFFF;
                }
                .close-modal-button:hover {
                    cursor: pointer;
                }
                @media only screen and (max-width: 1050px) {
                    .modal-box {
                        width: 40%;
                    }
                }
                @media only screen and (max-width: 800px) {
                    .modal-box {
                        width: 30%;
                    }
                    .message-box {
                        float: left;
                    }
                    .message {
                        padding: .25rem;
                        margin-top: .5rem;
                        margin-bottom: 1.5rem;
                    }
                }
                @media only screen and (max-width: 450px) {
                    .modal-box {
                        width: 60%;
                    }
                    .message-box {
                        float: left;
                    }
                    .message {
                        padding: .25rem;
                        margin-top: .5rem;
                        margin-bottom: 1.5rem;
                    }
                }  
            `}</style>
            </div>
        </FocusTrap>
    )
}
export default Modal