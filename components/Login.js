import { Modal, Button, Text, Input, Row, Checkbox, Loading } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Password, Mail } from "./Icons";

export default function Login({ state, close }) {
    const closeHandler = () => close(false);

    const { register, reset, handleSubmit } = useForm();
    const { data: session } = useSession();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = useCallback(async (data) => {
        const newErrors = {}
        for (const item in data) {
            if (!data[item]) { newErrors[item] = `Please enter a ${item[0].toUpperCase() + item.slice(1)}`; }
        }
        if (Object.keys(newErrors)[0]) return setErrors(newErrors)

        setLoading(true);
        signIn('credentials', { redirect: false, email: data.email, password: data.password });
    }, []);

    if (state && session) {
        setLoading(false);
        closeHandler();
        reset();
    }

    return (
        <div>
            {JSON.stringify(session)}
            <Modal closeButton blur open={state} onClose={closeHandler}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Text size={18}>
                            {'Welcome to '}
                            <Text b size={18}>ZAP</Text>
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
                            helperText={errors.email}
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
                            helperText={errors.password}
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