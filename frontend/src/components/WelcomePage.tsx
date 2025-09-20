import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundColor: "#121212",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
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
                <h1 style={{ marginBottom: "16px" }}>Добро пожаловать!</h1>
                <p style={{ marginBottom: "32px" }}>
                    Пройдите далее, чтобы заполнить форму.
                </p>

                <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    onClick={() => navigate("/send-message")}
                    style={{
                        backgroundColor: "#ffcf0f",
                        borderColor: "#ffcf0f",
                        color: "#121212",
                        fontWeight: "bold",
                    }}
                >
                    Далее
                </Button>
            </div>
        </div>
    );
};

export default WelcomePage;
