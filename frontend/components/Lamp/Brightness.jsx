import { Tagline, TagLineWrap } from "../Micro/Micro";
import React, { useState, useEffect } from "react";

const Brightness = () => {
    return (
        <>
            <div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
                <div className="col-12 mt-5 d-flex flex-column align-items-center">
                    <TagLineWrap className="text-center">
                        <Tagline style={{ margin: 0 }}>Set Your Brightness!</Tagline>
                    </TagLineWrap>
                    <div style={{ width: "65%" }}>
                        <TagLineWrap className="d-flex flex-row align-items-center" style={{ padding: "4px" }}>
                            <input type="range" className="form-range" min={0} max={255} defaultValue={0} />
                        </TagLineWrap>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Brightness;
