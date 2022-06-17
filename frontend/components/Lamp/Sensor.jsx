import { Tagline, TagLineWrap } from "../Micro/Micro";
import SwitchButton from "../Micro/SwitchButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FetchLoading from "../Micro/Loading";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Sensor = () => {
    const [toggle, setToggle] = useState(null);
    const [loading, setLoading] = useState(true);

    const functionToggle = (e) => {
        setToggle(e);
        setSensor();
    };

    const setSensor = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/sensor?power=${toggle ? "off" : "on"}`)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    };

    const noticeSensor = (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
            },
        });

        swalWithBootstrapButtons
            .fire({
                title: "Lampu sedang menyala!",
                text: "Menyalakan sensor akan mematikan lampu jika cahaya sekitar terang!",
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
                } else {
                    router.push("/");
                }
            });
    };

    const statusLamp = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/lamp`)
            .then((res) => {
                setLoading(false);
                if (res.data == "On") {
                    noticeSensor();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const statusSensor = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/sensor`)
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
        statusSensor();
        statusLamp();
    }, []);

    return (
        <>
            {loading ? (
                <FetchLoading />
            ) : (
                <div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
                    <div className="col-12 mt-5 d-flex flex-column align-items-center">
                        <TagLineWrap className="text-center">
                            <Tagline style={{ margin: 0 }}>Turn On / Turn Off Your Photo Sensor!</Tagline>
                        </TagLineWrap>
                        <SwitchButton checked={toggle} setChecked={functionToggle} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sensor;
