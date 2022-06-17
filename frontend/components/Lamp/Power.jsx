import { Tagline, TagLineWrap } from "../Micro/Micro";
import SwitchButton from "../Micro/SwitchButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FetchLoading from "../Micro/Loading";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Power = () => {
    const [toggle, setToggle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sensor, setSensor] = useState(null);
    const router = useRouter();

    const functionToggle = (e) => {
        setToggle(e);
        setLamp();
    };

    const noticeSensor = (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
            },
        });

        swalWithBootstrapButtons
            .fire({
                title: "Anda sedang menggunakan sensor cahaya!",
                text: "Menyalakan atau mematikan lampu secara manual akan mematikan fitur sensor!",
                icon: "question",
                iconColor: "#eed202",
                showCancelButton: false,
                confirmButtonText: "Continue",
                confirmButtonColor: "#eed202",
                showDenyButton: true,
                denyButtonText: "Cancel",
                denyButtonColor: "gray",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sensor?power=off`);
                } else {
                    router.push("/");
                }
            });
    };

    const checkSensor = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/sensor`)
            .then((res) => {
                setLoading(false);
                if (res.data == "On") {
                    setSensor(true);
                    noticeSensor();
                } else {
                    setSensor(false);
                }
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const setLamp = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/lamp?power=${toggle ? "off" : "on"}`)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    };

    const statusLamp = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/lamp`)
            .then((res) => {
                if (res.data == "On") {
                    setToggle(true);
                } else {
                    setToggle(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        statusLamp();
        checkSensor();
    }, []);

    return (
        <>
            {loading ? (
                <FetchLoading />
            ) : (
                <div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
                    <div className="col-12 mt-5 d-flex flex-column align-items-center">
                        <TagLineWrap className="text-center">
                            <Tagline style={{ margin: 0 }}>Turn On / Turn Off Your Lamp!</Tagline>
                        </TagLineWrap>
                        <SwitchButton checked={toggle} setChecked={functionToggle} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Power;
