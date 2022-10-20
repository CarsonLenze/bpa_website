import { Modal, Button, Text, Input, Row, Checkbox, Loading } from "@nextui-org/react";
import { Password, Mail } from "./Icons";
import { useForm } from 'react-hook-form';
import { useState,useCallback } from 'react';
import { useSession, signIn } from "next-auth/react";

export default function Login({ state, close }) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ });
    const closeHandler = () => close(false);

    const { register, reset, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        const error = {}
        if (!data.email) error = { ...error, Email: 'Please enter a Email' }
        if (!data.password) error = { ...error, Password: 'Please enter a Password' }
        if (Object.keys(error)[0]) return setErrors(error);
        setLoading(true);
        console.log(data)
        signIn('credentials', { redirect: false, email: data.email, password: data.password });
    }, []);

    if (state && session) {
        closeHandler();
        reset();
        if (loading) setLoading(false);
    }

    return (
        <div>
            {JSON.stringify(session)}
            <Modal closeButton blur open={state} onClose={closeHandler}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            {...register('email')}
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
                            placeholder="Password"
                            {...register('password')}
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
                        </Button> : <Button auto type="submit">
                            Sign in
                        </Button>}
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}