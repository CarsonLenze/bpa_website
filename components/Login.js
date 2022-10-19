import { Modal, Button, Text, Input, Row, Checkbox, Loading } from "@nextui-org/react";
import { Password, Mail } from "./Icons";
import { useState, useRef } from "react";

export default function Login({ state, close }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ });
    const closeHandler = () => close(false);
    const password = useRef(null);
    const email = useRef(null);

    const submit = () => {
        const error = {}
        if (!email.current.value) error = { ...error, Email: 'Please enter a Email' }
        if (!password.current.value) error = { ...error, Password: 'Please enter a Password' }
        if (Object.keys(error)[0]) return setErrors(error);
        console.log({ email: email.current.value, password: password.current.value})
        setLoading(true);
    }

    return (
        <div>
            <Modal closeButton blur open={state} onClose={closeHandler}>
                <Modal.Header>
                    <Text size={18}>
                        {'Welcome to '}
                        <Text b size={18}>
                            TBD
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        id="email"
                        ref={email}
                        disabled={loading}
                        helperColor="error"
                        helperText={errors.Email}
                        onChange={() => { if (errors) setErrors({}) }}
                        contentLeft={<Mail fill="currentColor" />}
                    />
                    <Input.Password
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        id="password"
                        placeholder="Password"
                        ref={password}
                        disabled={loading}
                        helperColor="error"
                        helperText={errors.Password}
                        onChange={() => { if (errors) setErrors({}) }}
                        contentLeft={<Password fill="currentColor" />}
                    />
                    <Row justify="space-between">
                        <Checkbox defaultSelected={true}>
                            <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer justify="space-between">
                    <Button auto>
                        Sign up
                    </Button>
                    {loading ? <Button auto disabled>
                        <Loading color="currentColor" size="sm" />
                    </Button> : <Button auto onClick={submit}>
                        Sign in
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}