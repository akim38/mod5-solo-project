import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEventForm from './EditForm';

function EditEventFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditEventForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditEventFormModal;
