import { useState, useEffect } from "react";

export default function seance() {

    const [seance, setSeance] = useState([]);
    useEffect(() => {
        fetch("http://localhost/backend/pages/seance.php")
            .then(res => res.json())
            .then(setSeance)
            .catch(err => console.error("failed to fetch data", err));
    }, []);

    useEffect(() => {
        console.log(seance);
    }, [])
    
    }