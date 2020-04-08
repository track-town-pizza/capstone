import React from "react"

const Modal = props => {
    return (
        <div className="modal-box border border-success rounded">
            <button className="close-button mx-1" onClick={props.onClick} name="closeModal" type="button">x</button>
            <div className="message-box">
                <p className="message text-center">{props.message}</p>
            </div>
        <style jsx>{`
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
    )
}
export default Modal