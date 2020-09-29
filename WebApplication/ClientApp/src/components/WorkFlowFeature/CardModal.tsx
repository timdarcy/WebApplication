import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row } from 'reactstrap';
import { Formik, Field, Form } from 'formik';





interface Props {
    isOpen: boolean,
    handleClose: any,
    cardValues: CardValues,
    updateCardValues: any
}

interface CardValues {
    title: string,
    content: string
}

interface State {
    modal: boolean
}


class CardModal extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            modal: false
        }
    }



    render(){
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.handleClose} >
                <ModalHeader toggle={this.props.handleClose}>Edit Card</ModalHeader>
                
                    <Formik
                        initialValues={this.props.cardValues}
                        onSubmit={(values: CardValues) => {
                                this.props.updateCardValues(values)
                            }
                        }
                    >
                    <Form>
                        <ModalBody>
                            <Row>
                                <label htmlFor="title">Title</label>
                                <Field id='title' type='text' name='title'/>
                            </Row>
                            <Row>
                                <label htmlFor="content">Content</label>
                                <Field id='content' as='textarea' name='content' />
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Update Card</Button>{' '}
                            <Button color="secondary" onClick={this.props.handleClose}>Cancel</Button>
                        </ModalFooter>
                        </Form>
                    </Formik>
                
            </Modal>

        )
    }
}


export default CardModal;