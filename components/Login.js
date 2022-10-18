import { Modal, Button, Text, Input, Row, Checkbox, Spacer } from "@nextui-org/react";
import { Password, Mail } from "./Icons";

export default function Login({ state, close }) {
    const closeHandler = () => close(false);

    return (
        <div>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={state}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {'Welcome to '}
                        <Text b size={18}>
                            TBD
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        contentLeft={<Mail fill="currentColor" />}
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        contentLeft={<Password fill="currentColor" />}
                    />
                    <Row justify="space-between">
                        <Checkbox>
                            <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer justify="space-between">
                    <Button auto>
                        Sign up
                    </Button>
                    <Button auto onClick={closeHandler}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}