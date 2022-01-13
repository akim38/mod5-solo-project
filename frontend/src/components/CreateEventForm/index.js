import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateEventForm from './CreateEventForm';

function CreateEventFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create New Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateEventForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateEventFormModal;
