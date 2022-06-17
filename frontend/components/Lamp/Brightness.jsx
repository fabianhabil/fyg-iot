import { Tagline, TagLineWrap } from "../Micro/Micro";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FetchLoading from "../Micro/Loading";
import GagalPop from "../Popup/GagalPop";
import { useRouter } from "next/router";

const Brightness = () => {
    const [brightness, setBrightness] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const statusSensor = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/sensor`)
            .then((res) => {
                if (res.data == "On") {
                    const notice = "Matikan Sensor terlebih dahulu jika ingin atur brightness!";
                    GagalPop(notice);
                    router.push("/");
                } else {
                    statusLamp();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const statusLamp = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/lamp`)
            .then((res) => {
                if (res.data == "Off") {
                    const notice = "Nyalakan dahulu lampu anda sebelum set brightness!";
                    GagalPop(notice);
                    router.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getBrightness = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/brightness`)
            .then((res) => {
                setBrightness(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        statusSensor();
        getBrightness();
    }, []);

    return (
        <>
            {loading ? (
                <FetchLoading />
            ) : (
                <div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
                    <div className="col-12 mt-5 d-flex flex-column align-items-center">
                        <TagLineWrap className="text-center">
                            <Tagline style={{ margin: 0 }}>Set Brightness!</Tagline>
                        </TagLineWrap>
                        <div style={{ width: "65%" }}>
                            <TagLineWrap className="d-flex flex-row align-items-center" style={{ padding: "4px" }}>
                                <input
                                    type="range"
                                    className="form-range"
                                    min={0}
                                    max={255}
                                    defaultValue={brightness}
                                    onChange={(e) => {
                                        axios.get(
                                            `${process.env.NEXT_PUBLIC_API_URL}/brightness?value=${e.target.value}`
                                        );
                                    }}
                                />
                            </TagLineWrap>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Brightness;
