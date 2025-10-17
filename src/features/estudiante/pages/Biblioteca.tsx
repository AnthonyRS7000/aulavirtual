import React from "react";
import TituloPage from "../../../components/pages/TituloPage";
import CardItems from "../../../components/pages/CardItems";
import { ArrowRightCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import "../css/Biblioteca.css";

import MacroDigital from "../../../assets/macro_digital.png";
import Eni from "../../../assets/logo-eni.png";
import Digitalia from "../../../assets/logo_digitalia2.jpg";
import DialnetPlus from "../../../assets/logo_dialnet3.jpg";
import AccesoLibre from "../../../assets/logo_accesolibre.jpg";
import ScienciaDirect from "../../../assets/sciencedirect.png";
import ManualModerno from "../../../assets/manual-moderno.png";
import EBooks from "../../../assets/ebooks7-24.png";
import { BookmarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Biblioteca = () => {
    const cardData = [
        {
            title: "Biblioteca Virtual: Macro Digital",
            image: MacroDigital,
            description: "*Validar con tu correo institucional @udh.edu.pe",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://accounts.google.com/v3/signin/accountchooser?continue=https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fcontinue%3Fidpid%3DC036p75am%26SAMLRequest%3DpVJLj9MwEL7vr1jlnkeTTTdrtUWl5VGptNG2cOCCJvbQWiSeYE8K%2FHucBHaBQy9Y8mU832O%252B8cxBU7di2fHZPOLXDh3f3PrzvamNE8PjPOisEQROO2GgQSdYisPy3VakUSJaS0yS6uAf2HUUOIeWNZkRtlnPg%2F3u1Xb%2FZrP7pLK8SlQlpZJFgXlaZAnkd0kxRZk%252B3D1UWZFlOUA1Qj%252BgdZ5nHnjasVJaumiFdudV50HZVbWWENXwS8q5DjfGMRj2oCTNw0kSTu6Pk0JMpiLNP459a5%252BENsAD95m5dSKOQUrqDLvoRHSqMZLUxBT346axVu0Lf7War5Js2t7n0Dz5GRJ6qY3S5nQ9mGpscuLt8ViG5f5wHEmWvwNbkXFdg%2FaA9qIlvn%2FcPtvDiuiLi1BpJquhbkBaGkyOFjujL31cClSoMDwbSX4kFywGiVnfJIZ87OJ%2FKBtkUMAwi%2F9kfNZoRb%252Bazbokv5kfQ70%2Fr8k2wNfj6StahZ%252BHVtH2yo7RcPDEsqxr%252BrayCOyXz7bD4DZe3IxW%2Fv7ni58%253D%26RelayState%3D%2F%26omethod%3DGET&faa=1&flowName=GlifWebSignIn&flowEntry=AccountChooser&dsh=S1075663124%3A1760724987085553") },
                { text: "Tutorial", icon: <PlayIcon />, onClick: () => window.open("https://www.youtube.com/watch?v=QiOlClDsuUw") },
            ],
            footerText: (
                <>
                    Para reportar problemas comuníquese a:{" "}
                    <div className="card-items-footer-text-div">
                        <a className="card-items-footer-text-a" href="https://api.whatsapp.com/send/?phone=51952068830&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                            <Cog6ToothIcon style={{ width: "20px", height: "20px"}} />
                            SOPORTE
                        </a>
                        <a className="card-items-footer-text-a" href="https://sites.google.com/udh.edu.pe/macro-udh" target="_blank" rel="noopener noreferrer">
                            <BookmarkIcon style={{ width: "20px", height: "20px"}} />
                            GUÍA ONLINE
                        </a>
                    </div>
                </>
            ),
        },
        {
            title: "Biblioteca Virtual: ENI Training",
            image: Eni,
            description: "Regístrate con tu correo institucional para ingresar",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://www.eni-training.com/Connect/Mail/login.aspx?cfgBdd=udh&cfgsite=ConnectMail&idlng=6", "_blank") },
            ],
        },
        {
            title: "Biblioteca Virtual: Digitalia",
            image: Digitalia,
            description: "Regístrate con tu correo institucional para ingresar",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://www.digitaliapublishing.com/", "_blank") },
            ],
            footerText: (
                <>
                    Para reportar problemas comuníquese a:{" "}
                    <div className="card-items-footer-text-div">
                        <a className="card-items-footer-text-a" href="https://api.whatsapp.com/send/?phone=51952068830&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                            <Cog6ToothIcon style={{ width: "20px", height: "20px"}} />
                            SOPORTE
                        </a>
                    </div>
                </>
            ),
        },
        {
            title: "Biblioteca Virtual: Dialnet Plus",
            image: DialnetPlus,
            description: "Regístrate con tu correo institucional para ingresar",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://dialnet.unirioja.es/", "_blank") },
            ],
            footerText: (
                <>
                    Para reportar problemas comuníquese a:{" "}
                    <div className="card-items-footer-text-div">
                        <a className="card-items-footer-text-a" href="https://api.whatsapp.com/send/?phone=51952068830&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                            <Cog6ToothIcon style={{ width: "20px", height: "20px"}} />
                            SOPORTE
                        </a>
                    </div>
                </>
            ),
        },
        {
            title: "Bibliotecas de Acceso Libre",
            image: AccesoLibre,
            description: "Accede a recursos académicos de libre acceso",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://sites.google.com/udh.edu.pe/bibliotecas-virtuales-udh/inicio?pli=1&authuser=1", "_blank") },
            ],
        },
        {
            title: "ScienciaDirect",
            image: ScienciaDirect,
            description: "Base de datos científica de Elsevier",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://www.sciencedirect.com/", "_blank") },
            ],
        },
        {
            title: "Biblioteca Virtual Manual Moderno",
            image: ManualModerno,
            description: "Libros de medicina, psicología y más",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://manualmoderno.udh.edu.pe/", "_blank") },
                { text: "Tutorial", icon: <PlayIcon />, onClick: () => window.open("https://www.youtube.com/watch?v=SklBWMLJ3DU") },
            
            ],
        },
        {
            title: "Biblioteca Virtual eBooks 7/24",
            image: EBooks,
            description: "Miles de libros electrónicos disponibles 24/7",
            buttons: [
                { text: "Ingresar", icon: <ArrowRightCircleIcon />, onClick: () => window.open("https://www.ebooks7-24.com/stage.aspx?il=&pg=&ed=", "_blank") },
            ],
        },
    ];

    return (
        <div className="biblioteca-container">
            {/* Título */}
            <TituloPage titulo="Bibliotecas Virtuales" />

            {/* Card principal */}
            <div className="biblioteca-card-items">
                {cardData.map((card, index) => (
                    <CardItems
                        key={index}
                        title={card.title}
                        image={card.image}
                        description={card.description}
                        buttons={card.buttons}
                        footerText={card.footerText}
                    />
                ))}
            </div>
        </div>
    );
};

export default Biblioteca;
