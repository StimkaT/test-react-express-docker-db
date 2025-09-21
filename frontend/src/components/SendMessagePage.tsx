import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";

const SendMessagePage: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const validatePhone = (_: any, value: string) => {
        if (!value) {
            return Promise.reject(new Error('Пожалуйста, введите телефон'));
        }

        const phoneRegex = /^(\+375|80)(25|29|33|44)\d{7}$/;
        if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
            return Promise.reject(new Error('Введите белорусский номер: +375 XX XXXXXXX или 80 XX XXXXXXX'));
        }

        return Promise.resolve();
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await fetch("/api/send-message", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            message.error('Ошибка при отправке сообщения');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#121212",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div
                style={{
                    backgroundColor: "#212121",
                    padding: "40px",
                    borderRadius: "12px",
                    maxWidth: "500px",
                    width: "90%",
                }}
            >
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                    style={{
                        color: "#ffcf0f",
                        marginBottom: "20px",
                        padding: 0,
                    }}
                >
                    Назад
                </Button>

                <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
                    Отправить сообщение
                </h1>

                <Form
                    form={form}
                    name="messageForm"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите имя' },
                            { min: 2, message: 'Имя должно содержать минимум 2 символа' }
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="Введите ваше имя"
                            style={{
                                backgroundColor: "#333",
                                borderColor: "#555",
                                color: "#fff",
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Телефон"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите телефон' },
                            { validator: validatePhone }
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="+375 XX XXXXXXX или 80 XX XXXXXXX"
                            style={{
                                backgroundColor: "#333",
                                borderColor: "#555",
                                color: "#fff",
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        label="Сообщение"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите сообщение' },
                            { min: 2, message: 'Сообщение должно содержать минимум 2 символа' }
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Введите ваше сообщение"
                            style={{
                                backgroundColor: "#333",
                                borderColor: "#555",
                                color: "#fff",
                                resize: "vertical",
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            icon={<SendOutlined />}
                            loading={loading}
                            block
                            style={{
                                backgroundColor: "#ffcf0f",
                                borderColor: "#ffcf0f",
                                color: "#121212",
                                fontWeight: "bold",
                                height: "45px",
                            }}
                        >
                            {loading ? 'Отправка...' : 'Отправить'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SendMessagePage;
