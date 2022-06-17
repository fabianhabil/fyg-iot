import Home from "../components/Index/Index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FetchLoading from "../components/Micro/Loading";

export default function Index() {
    const [loading, setLoading] = useState(true);
    const checkESP = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}`)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                alert("ESP32 tidak ditemukan! Silahkan cek IP ADDRESS ESP32 anda di file env!");
                setLoading(false);
            });
    };

    useEffect(() => {
        checkESP();
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <FetchLoading />
                </>
            ) : (
                <Home />
            )}
        </>
    );
}
