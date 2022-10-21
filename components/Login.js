import { Modal, Button, Text, Input, Row, Checkbox, Loading } from "@nextui-org/react";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Password, Mail } from "./Icons";

export default function Login({ state, close }) {
    const closeHandler = () => close(false);

    const { register, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = useCallback(async (data) => {
        const newErrors = {}
        for (const item in data) {
            if (!data[item]) { newErrors[item] = `Please enter a ${item[0].toUpperCase() + item.slice(1)}`; }
        }
        if (Object.keys(newErrors)[0]) return setErrors(newErrors)

        setLoading(true);
        await signIn('credentials', { redirect: false, email: data.email, password: data.password });
    }, []);

    const formItemProps = {
        size: 'lg',
        color: 'primary',
        helperColor: 'error',
        bordered: true,
        fullWidth: true,
        onChange: () => { if (errors) setErrors({}) }
      };

    return (
        <div>
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
                            placeholder="Email"
                            contentLeft={<Mail fill="currentColor" />}
                            helperText={errors.email}
                            {...register('email')}
                            {...formItemProps}
                        />
                        <Input.Password
                            placeholder="Password"
                            contentLeft={<Password fill="currentColor" />}
                            helperText={errors.password}
                            {...register('password')}
                            {...formItemProps}
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