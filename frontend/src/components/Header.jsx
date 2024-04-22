import React from 'react';
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

        const goHome = () => {
            navigate("/");
        }

    return (
        <div className="header">
            <div className="logo">
                <img onClick={goHome} src="https://media.istockphoto.com/id/1337757821/vector/watercolor-green-leaf-logo.jpg?s=612x612&w=0&k=20&c=zz70lOyGNfZ_dc-nl5miMg1qLrWkw-tnnRTKJpjgkB4=" className="logo-pic"/>
            </div>
            <div className="profile">
                <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=826&t=st=1713736377~exp=1713736977~hmac=d40828fbbbb20a057d14f025ad71377908acdab819c58c93f6a9ba167f4233e9" alt="Profile Picture" className="profile-pic" />
            </div>
            <h1 className="username">{localStorage.getItem("USERNAME")}</h1>
        </div>
    );
}

export default Header;