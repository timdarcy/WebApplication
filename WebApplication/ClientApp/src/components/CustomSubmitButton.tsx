import { Button, Spinner } from 'reactstrap';
import React from 'react';

interface Props {
    isSubmitting: boolean;
    text: string;
}

class CustomSubmitButton extends React.Component<Props>{

    render() {
        return (
            <Button color="primary" type="submit">
                {this.props.text}
                {this.props.children}
                {this.props.isSubmitting &&
                    <Spinner size="sm" color="light" />}
            </Button>

            )
    }
}

export default CustomSubmitButton;