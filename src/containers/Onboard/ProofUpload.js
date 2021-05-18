/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container, Button } from 'react-bootstrap';

// proof details
const ProofUpload = ({ role, onCompany, onEmployeeId, onCancelledCheque, previousStep, nextStep, setActiveStep, activeStep }) => {
    const [fileName, setFileName] = useState('');
    const [empID, setEmpID] = useState('');
    const [cancelledCheque, setCancelledCheque] = useState('');
    const [proofUploadAlert, setProofUploadAlert] = useState('');
    const [validate, setValidate] = useState(false);

    const onChangeCompRep = (e) => {
        setFileName(e.target.files[0]);
        onCompany(e.target.files[0]);
    };

    const onChangeEmpId = (e) => {
        setEmpID(e.target.files[0].name);
        const idProof = new FormData();
        idProof.append('file', e.target.files[0]);
        for (let value of idProof) {
            onEmployeeId(value);
        }
    };

    const onChangeCancelledCheque = (e) => {
        setCancelledCheque(e.target.files[0].name);
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        for (let value of formData) {
            onCancelledCheque(value);
        }
    };

    const goToLoginCredentials = () => {
        if (role === 'client' || role === 'company') {
            if (!fileName || !empID) {
                setProofUploadAlert('Should upload all files');
                setValidate(true);
            } else {
                nextStep();
                setValidate(false);
                setProofUploadAlert('');
                setActiveStep(activeStep + 1);
            }
        } else if (role === 'Employee') {
            if (!fileName || !empID || !cancelledCheque) {
                setProofUploadAlert('Should upload all files');
                setValidate(true);
            } else {
                nextStep();
                setValidate(false);
                setProofUploadAlert('');
                setActiveStep(activeStep + 1);
            }
        }
    };

    const goToPersonalDetails = () => {
        previousStep();
        setActiveStep(activeStep - 1);
    };

    return (
        <Container>
            <Row className="proof-content">
                <Card className="personal-details shadow mb-5">
                    <h4 className="proof-text">Proof Upload</h4>
                    <Row className="d-flex ml-2 mr-2">
                        <Col sm={6} md={6} lg={6} >
                            <Form.Group>
                                {role === 'company' && <Form.Label>Upload your letter of Authentication(for company representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'client' && <Form.Label className="client-proof-upload">Upload your letter of Authentication(for client representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'Employee' && <Form.Label>Upload your Pan Card <sup className="text-danger">*</sup></Form.Label>}
                                <Form.File
                                    type="file"
                                    className={!fileName && validate && 'file-not-upload'}
                                    id=""
                                    label='abcd'
                                    onChange={onChangeCompRep}
                                    custom
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                            <Form.Group>
                                {role === 'company' && <Form.Label>Upload your employee ID proof(for company representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'client' && <Form.Label className="client-proof-upload">Upload your company ID proof(for client  representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'Employee' && <Form.Label>Upload your Aadhar <sup className="text-danger">*</sup></Form.Label>}
                                <Form.File
                                    type="file"
                                    className={!empID && validate && 'file-not-upload'}
                                    id=""
                                    label={empID}
                                    onChange={onChangeEmpId}
                                    custom
                                />
                            </Form.Group>
                        </Col>
                        {role === 'Employee' && <Col sm={6} md={6} lg={6}>
                            <Form.Group>
                                <Form.Label>Upload your Cancelled Cheque <sup className="text-danger">*</sup></Form.Label>
                                <Form.File
                                    type="file"
                                    className={!cancelledCheque && validate && 'file-not-upload'}
                                    id=""
                                    label={cancelledCheque}
                                    onChange={onChangeCancelledCheque}
                                    custom
                                />
                            </Form.Group>
                        </Col>}
                    </Row>
                    <span className="w-100 text-center text-danger">{proofUploadAlert}</span>
                    <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                    <p className="ml-3 mt-2"><sup className="text-danger">*</sup> Each file size should not exceed 3 MB </p>
                </Card>
                <div className="d-flex justify-content-between w-100">
                    <span><Button className="back" onClick={goToPersonalDetails}>Back</Button></span>
                    <span><Button className="save-continue" onClick={goToLoginCredentials}>Save & Continue</Button></span>
                </div>
            </Row>
        </Container>
    );
};

export default ProofUpload;
