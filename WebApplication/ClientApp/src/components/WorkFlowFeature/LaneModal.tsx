import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row } from 'reactstrap';
import { Formik, Field, Form } from 'formik';





interface Props {
    isOpen: boolean,
    handleClose: any,
    laneValues: LaneValues,
    updateLaneValues: any,
}

export interface LaneValues {
    title: string
}

interface State {
    modal: boolean
}


class LaneModal extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            modal: false
        }
    }



    render(){
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.handleClose} >
                <ModalHeader toggle={this.props.handleClose}>Edit Lane</ModalHeader>
                
                    <Formik
                        initialValues={this.props.laneValues}
                        onSubmit={(values: LaneValues) => {
                            this.props.updateLaneValues(values);
                            this.props.handleClose();
                            }
                        }
                    >
                    <Form>
                        <ModalBody>
                            <Row className="form-row">
                                <label htmlFor="title">Title</label>
                                <Field id='title' type='text' name='title'/>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Submit</Button>
                            <Button color="secondary" onClick={this.props.handleClose}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Formik>
                
            </Modal>

        )
    }
}


export default LaneModal;